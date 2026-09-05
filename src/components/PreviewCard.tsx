import { useEffect, useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { handlePointerGlow } from '../hooks/usePointerGlow';
import bulbSprite from '../assets/img/bulb-sprite.png';
import downloadIcon from '../assets/icons/download.svg';
import editIcon from '../assets/icons/edit.svg';
import lightbulb from '../assets/icons/lightbulb.svg';
import thumb1 from '../assets/img/thumb-1.png';
import thumb2 from '../assets/img/thumb-2.png';
import thumb3 from '../assets/img/thumb-3.png';
import thumb4 from '../assets/img/thumb-4.png';
import './PreviewCard.css';

const THUMBNAILS = [
  { src: thumb1, alt: 'Thumbnail variant “Built different”' },
  { src: thumb2, alt: 'Thumbnail variant “A trip you’ll never forget”' },
  { src: thumb3, alt: 'Thumbnail variant “This changes everything”' },
  { src: thumb4, alt: 'Thumbnail variant “Good boy mode”' },
];

type PreviewCardProps = {
  count: number;
  runId: number;
  isGenerating: boolean;
};

export function PreviewCard({ count, runId, isGenerating }: PreviewCardProps) {
  const [selected, setSelected] = useState(0);
  const reveal = useReveal<HTMLElement>(80);

  // A fresh run always highlights the first result.
  useEffect(() => setSelected(0), [runId]);

  const shown = THUMBNAILS.slice(0, count);

  return (
    <section
      className={`preview glow-card ${reveal.className}`}
      ref={reveal.ref}
      style={reveal.style}
      onPointerMove={handlePointerGlow}
    >
      <div className="preview__body">
        <div className="preview__head">
          <span className="preview__mark" aria-hidden>
            <img src={bulbSprite} alt="" />
          </span>
          <div className="preview__head-text">
            <h2 className="preview__title">Preview</h2>
            <p className="preview__subtitle">Choose the one that works best.</p>
          </div>
          <span className="eyebrow preview__count" aria-live="polite">
            <span className="eyebrow__dot" aria-hidden />
            <span className="preview__count-swap">
              <span className={isGenerating ? 'is-on' : undefined}>Working…</span>
              <span className={isGenerating ? undefined : 'is-on'}>{count} generated</span>
            </span>
          </span>
        </div>

        <div className="preview__grid">
          {isGenerating
            ? Array.from({ length: count }, (_, index) => (
                <span className="preview__skeleton" key={index} aria-hidden />
              ))
            : shown.map((thumb, index) => (
                <button
                  className={`preview__thumb${index === selected ? ' preview__thumb--selected' : ''}`}
                  key={thumb.src}
                  type="button"
                  aria-pressed={index === selected}
                  onClick={() => setSelected(index)}
                >
                  <img src={thumb.src} alt={thumb.alt} />
                  <span className="preview__thumb-badge" aria-hidden>
                    Selected
                  </span>
                </button>
              ))}
        </div>

        <div className="preview__actions">
          <button className="preview__action preview__action--solid" type="button" disabled={isGenerating}>
            <img src={downloadIcon} alt="" width={18} height={18} />
            Download all
          </button>
          <button className="preview__action preview__action--ghost" type="button" disabled={isGenerating}>
            <img src={editIcon} alt="" width={18} height={18} />
            Edit &amp; Refine
          </button>
        </div>
      </div>

      <hr className="preview__rule" />

      <div className="preview__tip">
        <img src={lightbulb} alt="" width={24} height={24} />
        <p>
          Be specific with your prompt, try different styles, or generate more variants to find the perfect thumbnail.
        </p>
      </div>
    </section>
  );
}
