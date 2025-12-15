(function() {
  const MOBILE_BREAKPOINT = 960;

  const setMode = (mode) => {
    document.body.classList.remove('mobile-nav-mode', 'mobile-toc-mode');
    document.body.classList.add(mode === 'toc' ? 'mobile-toc-mode' : 'mobile-nav-mode');
    const navBtn = document.querySelector('.mobile-nav-toggle button[data-mode="nav"]');
    const tocBtn = document.querySelector('.mobile-nav-toggle button[data-mode="toc"]');
    if (navBtn && tocBtn) {
      navBtn.classList.toggle('is-active', mode === 'nav');
      tocBtn.classList.toggle('is-active', mode === 'toc');
    }
  };

  const buildToggle = () => {
    const primaryScroll = document.querySelector('.md-sidebar--primary .md-sidebar__scroll');
    const tocNav = document.querySelector('.md-sidebar--secondary .md-nav');
    if (!primaryScroll || !tocNav) return;

    // Ensure toggle exists
    let toggle = primaryScroll.querySelector('.mobile-nav-toggle');
    if (!toggle) {
      toggle = document.createElement('div');
      toggle.className = 'mobile-nav-toggle';
      toggle.innerHTML = `
        <button type="button" data-mode="toc">Contents</button>
        <button type="button" data-mode="nav">Site</button>
      `;
      primaryScroll.prepend(toggle);
      toggle.addEventListener('click', (e) => {
        const mode = e.target?.dataset?.mode;
        if (mode) setMode(mode);
      });
    }

    // Clone TOC into primary sidebar for mobile
    let mobileToc = primaryScroll.querySelector('#mobile-toc');
    if (mobileToc) {
      mobileToc.remove();
    }
    mobileToc = tocNav.cloneNode(true);
    mobileToc.id = 'mobile-toc';
    primaryScroll.insertBefore(mobileToc, toggle.nextSibling);

    // Default to TOC view on load
    setMode('toc');
  };

  const handleResize = () => {
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    if (isMobile) {
      buildToggle();
    } else {
      document.body.classList.remove('mobile-nav-mode', 'mobile-toc-mode');
    }
  };

  // Re-run on instant navigation
  const onReady = () => {
    handleResize();
  };

  if (window.document$) {
    window.document$.subscribe(onReady);
  } else {
    document.addEventListener('DOMContentLoaded', onReady);
  }

  window.addEventListener('resize', handleResize);
})();
