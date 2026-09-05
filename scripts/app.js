const camera = new Camera(ui.video, ui.canvas);
let cameraReady = false;

async function initCamera() {
  cameraReady = await camera.start();
  if (!cameraReady) {
    ui.video.hidden = true;
    ui.cameraError.classList.remove('hidden');
  }
}

function refreshHome() {
  const entries = window.storage.loadEntries();
  renderEntries(entries);
}

window.app = {
  async capture() {
    const dataUrl = camera.capture();
    if (!dataUrl) {
      alert('Could not capture photo.');
      return;
    }
    const entry = {
      id: crypto.randomUUID(),
      media: dataUrl,
      title: '',
      notes: '',
      createdAt: Date.now(),
    };
    window.storage.addEntry(entry);
    refreshHome();
    showView('home');
  },

  async pickFile(file) {
    try {
      const dataUrl = await camera.fromFile(file);
      const entry = {
        id: crypto.randomUUID(),
        media: dataUrl,
        title: '',
        notes: '',
        createdAt: Date.now(),
      };
      window.storage.addEntry(entry);
      refreshHome();
      showView('home');
    } catch (e) {
      alert('Could not process selected image.');
    }
  },

  openDetail(id) {
    const entry = window.storage.loadEntries().find((e) => e.id === id);
    if (!entry) return;
    renderDetail(entry);
    showView('detail');
  },

  saveDetail(id, updates) {
    window.storage.updateEntry(id, updates);
    refreshHome();
    showView('home');
  },

  deleteDetail(id) {
    window.storage.deleteEntry(id);
    refreshHome();
    showView('home');
  },

  resetAll() {
    if (!confirm('Delete all captures? This cannot be undone.')) return;
    window.storage.clearAll();
    refreshHome();
  },
};

document.getElementById('navHome').addEventListener('click', () => {
  refreshHome();
  showView('home');
});

document.getElementById('navCapture').addEventListener('click', () => {
  showView('capture');
  if (!cameraReady) initCamera();
});

document.getElementById('captureBtn').addEventListener('click', () => {
  window.app.capture();
});

document.getElementById('switchCameraBtn').addEventListener('click', async () => {
  cameraReady = await camera.switchCamera();
});

document.getElementById('useFileBtn').addEventListener('click', () => {
  ui.fileInput.click();
});

ui.fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) window.app.pickFile(file);
  ui.fileInput.value = '';
});

document.getElementById('backBtn').addEventListener('click', () => {
  refreshHome();
  showView('home');
});

ui.entriesGrid.addEventListener('click', (e) => {
  const card = e.target.closest('.entry-card');
  if (card) window.app.openDetail(card.dataset.id);
});

document.getElementById('resetBtn').addEventListener('click', () => window.app.resetAll());

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}

initCamera();
refreshHome();
showView('home');
