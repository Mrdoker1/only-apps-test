import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import './Popover.css';

const OFFSET = 8;
const VIEWPORT_MARGIN = 8;
const MAX_HEIGHT = 384;

type PopoverProps = {
  anchor: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  /** Either an explicit label or the id of the element that names the popover. */
  label?: string;
  labelledBy?: string;
  children: ReactNode;
};

type Placement = { top: number; left: number; minWidth: number; side: 'top' | 'bottom' };

/**
 * Anchored popover following the design spec: opens below its trigger with an
 * 8px offset, flips above when there is not enough room, never covers the
 * trigger, and closes on Escape, outside click or scroll.
 */
export function Popover({ anchor, open, onClose, label, labelledBy, children }: PopoverProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [placement, setPlacement] = useState<Placement | null>(null);

  const position = useCallback(() => {
    const content = contentRef.current;
    if (!anchor || !content) return;

    const trigger = anchor.getBoundingClientRect();
    const height = Math.min(content.offsetHeight, MAX_HEIGHT);
    const spaceBelow = window.innerHeight - trigger.bottom - OFFSET;
    const spaceAbove = trigger.top - OFFSET;
    const side = spaceBelow < height && spaceAbove > spaceBelow ? 'top' : 'bottom';

    const maxLeft = window.innerWidth - content.offsetWidth - VIEWPORT_MARGIN;
    const left = Math.max(VIEWPORT_MARGIN, Math.min(trigger.left, maxLeft));

    setPlacement({
      top: side === 'bottom' ? trigger.bottom + OFFSET : trigger.top - OFFSET - height,
      left,
      minWidth: trigger.width,
      side,
    });
  }, [anchor]);

  useLayoutEffect(() => {
    if (!open) {
      setPlacement(null);
      return;
    }
    position();
  }, [open, position]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      event.stopPropagation();
      onClose();
      anchor?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (contentRef.current?.contains(target) || anchor?.contains(target)) return;
      onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('resize', position);
    window.addEventListener('scroll', position, true);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('resize', position);
      window.removeEventListener('scroll', position, true);
    };
  }, [open, onClose, anchor, position]);

  // Move focus inside once positioned so arrow keys work straight away.
  useEffect(() => {
    if (!open || !placement) return;
    contentRef.current?.querySelector<HTMLElement>('button:not(:disabled)')?.focus();
  }, [open, placement]);

  const onArrowKeys = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;

    const items = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled)'),
    );
    if (items.length === 0) return;

    event.preventDefault();
    const current = items.indexOf(document.activeElement as HTMLElement);
    const step = event.key === 'ArrowDown' ? 1 : -1;
    items[(current + step + items.length) % items.length].focus();
  };

  if (!open) return null;

  return createPortal(
    <div
      className={`popover popover--${placement?.side ?? 'bottom'}`}
      ref={contentRef}
      role="dialog"
      onKeyDown={onArrowKeys}
      aria-label={label}
      aria-labelledby={labelledBy}
      style={{
        top: placement?.top ?? -9999,
        left: placement?.left ?? -9999,
        minWidth: placement?.minWidth,
        visibility: placement ? 'visible' : 'hidden',
      }}
    >
      {children}
    </div>,
    document.body,
  );
}


