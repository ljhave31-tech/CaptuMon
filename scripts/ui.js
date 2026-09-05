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
        </div>
      </article>
    `
    )
    .join('');
}

function renderDetail(entry) {
  ui.detailCard.innerHTML = `
    <img src="${entry.media}" alt="Capture">
    <div class="detail-body">
      <input class="detail-title" value="${escapeHtml(entry.title || '')}" placeholder="Give it a name" />
      <p class="detail-meta">${new Date(entry.createdAt).toLocaleString()}</p>
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

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
