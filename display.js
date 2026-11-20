const widget = document.createElement('div');
widget.style.cssText = `
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 2147483647;
  display: none;
  align-items: center;
  background: rgba(15, 15, 15, 0.85);
  backdrop-filter: blur(5px);
  color: white;
  padding: 10px 15px;
  border-radius: 10px;
  border-left: 4px solid #1DB954;
  font-family: 'Segoe UI', sans-serif;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.6);
  pointer-events: none;
  transition: opacity 0.3s ease;
`;

widget.innerHTML = `
  <img id="sp-cover" style="width: 48px; height: 48px; border-radius: 6px; margin-right: 12px; object-fit: cover;" />
  <div style="max-width: 220px; overflow: hidden;">
    <div id="sp-title" style="font-weight: bold; font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"></div>
    <div id="sp-artist" style="font-size: 12px; color: #b3b3b3; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: 2px;"></div>
  </div>
`;

document.body.appendChild(widget);

function updateWidget(track) {
  if (!track || !track.title) return;
  widget.style.display = 'flex';
  document.getElementById('sp-title').innerText = track.title;
  document.getElementById('sp-artist').innerText = track.artist;
  document.getElementById('sp-cover').src = track.cover;
}

// Affiche la musique immédiatement si elle tourne déjà
chrome.storage.local.get(['currentTrack'], (result) => {
  if (result.currentTrack) updateWidget(result.currentTrack);
});

// Met à jour à chaque changement de son
chrome.storage.onChanged.addListener((changes) => {
  if (changes.currentTrack && changes.currentTrack.newValue) {
    updateWidget(changes.currentTrack.newValue);
  }
});
