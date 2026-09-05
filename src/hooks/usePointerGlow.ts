import type { PointerEvent } from 'react';

type Point = { x: number; y: number };

const pending = new WeakMap<HTMLElement, Point>();

/**
 * Tracks the pointer inside an element as `--glow-x` / `--glow-y` custom
 * properties, so CSS can paint a glow that follows the cursor. Writes are
 * coalesced into an animation frame, always applying the latest position.
 */
export function handlePointerGlow<T extends HTMLElement>(event: PointerEvent<T>) {
  const el = event.currentTarget;
  const scheduled = pending.has(el);
  pending.set(el, { x: event.clientX, y: event.clientY });
  if (scheduled) return;

  requestAnimationFrame(() => {
    const point = pending.get(el);
    pending.delete(el);
    if (!point) return;

    const rect = el.getBoundingClientRect();
    el.style.setProperty('--glow-x', `${point.x - rect.left}px`);
    el.style.setProperty('--glow-y', `${point.y - rect.top}px`);
  });
}
