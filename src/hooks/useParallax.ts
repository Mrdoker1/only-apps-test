import type { PointerEvent } from 'react';
import { motionAllowed } from './useMotionAllowed';

/** Largest offset, in pixels, that the deepest layer travels. */
const RANGE = 16;

type Point = { x: number; y: number };

const pending = new WeakMap<HTMLElement, Point>();

/**
 * Publishes the cursor position relative to the element centre as `--par-x` /
 * `--par-y`, so background layers can drift at their own depth.
 */
export function handleParallax<T extends HTMLElement>(event: PointerEvent<T>) {
  const el = event.currentTarget;
  if (!motionAllowed()) return;

  const scheduled = pending.has(el);
  pending.set(el, { x: event.clientX, y: event.clientY });
  if (scheduled) return;

  requestAnimationFrame(() => {
    const point = pending.get(el);
    pending.delete(el);
    if (!point) return;

    const rect = el.getBoundingClientRect();
    const dx = (point.x - (rect.left + rect.width / 2)) / (rect.width / 2);
    const dy = (point.y - (rect.top + rect.height / 2)) / (rect.height / 2);
    el.style.setProperty('--par-x', `${(dx * RANGE).toFixed(2)}px`);
    el.style.setProperty('--par-y', `${(dy * RANGE).toFixed(2)}px`);
  });
}
