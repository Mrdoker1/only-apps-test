import { useEffect, useState } from 'react';
import { motionAllowed } from './useMotionAllowed';

/** Steps a small number up to its target, one unit at a time. */
export function useCountUp(target: number, runKey: number, stepMs = 130) {
  const [value, setValue] = useState(target);

  useEffect(() => {
    if (!motionAllowed()) {
      setValue(target);
      return;
    }

    setValue(0);
    let current = 0;
    const timer = window.setInterval(() => {
      current += 1;
      setValue(current);
      if (current >= target) window.clearInterval(timer);
    }, stepMs);

    return () => window.clearInterval(timer);
  }, [target, runKey, stepMs]);

  return value;
}
