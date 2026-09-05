import { Fragment, useRef, useState } from 'react';
import { Popover } from './Popover';
import { Icon } from './Icon';
import { useReveal } from '../hooks/useReveal';
import cardBg from '../assets/img/card-bg.png';
import bulbSprite from '../assets/img/bulb-sprite.png';
import tabPrompt from '../assets/icons/tab-prompt.svg?raw';
import tabVideo from '../assets/icons/tab-video.svg?raw';
import tabImage from '../assets/icons/tab-image.svg?raw';
import wand from '../assets/icons/wand.svg';
import styleIcon from '../assets/icons/style.svg';
import aspectIcon from '../assets/icons/aspect-ratio.svg';
import autoModeIcon from '../assets/icons/auto-mode.svg';
import chevron from '../assets/icons/chevron-16.svg';
import sparkle from '../assets/icons/sparkle.svg';
import './GeneratorCard.css';

type TabId = 'prompt' | 'video' | 'image';

const TABS: { id: TabId; icon: string; label: string; shortLabel: string }[] = [
  { id: 'prompt', icon: tabPrompt, label: 'From prompt', shortLabel: 'Prompt' },
  { id: 'video', icon: tabVideo, label: 'From video', shortLabel: 'Video' },
  { id: 'image', icon: tabImage, label: 'From image', shortLabel: 'Image' },
];

const STYLES = ['Auto', 'Cinematic', 'Bold', 'Minimal', 'Neon', 'Retro'];

/* Canonical order from the design system — `auto` always sits last. */
const RATIOS = ['16:9', '9:16', '1:1', '4:3', '3:4', '21:9', 'Auto'];

const MIN_VARIANTS = 1;
const MAX_VARIANTS = 4;

const UPLOAD_COPY: Record<Exclude<TabId, 'prompt'>, { title: string; hint: string }> = {
  video: { title: 'Drop a video here', hint: 'MP4 or MOV, up to 200 MB' },
  image: { title: 'Drop an image here', hint: 'PNG or JPG, up to 20 MB' },
};

/** Mini frame preview for a ratio option, 16px on its longer side. */
function ratioBox(value: string) {
  if (value === 'Auto') return { width: 16, height: 12 };
  const [w, h] = value.split(':').map(Number);
  const scale = 16 / Math.max(w, h);
  return { width: Math.round(w * scale), height: Math.round(h * scale) };
}

type GeneratorCardProps = {
  variants: number;
  onVariantsChange: (value: number) => void;
  isGenerating: boolean;
  onGenerate: () => void;
};

