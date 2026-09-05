const camera = new Camera(ui.video, ui.canvas);
let cameraReady = false;
let modelReady = false;
let modelLoading = false;

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
  renderStats(entries);
}

function renderStats(entries) {
  const total = entries.length;
  const today = new Date().toDateString();
  const todayCount = entries.filter((e) => new Date(e.createdAt).toDateString() === today).length;
  const uniqueLabels = new Set(entries.map((e) => (e.label || '').toLowerCase()).filter(Boolean)).size;
  ui.statsEl.textContent = `Captured: ${total} | Today: ${todayCount} | Species: ${uniqueLabels}`;
}

async function initModel() {
  if (modelReady || modelLoading) return;
  modelLoading = true;
  ui.modelStatus.textContent = 'Loading AI...';
  await window.recognition.ensureModel();
  modelReady = true;
  modelLoading = false;
  ui.modelStatus.textContent = 'AI Ready';
}

async function classifyAndSave(dataUrl) {
  const entry = {
    id: crypto.randomUUID(),
    media: dataUrl,
    title: '',
    notes: '',
    label: '',
    confidence: 0,
    tags: [],
    createdAt: Date.now(),
  };

  const img = new Image();
  img.src = dataUrl;
  await img.decode();

  if (!modelReady) {
    ui.captureStatus.textContent = 'Analyzing...';
    await initModel();
  }

  const predictions = await window.recognition.classifyImage(img);
  if (predictions.length) {
    entry.label = predictions[0].label;
    entry.confidence = predictions[0].confidence;
    entry.title = predictions[0].label;
    entry.tags = predictions.slice(0, 3).map((p) => p.label);
  }

  window.storage.addEntry(entry);
  ui.captureStatus.textContent = '';
  refreshHome();
  showView('home');
}

window.app = {
  async capture() {
    const dataUrl = camera.capture();
    if (!dataUrl) {
      alert('Could not capture photo.');
      return;
    }
    ui.captureStatus.textContent = 'Analyzing...';
    await classifyAndSave(dataUrl);
  },

  async pickFile(file) {
    try {
      const dataUrl = await camera.fromFile(file);
      ui.captureStatus.textContent = 'Analyzing...';
      await classifyAndSave(dataUrl);
    } catch (e) {
      alert('Could not process selected image.');
      ui.captureStatus.textContent = '';
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
initModel();
refreshHome();
showView('home');
