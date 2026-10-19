/*
 * Right-hand table of contents (desktop):
 * - highlights the section you are reading, and the chapter it belongs to;
 * - keeps that entry in view: the list scrolls along as you read (review feedback,
 *   9 Oct 2026: the highlight reached 3.3.2 and then disappeared off the bottom);
 * - shows only the current chapter's subsections; other chapters are collapsed.
 * Without JavaScript the whole list shows, as before.
 */
(function () {
  const ACTIVE_CLASS = "md-nav__link--active";
  const ACTIVE_ATTR = "aria-current";
  const OPEN_CLASS = "trik-toc-open"; // every list item on the path to the current entry
  const OFFSET = 120;
  const VIEW_MARGIN = 48; // px of the list kept visible above and below the current entry

  let lastCurrent = null;
  let listening = false;

  // Scroll the table of contents itself (not the page) so the entry stays in view.
  const keepInView = (link) => {
    const wrap = link.closest(".md-sidebar__scrollwrap");
    if (!wrap) return;
    const box = wrap.getBoundingClientRect();
    const item = link.getBoundingClientRect();
    if (item.top < box.top + VIEW_MARGIN || item.bottom > box.bottom - VIEW_MARGIN) {
      wrap.scrollTop += item.top - box.top - box.height / 3;
    }
  };

  const updateToc = () => {
    const toc = document.querySelector(".md-sidebar--secondary");
    if (!toc) return;
    const links = Array.from(toc.querySelectorAll(".md-nav__link")).filter(
      (link) => link.hash
    );
    if (!links.length) return;

    let current = null;
    links.forEach((link) => {
      const targetId = decodeURIComponent(link.hash || "").slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (!target) return;
      const top = target.getBoundingClientRect().top;
      if (top <= OFFSET) {
        current = link;
      }
    });

    if (!current) {
      current = links[0];
    }

    links.forEach((link) => {
      if (link === current) {
        link.classList.add(ACTIVE_CLASS);
        link.setAttribute(ACTIVE_ATTR, "true");
      } else {
        link.classList.remove(ACTIVE_CLASS);
        link.removeAttribute(ACTIVE_ATTR);
      }
    });

    // Open the chapter (and any section) that leads to the current entry.
    toc.querySelectorAll("." + OPEN_CLASS).forEach((li) => li.classList.remove(OPEN_CLASS));
    let li = current.closest("li.md-nav__item");
    while (li && toc.contains(li)) {
      li.classList.add(OPEN_CLASS);
      li = li.parentElement ? li.parentElement.closest("li.md-nav__item") : null;
    }
    document.documentElement.classList.add("trik-toc-collapse");

    if (current !== lastCurrent) {
      lastCurrent = current;
      keepInView(current);
    }
  };

  let ticking = false;
  const scheduleUpdate = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateToc();
      ticking = false;
    });
  };

  const onReady = () => {
    lastCurrent = null;
    updateToc();
    // Instant navigation calls this on every page; the listeners are needed once.
    if (!listening) {
      listening = true;
      window.addEventListener("scroll", scheduleUpdate, { passive: true });
      window.addEventListener("resize", scheduleUpdate);
    }
  };

  if (window.document$) {
    window.document$.subscribe(onReady);
  } else {
    document.addEventListener("DOMContentLoaded", onReady);
  }
})();
