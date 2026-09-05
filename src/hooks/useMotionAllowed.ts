/** True unless the visitor asked for reduced motion. */
export function motionAllowed() {
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
