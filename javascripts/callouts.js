(function () {
  const TYPE_MAP = {
    note: { className: 'md-alert-note', label: 'Note' },
    important: { className: 'md-alert-important', label: 'Important' },
    warning: { className: 'md-alert-warning', label: 'Warning' },
    caution: { className: 'md-alert-caution', label: 'Caution' },
    tip: { className: 'md-alert-tip', label: 'Tip' }
  };

  const SELECTOR = 'blockquote';
  const MATCH = /^\[!(NOTE|IMPORTANT|WARNING|CAUTION|TIP)\]\s*(.*)$/i;

  function enhance(block) {
    const first = block.firstElementChild;
    if (!first || first.tagName !== 'P') return;
    const text = (first.textContent || '').trim();
    const match = text.match(MATCH);
    if (!match) return;

    const typeKey = match[1].toLowerCase();
    const rest = match[2];
    const typeInfo = TYPE_MAP[typeKey] || TYPE_MAP.note;

    const wrapper = document.createElement('div');
    wrapper.classList.add('md-alert', typeInfo.className);

    const title = document.createElement('div');
    title.className = 'md-alert-text';
    title.textContent = typeInfo.label;
    wrapper.appendChild(title);

    // Remove the directive marker from the first paragraph.
    first.innerHTML = first.innerHTML.replace(MATCH, '').trim();

    const body = document.createElement('div');
    body.className = 'md-alert-body';

    const children = Array.from(block.childNodes);
    children.forEach(child => {
      if (child === first) {
        if (first.textContent.trim().length || first.children.length) {
          body.appendChild(first);
        }
      } else {
        body.appendChild(child);
      }
    });

    if (!body.childNodes.length) {
      const fallback = document.createElement('p');
      fallback.textContent = rest || '';
      body.appendChild(fallback);
    } else if (rest && !body.firstChild) {
      const intro = document.createElement('p');
      intro.textContent = rest;
      body.insertBefore(intro, body.firstChild);
    }

    wrapper.appendChild(body);
    block.replaceWith(wrapper);
  }

  function run() {
    document.querySelectorAll(SELECTOR).forEach(enhance);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
