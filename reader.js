setInterval(() => {
  const titleEl = document.querySelector('[data-testid="context-item-info-title"]');
  const artistEl = document.querySelector('[data-testid="context-item-info-subtitles"]');
  const imgEl = document.querySelector('[data-testid="cover-art-image"]');

  if (titleEl && artistEl) {
    chrome.storage.local.set({
      currentTrack: {
        title: titleEl.innerText,
        artist: artistEl.innerText,
        cover: imgEl ? imgEl.src : ""
      }
    });
  }
}, 2000);
