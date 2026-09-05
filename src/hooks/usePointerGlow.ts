import type { PointerEvent } from 'react';

/**
 * Tracks the pointer inside an element as `--glow-x` / `--glow-y` custom
 * properties, so CSS can paint a glow that follows the cursor. Updates are
 * coalesced into an animation frame to keep pointermove cheap.
 */
export function handlePointerGlow<T extends HTMLElement>(event: PointerEvent<T>) {
  const el = event.currentTarget;
  const x = event.clientX;
  const y = event.clientY;

  if (el.dataset.glowPending) return;
  el.dataset.glowPending = '1';

  requestAnimationFrame(() => {
    delete el.dataset.glowPending;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--glow-x', `${x - rect.left}px`);
    el.style.setProperty('--glow-y', `${y - rect.top}px`);
  });
}
