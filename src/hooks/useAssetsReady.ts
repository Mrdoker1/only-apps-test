import { useEffect, useState } from 'react';

/** A stalled asset must never trap the visitor on the loading screen. */
const TIMEOUT_MS = 8000;

/** Keeps the loader on screen long enough to read as intentional. */
const MIN_VISIBLE_MS = 350;

/**
 * Preloads the given images and waits for webfonts, reporting progress so the
 * loading screen can show how far along it is.
 */
export function useAssetsReady(urls: string[]) {
  const [loaded, setLoaded] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const startedAt = performance.now();

    const finish = () => {
      if (cancelled) return;
      const elapsed = performance.now() - startedAt;
      const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);
      window.setTimeout(() => !cancelled && setReady(true), wait);
    };

    let settled = 0;
    const images = urls.map(
      (url) =>
        new Promise<void>((resolve) => {
          const image = new Image();
          const done = () => {
            settled += 1;
            if (!cancelled) setLoaded(settled);
            resolve();
          };
          image.onload = done;
          image.onerror = done;
          image.src = url;
        }),
    );

    const fonts = document.fonts ? document.fonts.ready.then(() => undefined) : Promise.resolve();
    Promise.all([...images, fonts]).then(finish);

    const timer = window.setTimeout(finish, TIMEOUT_MS);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [urls]);

  return { ready, progress: urls.length ? loaded / urls.length : 1 };
}
