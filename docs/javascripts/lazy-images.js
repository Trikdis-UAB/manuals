(function () {
  const applyLazyLoading = () => {
    document.querySelectorAll('.md-content img:not([loading])').forEach((img) => {
      img.loading = 'lazy';
      img.decoding = 'async';
    });
  };

  if (window.document$) {
    window.document$.subscribe(applyLazyLoading);
  } else {
    document.addEventListener('DOMContentLoaded', applyLazyLoading);
  }
})();
