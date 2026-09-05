const ui = {
  views: {
    home: document.getElementById('homeView'),
    capture: document.getElementById('captureView'),
    detail: document.getElementById('detailView'),
  },
  entriesGrid: document.getElementById('entriesGrid'),
  emptyState: document.getElementById('emptyState'),
  detailCard: document.getElementById('detailCard'),
  video: document.getElementById('video'),
  canvas: document.getElementById('photoCanvas'),
  cameraError: document.getElementById('cameraError'),
  fileInput: document.getElementById('fileInput'),
  modelStatus: document.getElementById('modelStatus'),
  captureStatus: document.getElementById('captureStatus'),
  statsEl: document.getElementById('statsEl'),
};

function showView(name) {
  Object.values(ui.views).forEach((v) => v.classList.remove('active'));
  ui.views[name].classList.add('active');
}

function renderEntries(entries) {
  if (!entries.length) {
    ui.entriesGrid.classList.add('hidden');
    ui.emptyState.classList.remove('hidden');
    return;
  }
  ui.entriesGrid.classList.remove('hidden');
  ui.emptyState.classList.add('hidden');
  ui.entriesGrid.innerHTML = entries
    .map(
      (e) => `
      <article class="entry-card" data-id="${e.id}">
        <img src="${e.media}" alt="Capture">
        <div class="meta">
          <p class="title">${escapeHtml(e.title || 'Untitled Capture')}</p>
          <p class="date">${new Date(e.createdAt).toLocaleString()}</p>
          ${e.confidence ? `<span class="confidence-badge">${e.confidence}%</span>` : ''}
        </div>
      </article>
    `
    )
    .join('');
}

function renderDetail(entry) {
  const tagsHtml = (entry.tags || [])
    .map((t) => `<span class="tag-chip">${escapeHtml(t)}</span>`)
    .join('');
  ui.detailCard.innerHTML = `
    <img src="${entry.media}" alt="Capture">
    <div class="detail-body">
      <input class="detail-title" value="${escapeHtml(entry.title || '')}" placeholder="Give it a name" />
      <p class="detail-meta">${new Date(entry.createdAt).toLocaleString()}</p>
      ${entry.label ? `<p class="ai-label">AI: ${escapeHtml(entry.label)} ${entry.confidence ? `(${entry.confidence}%)` : ''}</p>` : ''}
      <div class="tags-row">${tagsHtml}</div>
      <textarea rows="3" placeholder="Add notes...">${escapeHtml(entry.notes || '')}</textarea>
      <div class="detail-actions">
        <button id="saveDetailBtn" class="btn">Save</button>
        <button id="deleteDetailBtn" class="btn btn-secondary">Delete</button>
      </div>
    </div>
  `;

  document.getElementById('saveDetailBtn').addEventListener('click', () => {
    const title = document.querySelector('.detail-title').value.trim();
    const notes = document.querySelector('textarea').value.trim();
    window.app.saveDetail(entry.id, { title, notes });
  });

  document.getElementById('deleteDetailBtn').addEventListener('click', () => {
    if (confirm('Delete this entry?')) {
      window.app.deleteDetail(entry.id);
    }
  });
}

function renderStats(entries) {
  const total = entries.length;
  const today = new Date().toDateString();
  const todayCount = entries.filter((e) => new Date(e.createdAt).toDateString() === today).length;
  const uniqueLabels = new Set(entries.map((e) => (e.label || '').toLowerCase()).filter(Boolean)).size;
  ui.statsEl.textContent = `Captured: ${total} | Today: ${todayCount} | Species: ${uniqueLabels}`;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
