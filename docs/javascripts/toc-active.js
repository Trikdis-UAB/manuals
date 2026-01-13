(function () {
  const ACTIVE_CLASS = "md-nav__link--active";
  const ACTIVE_ATTR = "aria-current";
  const OFFSET = 120;

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
    updateToc();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
  };

  if (window.document$) {
    window.document$.subscribe(onReady);
  } else {
    document.addEventListener("DOMContentLoaded", onReady);
  }
})();
