#!/usr/bin/env python3

from __future__ import annotations

import argparse
from pathlib import Path
from typing import NamedTuple

from PIL import Image, ImageDraw, ImageFont
import pikepdf
from pikepdf import Rectangle
from pikepdf.canvas import Canvas

POINTS_PER_MM = 72 / 25.4
PX_PER_POINT = 2


def mm(value: float) -> float:
    return value * POINTS_PER_MM


def points_to_px(value: float) -> int:
    return max(1, round(value * PX_PER_POINT))


def mm_to_px(value: float) -> int:
    return points_to_px(mm(value))


class LinkAnnotation(NamedTuple):
    uri: str
    rect: tuple[float, float, float, float]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Stamp TRIKDIS manual PDFs with footer on all pages and header from page 2 onward."
    )
    parser.add_argument("--input", required=True, help="Input PDF path.")
    parser.add_argument("--output", required=True, help="Output PDF path.")
    parser.add_argument("--title", required=True, help="Manual title shown in the running header.")
    parser.add_argument("--logo", required=True, help="Path to the white TRIKDIS wordmark PNG.")
    parser.add_argument("--mark", required=True, help="Path to the red TRIKDIS mark PNG.")
    parser.add_argument("--font-regular", required=True, help="Path to the regular Unicode font.")
    parser.add_argument("--font-bold", required=True, help="Path to the bold Unicode font.")
    parser.add_argument("--show-header-from", type=int, default=2, help="1-based page number where the header starts.")
    return parser.parse_args()


def truncate_text(text: str, max_length: int) -> str:
    if len(text) <= max_length:
        return text
    return f"{text[: max_length - 1].rstrip()}..."


def load_font(font_path: Path, size_points: float) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(font_path), points_to_px(size_points))


def load_rgba_image(image_path: Path, target_width_px: int | None = None, target_height_px: int | None = None) -> Image.Image:
    image = Image.open(image_path).convert("RGBA")
    if target_width_px and target_height_px:
        image = image.resize((target_width_px, target_height_px), Image.LANCZOS)
    return image


def fit_text_font(font_path: Path, size_points: float, min_size_points: float, texts: list[str], max_width: float) -> ImageFont.FreeTypeFont:
    size = size_points
    probe = ImageDraw.Draw(Image.new("RGB", (1, 1), "white"))
    while size >= min_size_points:
        font = load_font(font_path, size)
        total_width = 0
        for text in texts:
            bbox = probe.textbbox((0, 0), text, font=font)
            total_width += bbox[2] - bbox[0]
        if total_width <= points_to_px(max_width):
            return font
        size -= 0.2
    return load_font(font_path, min_size_points)