export function GeneratorCard({
  variants,
  onVariantsChange,
  isGenerating,
  onGenerate,
}: GeneratorCardProps) {
  const [activeTab, setActiveTab] = useState<TabId>('prompt');
  const [prompt, setPrompt] = useState('');
  const [styleValue, setStyleValue] = useState('Auto');
  const [ratio, setRatio] = useState('16:9');
  const [openField, setOpenField] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const styleRef = useRef<HTMLButtonElement>(null);
  const ratioRef = useRef<HTMLButtonElement>(null);
  const variantsRef = useRef<HTMLButtonElement>(null);
  const reveal = useReveal<HTMLElement>();

  const toggle = (field: string) => setOpenField((current) => (current === field ? null : field));
  const close = () => setOpenField(null);

  return (
    <section className={`generator ${reveal.className}`} ref={reveal.ref}>
      <img className="generator__bg" src={cardBg} alt="" aria-hidden />
      <span className="generator__bulb" aria-hidden>
        <img src={bulbSprite} alt="" />
      </span>
      <span className="generator__particles" aria-hidden>
        {Array.from({ length: 7 }, (_, index) => (
          <span className="generator__particle" key={index} />
        ))}
      </span>

      <div className="generator__body">
        <div className="generator__intro">
          <h2 className="generator__title section-title">
            <span className="gradient-white">Thumbnail</span>
            <span className="gradient-lime">Generator</span>
          </h2>
          <p className="generator__subtitle">Drop in a frame, write the words that go on it.</p>
        </div>

        <div className="generator__compose">
          <div className="generator__tabs" role="tablist" aria-label="Creation modes">
            {TABS.map((tab, index) => (
              <Fragment key={tab.id}>
                {index === 2 && <span className="generator__tab-divider" aria-hidden />}
                <button
                  className={`generator__tab${activeTab === tab.id ? ' generator__tab--active' : ''}`}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls="generator-input"
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon markup={tab.icon} size={18} />
                  <span className="generator__tab-label">{tab.label}</span>
                  <span className="generator__tab-label generator__tab-label--short">{tab.shortLabel}</span>
                </button>
              </Fragment>
            ))}
          </div>

          {activeTab === 'prompt' ? (
            <div className="generator__prompt" id="generator-input">
              <label className="sr-only" htmlFor="generator-prompt">
                Describe the thumbnail you want to create
              </label>
              <textarea
                className="generator__prompt-input"
                id="generator-prompt"
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                placeholder="Describe the thumbnail you want to create..."
              />
              <button
                className="generator__prompt-action"
                type="button"
                aria-label="Enhance prompt"
                onClick={() => setPrompt((text) => (text ? `${text.trim()}, cinematic lighting, bold title` : ''))}
              >
                <img src={wand} alt="" width={18} height={18} />
              </button>
            </div>
          ) : (
            <label className="generator__upload" id="generator-input">
              <input
                className="sr-only"
                type="file"
                accept={activeTab === 'video' ? 'video/*' : 'image/*'}
                onChange={(event) => setFileName(event.target.files?.[0]?.name ?? null)}
              />
              <Icon markup={activeTab === 'video' ? tabVideo : tabImage} size={24} />
              <span className="generator__upload-title">{fileName ?? UPLOAD_COPY[activeTab].title}</span>
              <span className="generator__upload-hint">
                {fileName ? 'Click to replace' : UPLOAD_COPY[activeTab].hint}
              </span>
            </label>
          )}
        </div>

        <div className="generator__selects">
          <div className="generator__field">
            <span className="generator__field-label" id="label-style">
              Style
            </span>
            <button
              className="generator__select"
              type="button"
              ref={styleRef}
              aria-haspopup="dialog"
              aria-expanded={openField === 'style'}
              aria-labelledby="label-style"
              onClick={() => toggle('style')}
            >
              <img className="generator__select-icon" src={styleIcon} alt="" width={24} height={24} />
              <span className="generator__select-value">{styleValue}</span>
              <img className="generator__select-chevron" src={chevron} alt="" width={16} height={16} />
            </button>
            <Popover
              open={openField === 'style'}
              anchor={styleRef.current}
              onClose={close}
              labelledBy="label-style"
            >
              <div className="popover__grid">
                {STYLES.map((option) => (
                  <button
                    className="popover__option"
                    key={option}
                    type="button"
                    aria-pressed={option === styleValue}
                    onClick={() => {
                      setStyleValue(option);
                      close();
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </Popover>
          </div>

          <div className="generator__field">
            <span className="generator__field-label" id="label-ratio">
              Aspect ratio
            </span>
            <button
              className="generator__select"
              type="button"
              ref={ratioRef}
              aria-haspopup="dialog"
              aria-expanded={openField === 'ratio'}
              aria-labelledby="label-ratio"
              onClick={() => toggle('ratio')}
            >
              <img
                className="generator__select-icon generator__select-icon--dim"
                src={aspectIcon}
                alt=""
                width={24}
                height={24}
              />
              <span className="generator__select-value">{ratio}</span>
              <img className="generator__select-chevron" src={chevron} alt="" width={16} height={16} />
            </button>
            <Popover
              open={openField === 'ratio'}
              anchor={ratioRef.current}
              onClose={close}
              labelledBy="label-ratio"
            >
              <div className="popover__grid">
                {RATIOS.map((option) => (
                  <button
                    className="popover__option"
                    key={option}
                    type="button"
                    aria-pressed={option === ratio}
                    onClick={() => {
                      setRatio(option);
                      close();
                    }}
                  >
                    <span className="popover__ratio" style={ratioBox(option)} aria-hidden />
                    {option}
                  </button>
                ))}
              </div>
            </Popover>
          </div>

          <div className="generator__field">
            <span className="generator__field-label" id="label-variants">
              <span className="generator__field-label-full">Number of variants</span>
              <span className="generator__field-label-short">Variants</span>
            </span>
            <button
              className="generator__select"
              type="button"
              ref={variantsRef}
              aria-haspopup="dialog"
              aria-expanded={openField === 'variants'}
              aria-labelledby="label-variants"
              onClick={() => toggle('variants')}
            >
              <img className="generator__select-icon" src={autoModeIcon} alt="" width={24} height={24} />
              <span className="generator__select-value">{variants}</span>
              <img className="generator__select-chevron" src={chevron} alt="" width={16} height={16} />
            </button>
            <Popover
              open={openField === 'variants'}
              anchor={variantsRef.current}
              onClose={close}
              labelledBy="label-variants"
            >
              <div className="popover__stepper">
                <button
                  className="popover__step"
                  type="button"
                  aria-label="Fewer variants"
                  disabled={variants <= MIN_VARIANTS}
                  onClick={() => onVariantsChange(Math.max(MIN_VARIANTS, variants - 1))}
                >
                  −
                </button>
                <span className="popover__step-value" aria-live="polite">
                  {variants}
                </span>
                <button
                  className="popover__step"
                  type="button"
                  aria-label="More variants"
                  disabled={variants >= MAX_VARIANTS}
                  onClick={() => onVariantsChange(Math.min(MAX_VARIANTS, variants + 1))}
                >
                  +
                </button>
              </div>
            </Popover>
          </div>
        </div>

        <div className="generator__cta">
          <button
            className="btn-lime generator__submit"
            type="button"
            onClick={onGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <span className="generator__spinner" aria-hidden />
            ) : (
              <img src={sparkle} alt="" width={18} height={18} />
            )}
            {isGenerating ? 'Generating…' : 'Generate Thumbnails'}
          </button>
          <p className="generator__note">Free to try.&nbsp; No credit card required.</p>
        </div>
      </div>
    </section>
  );
}
