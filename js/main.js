import { initScene } from './platonic.js';
import { fetchCodexData, renderCodex, enableCodexLinkInteractions } from './codex.js';

async function main() {
  initScene();

  try {
    const codexData = await fetchCodexData();
    if (codexData && codexData.length > 0) {
      renderCodex(codexData);
      enableCodexLinkInteractions(); // Make [[links]] clickable
    } else {
      console.warn('Codex data is empty or failed to load.');
    }
  } catch (err) {
    console.error('Failed to load codex data:', err);
  }
}

main();