def render_footer_strip(
    *,
    width: float,
    page_number: int,
    total_pages: int,
    logo_path: Path,
    mark_path: Path,
    font_regular_path: Path,
) -> tuple[Image.Image, float, list[LinkAnnotation]]:
    strip_height = mm(24)
    image = Image.new("RGB", (points_to_px(width), points_to_px(strip_height)), "white")
    draw = ImageDraw.Draw(image)

    left = mm_to_px(10)
    right = points_to_px(width - mm(10))
    band_right = points_to_px(width - mm(28))
    band_y = mm_to_px(12.4)
    band_height = mm_to_px(6.6)

    page_font = load_font(font_regular_path, 6.8)
    contact_x = left + mm_to_px(20)
    mark_size = mm_to_px(3.9)
    mark_x = band_right - mm_to_px(4.7)
    text_max_width = (width - mm(28)) - mm(30) - mm(8.5)
    separator = " | "
    segments = [
        ("docs.trikdis.com", "https://docs.trikdis.com"),
        ("support@trikdis.lt", "mailto:support@trikdis.lt"),
        ("+370 37 408040", "tel:+37037408040"),
        ("Draugystes str. 7, LT-51229 Kaunas, Lithuania", None),
    ]
    contact_font = fit_text_font(
        font_regular_path,
        5.4,
        4.2,
        [segment for segment, _ in segments] + [separator] * (len(segments) - 1),
        text_max_width,
    )
    link_annotations: list[LinkAnnotation] = []

    draw.rectangle((left, band_y, band_right, band_y + band_height), fill=(203, 34, 21))

    logo_height = mm_to_px(4.0)
    logo = load_rgba_image(
        logo_path,
        target_width_px=round(Image.open(logo_path).width * (logo_height / Image.open(logo_path).height)),
        target_height_px=logo_height,
    )
    image.paste(logo, (left + mm_to_px(2.1), band_y + mm_to_px(1.2)), logo)

    text_y = band_y + mm_to_px(1.55)
    cursor_x = contact_x
    for index, (text, uri) in enumerate(segments):
        bbox = draw.textbbox((0, 0), text, font=contact_font)
        text_width = bbox[2] - bbox[0]
        draw.text((cursor_x, text_y), text, font=contact_font, fill=(255, 255, 255))
        if uri:
            link_bottom = strip_height - ((band_y + band_height) / PX_PER_POINT)
            link_top = strip_height - (band_y / PX_PER_POINT)
            link_annotations.append(
                LinkAnnotation(
                    uri=uri,
                    rect=(
                        cursor_x / PX_PER_POINT,
                        link_bottom,
                        (cursor_x + text_width) / PX_PER_POINT,
                        link_top,
                    ),
                )
            )
        cursor_x += text_width
        if index != len(segments) - 1:
            separator_bbox = draw.textbbox((0, 0), separator, font=contact_font)
            draw.text((cursor_x, text_y), separator, font=contact_font, fill=(255, 255, 255))
            cursor_x += separator_bbox[2] - separator_bbox[0]

    mark = load_rgba_image(mark_path, target_width_px=mark_size, target_height_px=mark_size)
    image.paste(mark, (mark_x, band_y + mm_to_px(0.9)), mark)

    page_label = f"Page {page_number} of {total_pages}"
    page_bbox = draw.textbbox((0, 0), page_label, font=page_font)
    page_width = page_bbox[2] - page_bbox[0]
    draw.text(
        (max(band_right + mm_to_px(6), right - page_width), band_y + mm_to_px(1.4)),
        page_label,
        font=page_font,
        fill=(23, 23, 23),
    )

    return image, strip_height, link_annotations


def render_first_page_corner_brand(*, width: float, logo_path: Path) -> tuple[Image.Image, float]:
    strip_height = mm(18)
    image = Image.new("RGB", (points_to_px(width), points_to_px(strip_height)), "white")
    right = points_to_px(width - mm(10))

    tag_height = mm_to_px(6.6)
    tag_width = mm_to_px(27.5)
    tag_x = right - tag_width
    tag_y = mm_to_px(3.8)

    draw = ImageDraw.Draw(image)
    draw.rounded_rectangle((tag_x, tag_y, tag_x + tag_width, tag_y + tag_height), radius=mm_to_px(0.9), fill=(203, 34, 21))

    logo = load_rgba_image(
        logo_path,
        target_width_px=tag_width - mm_to_px(3.2),
        target_height_px=tag_height - mm_to_px(2.1),
    )
    image.paste(logo, (tag_x + mm_to_px(1.6), tag_y + mm_to_px(1.05)), logo)
    return image, strip_height


def render_header_strip(
    *,
    width: float,
    title: str,
    mark_path: Path,
    font_regular_path: Path,
    font_bold_path: Path,
) -> tuple[Image.Image, float]:
    strip_height = mm(18)
    image = Image.new("RGB", (points_to_px(width), points_to_px(strip_height)), "white")
    draw = ImageDraw.Draw(image)

    left = mm_to_px(10)
    right = points_to_px(width - mm(10))
    label_font = load_font(font_bold_path, 5.6)
    title_text = truncate_text(title, 90)
    title_font = fit_text_font(
        font_regular_path,
        6.4,
        5.4,
        [title_text],
        width - mm(28),
    )

    draw.text(
        (left, mm_to_px(3.0)),
        "TRIKDIS MANUALS",
        font=label_font,
        fill=(203, 34, 21),
    )
    draw.text(
        (left, mm_to_px(7.0)),
        title_text,
        font=title_font,
        fill=(85, 85, 85),
    )
    draw.rectangle((left, mm_to_px(15.0), right, mm_to_px(15.2)), fill=(231, 163, 157))

    mark_size = mm_to_px(5.2)
    mark = load_rgba_image(mark_path, target_width_px=mark_size, target_height_px=mark_size)
    image.paste(mark, (right - mm_to_px(5.5), mm_to_px(3.2)), mark)

    return image, strip_height


