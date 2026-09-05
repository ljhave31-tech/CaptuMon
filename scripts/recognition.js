let model = null;
let loading = false;

async function ensureModel() {
  if (model) return model;
  if (loading) {
    await new Promise((resolve) => {
      const interval = setInterval(() => {
        if (model || !loading) {
          clearInterval(interval);
          resolve();
        }
      }, 100);
    });
    return model;
  }
  loading = true;
  try {
    model = await mobilenet.load({ version: 2, alpha: 1.0 });
  } catch (e) {
    console.warn('Failed to load MobileNet:', e);
  }
  loading = false;
  return model;
}

async function classifyImage(imgElement) {
  const m = await ensureModel();
  if (!m) return [];
  try {
    const predictions = await m.classify(imgElement, 5);
    return predictions.map((p) => ({
      label: p.className.split(',')[0].trim(),
      confidence: Math.round(p.probability * 100),
    }));
  } catch (e) {
    console.warn('Classification failed:', e);
    return [];
  }
}
