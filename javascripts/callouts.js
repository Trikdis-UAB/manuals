document.addEventListener('DOMContentLoaded', () => {
  const typeMap = {
    note: { className: 'md-alert-note', label: 'Note' },
    important: { className: 'md-alert-important', label: 'Important' },
    warning: { className: 'md-alert-warning', label: 'Warning' },
    tip: { className: 'md-alert-tip', label: 'Tip' },
    caution: { className: 'md-alert-caution', label: 'Caution' }
  };

  document.querySelectorAll('blockquote').forEach(block => {
    const first = block.firstElementChild;
    if (!first || first.tagName !== 'P') return;

    const match = first.textContent.trim().match(/^\[!(NOTE|IMPORTANT|WARNING|TIP|CAUTION)\]\s*(.*)$/i);
    if (!match) return;

    const typeKey = match[1].toLowerCase();
    const rest = match[2];
    const typeInfo = typeMap[typeKey] || typeMap.note;

    block.classList.add('md-alert', typeInfo.className);

    const title = document.createElement('div');
    title.className = 'md-alert-text';
    title.textContent = typeInfo.label;

    first.textContent = '';
    first.appendChild(title);
    if (rest) {
      const body = document.createElement('span');
      body.textContent = ' ' + rest;
      first.appendChild(body);
    }
  });
});