def build_overlay_pdf(
    *,
    width: float,
    height: float,
    footer_image: Image.Image,
    footer_height: float,
    header_image: Image.Image | None,
    header_height: float | None,
) -> pikepdf.Pdf:
    canvas = Canvas(page_size=(width, height))
    canvas.do.draw_image(footer_image, 0, 0, width, footer_height)
    if header_image is not None and header_height is not None:
        canvas.do.draw_image(header_image, 0, height - header_height, width, header_height)
    return canvas.to_pdf()


def add_uri_annotation(pdf: pikepdf.Pdf, page: pikepdf.Page, uri: str, rect: tuple[float, float, float, float]) -> None:
    annotation = pdf.make_indirect(
        pikepdf.Dictionary(
            Type=pikepdf.Name("/Annot"),
            Subtype=pikepdf.Name("/Link"),
            Rect=pikepdf.Array(rect),
            Border=pikepdf.Array([0, 0, 0]),
            A=pikepdf.Dictionary(
                S=pikepdf.Name("/URI"),
                URI=uri,
            ),
        )
    )
    annots = page.obj.get("/Annots")
    if annots is None:
        annots = pikepdf.Array()
        page.obj["/Annots"] = annots
    annots.append(annotation)


def main() -> int:
    args = parse_args()
    input_path = Path(args.input).resolve()
    output_path = Path(args.output).resolve()
    logo_path = Path(args.logo).resolve()
    mark_path = Path(args.mark).resolve()
    font_regular_path = Path(args.font_regular).resolve()
    font_bold_path = Path(args.font_bold).resolve()

    for required_path, label in (
        (input_path, "Input PDF"),
        (logo_path, "Logo image"),
        (mark_path, "Mark image"),
        (font_regular_path, "Regular font"),
        (font_bold_path, "Bold font"),
    ):
        if not required_path.exists():
            raise FileNotFoundError(f"{label} not found: {required_path}")

    output_path.parent.mkdir(parents=True, exist_ok=True)

    with pikepdf.Pdf.open(input_path) as pdf:
        total_pages = len(pdf.pages)
        for index, page in enumerate(pdf.pages):
            page_box = page.trimbox if page.trimbox else page.mediabox
            width = float(page_box[2] - page_box[0])
            height = float(page_box[3] - page_box[1])

            footer_image, footer_height, link_annotations = render_footer_strip(
                width=width,
                page_number=index + 1,
                total_pages=total_pages,
                logo_path=logo_path,
                mark_path=mark_path,
                font_regular_path=font_regular_path,
            )

            header_image = None
            header_height = None
            if index == 0:
                header_image, header_height = render_first_page_corner_brand(
                    width=width,
                    logo_path=logo_path,
                )
            elif (index + 1) >= args.show_header_from:
                header_image, header_height = render_header_strip(
                    width=width,
                    title=args.title,
                    mark_path=mark_path,
                    font_regular_path=font_regular_path,
                    font_bold_path=font_bold_path,
                )

            overlay_pdf = build_overlay_pdf(
                width=width,
                height=height,
                footer_image=footer_image,
                footer_height=footer_height,
                header_image=header_image,
                header_height=header_height,
            )

            page.add_overlay(
                overlay_pdf.pages[0],
                Rectangle(0, 0, width, height),
                push_stack=True,
                shrink=False,
                expand=False,
            )

            for annotation in link_annotations:
                add_uri_annotation(pdf, page, annotation.uri, annotation.rect)

        pdf.save(output_path, object_stream_mode=pikepdf.ObjectStreamMode.preserve)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
