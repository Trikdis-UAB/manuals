#!/bin/sh
# Made the camera pictures the VideoHub screens show (fixtures/media/, committed) from real frames of
# TRIKDIS's own demo cameras "Backyard" and "Street" (detection snapshots, 960x540, and the device's
# 300x300 crops), read from the beta server 2026-11-27. Publishing them was approved by Andrius on
# 2026-11-27, with licence plates blurred: they are blurred here whether legible or not. The original
# frames are not in the repo and must never be committed. Check every output image for plates.
#   sh dev/vh-media.sh <folder with full-253464.jpg full-253473.jpg full-253449.jpg backyard.jpg street.jpg>
set -eu
SRC=$1
OUT=$(cd "$(dirname "$0")/.." && pwd)/fixtures/media
mkdir -p "$OUT"
PLATE='-region 70x26+435+412 -blur 0x6 +region'
# Backyard, 07:58: a person detected (PERSON 75 %), the silver car parked, no box on it.
magick "$SRC/full-253464.jpg" $PLATE "$OUT/backyard-person-full.jpg"
magick "$SRC/full-253464.jpg" -crop 240x240+573+293 +repage -resize 300x300 "$OUT/backyard-person-crop.jpg"
# Backyard, 07:59: the car detected (CAR 76 %), and the device's own crop of it.
magick "$SRC/full-253473.jpg" $PLATE "$OUT/backyard-car-full.jpg"
magick "$SRC/backyard.jpg" -region 60x22+120+176 -blur 0x5 +region "$OUT/backyard-car-crop.jpg"
# A live frame without detection boxes: 07:59's frame with the car's box area taken from 07:58, where
# the car has no box. Used for the camera snapshot and the masks and zones editor.
magick "$SRC/full-253473.jpg" \( "$SRC/full-253464.jpg" -crop 132x140+410+308 \) -geometry +410+308 -composite $PLATE "$OUT/backyard-live.jpg"
# Street, 07:51: a car detected far away (CAR 74 %), and the device's crop.
cp "$SRC/full-253449.jpg" "$OUT/street-car-full.jpg"
cp "$SRC/street.jpg" "$OUT/street-car-crop.jpg"
# Preview (the app shows the low-resolution preview as an image) and video: stills of each event's frame,
# not real clips.
for e in backyard-person backyard-car street-car; do
  magick "$OUT/$e-full.jpg" -resize 480x270 "$OUT/$e-preview.gif"
  ffmpeg -loglevel error -y -loop 1 -t 3 -i "$OUT/$e-full.jpg" -c:v libx264 -pix_fmt yuv420p -r 10 "$OUT/$e.mp4"
done
# No metadata in the pictures.
magick mogrify -strip "$OUT"/*.jpg
ls -la "$OUT"
