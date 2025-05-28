// codex.js (Place inside /js/ folder)

export function fetchCodexData() {
  // Fetches the JSON from the codex.json file
  const request = new XMLHttpRequest();
  request.open('GET', './codex.json', false); // Synchronous for simplicity
  request.send(null);

  if (request.status === 200) {
    return JSON.parse(request.responseText);
  } else {
    console.error('Failed to load codex.json');
    return [];
  }
}

export function renderCodex(entries) {
  const container = document.getElementById('codexContainer');
  container.innerHTML = '';

  entries.forEach(entry => {
    const div = document.createElement('div');
    div.classList.add('codex-entry');
    div.id = entry.id;

    const title = document.createElement('h3');
    title.textContent = entry.title;
    div.appendChild(title);

    const summary = document.createElement('p');
    summary.textContent = entry.summary;
    div.appendChild(summary);

    if (entry.links && entry.links.length > 0) {
      const linksPara = document.createElement('p');
      linksPara.innerHTML = entry.links.map(link => {
        const label = link.replace(/\[\[|\]\]/g, '').trim();
        return `<span class="codex-link" data-target="${label}">[[${label}]]</span>`;
      }).join(' ');
      div.appendChild(linksPara);
    }

    if (entry.tags && entry.tags.length > 0) {
      const tagSpan = document.createElement('p');
      tagSpan.style.fontSize = '0.8rem';
      tagSpan.style.color = '#aaa';
      tagSpan.textContent = 'Tags: ' + entry.tags.join(', ');
      div.appendChild(tagSpan);
    }

    container.appendChild(div);
  });
}

export function enableCodexLinkInteractions() {
  document.addEventListener('click', e => {
    if (e.target.classList.contains('codex-link')) {
      const targetTitle = e.target.dataset.target;
      const entries = document.querySelectorAll('.codex-entry');

      entries.forEach(entry => {
        const heading = entry.querySelector('h3');
        if (heading.textContent === targetTitle) {
          entry.scrollIntoView({ behavior: 'smooth', block: 'start' });
          heading.classList.add('highlight');
          setTimeout(() => heading.classList.remove('highlight'), 1500);
        }
      });
    }
  });
}
