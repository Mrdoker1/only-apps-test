import cardBg from '../assets/img/card-bg.png';
import bulbSprite from '../assets/img/bulb-sprite.png';
import tabPrompt from '../assets/icons/tab-prompt.svg';
import tabVideo from '../assets/icons/tab-video.svg';
import tabImage from '../assets/icons/tab-image.svg';
import wand from '../assets/icons/wand.svg';
import styleIcon from '../assets/icons/style.svg';
import aspectIcon from '../assets/icons/aspect-ratio.svg';
import autoModeIcon from '../assets/icons/auto-mode.svg';
import chevron from '../assets/icons/chevron-16.svg';
import sparkle from '../assets/icons/sparkle.svg';
import './GeneratorCard.css';

const TABS = [
  { id: 'prompt', icon: tabPrompt, label: 'From prompt', shortLabel: 'Prompt' },
  { id: 'video', icon: tabVideo, label: 'From video', shortLabel: 'Video' },
  { id: 'image', icon: tabImage, label: 'From image', shortLabel: 'Image' },
];

const SELECTS = [
  { id: 'style', label: 'Style', shortLabel: 'Style', icon: styleIcon, value: 'Auto', dim: false },
  { id: 'ratio', label: 'Aspect ratio', shortLabel: 'Aspect ratio', icon: aspectIcon, value: '16:9', dim: true },
  { id: 'variants', label: 'Number of variants', shortLabel: 'Variants', icon: autoModeIcon, value: '4', dim: false },
];

export function GeneratorCard() {
  return (
    <section className="generator">
      <img className="generator__bg" src={cardBg} alt="" aria-hidden />
      <span className="generator__bulb" aria-hidden>
        <img src={bulbSprite} alt="" />
      </span>

      <div className="generator__body">
        <div className="generator__intro">
          <h2 className="generator__title section-title">
            <span className="gradient-white">Thumbnail</span>
            <span className="gradient-lime">Generator</span>
          </h2>
          <p className="generator__subtitle">Drop in a frame, write the words that go on it.</p>
        </div>

        <div className="generator__tabs" role="tablist" aria-label="Creation modes">
          {TABS.map((tab, index) => (
            <div className="generator__tab-slot" key={tab.id}>
              {index === 2 && <span className="generator__tab-divider" aria-hidden />}
              <button
                className={`generator__tab${index === 0 ? ' generator__tab--active' : ''}`}
                type="button"
                role="tab"
                aria-selected={index === 0}
              >
                <img src={tab.icon} alt="" width={18} height={18} />
                <span className="generator__tab-label">{tab.label}</span>
                <span className="generator__tab-label generator__tab-label--short">{tab.shortLabel}</span>
              </button>
            </div>
          ))}
        </div>

        <div className="generator__prompt">
          <textarea
            className="generator__prompt-input"
            placeholder="Describe the thumbnail you want to create..."
            aria-label="Thumbnail prompt"
          />
          <button className="generator__prompt-action" type="button" aria-label="Enhance prompt">
            <img src={wand} alt="" width={18} height={18} />
          </button>
        </div>

        <div className="generator__selects">
          {SELECTS.map((select) => (
            <div className="generator__field" key={select.id}>
              <span className="generator__field-label">{select.label}</span>
              <span className="generator__field-label generator__field-label--short">{select.shortLabel}</span>
              <button className="generator__select" type="button">
                <img
                  className={select.dim ? 'generator__select-icon generator__select-icon--dim' : 'generator__select-icon'}
                  src={select.icon}
                  alt=""
                  width={24}
                  height={24}
                />
                <span className="generator__select-value">{select.value}</span>
                <img className="generator__select-chevron" src={chevron} alt="" width={16} height={16} />
              </button>
            </div>
          ))}
        </div>

        <div className="generator__cta">
          <button className="btn-lime generator__submit" type="button">
            <img src={sparkle} alt="" width={18} height={18} />
            Generate Thumbnails
          </button>
          <p className="generator__note">Free to try.&nbsp; No credit card required.</p>
        </div>
      </div>
    </section>
  );
}
