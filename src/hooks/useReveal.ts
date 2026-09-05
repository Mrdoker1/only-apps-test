import { useEffect, useRef, useState } from 'react';

/**
 * Fades a block up once it scrolls into view. Returns the ref to attach and
 * the class name carrying the current state.
 */
export function useReveal<T extends HTMLElement>(delayMs = 0) {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      { rootMargin: '0px 0px -10% 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return {
    ref,
    className: shown ? 'reveal reveal--in' : 'reveal',
    style: delayMs ? { animationDelay: `${delayMs}ms` } : undefined,
  };
}
