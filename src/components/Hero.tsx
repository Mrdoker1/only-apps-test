import scriptMarkup from '../assets/img/create-without-limits.svg?raw';
import './Hero.css';

const TITLE = 'Powered by AI';

/** Per-character stagger for the headline, in milliseconds. */
const CHAR_STEP = 30;

/**
 * The script lettering is inlined so each stroke can be wiped in separately,
 * in the order a hand would actually write them.
 */
export function Hero() {
  return (
    <div className="hero">
      <span className="eyebrow">
        <span className="eyebrow__dot" aria-hidden />
        Create. Test. Get noticed.
      </span>
      <h1 className="hero__heading section-title">
        <span className="sr-only">Powered by AI — create without limits</span>
        <span className="hero__title" aria-hidden>
          {[...TITLE].map((char, index) => (
            <span
              className="hero__char"
              key={`${char}-${index}`}
              style={{ animationDelay: `${index * CHAR_STEP}ms` }}
            >
              {char === ' ' ? ' ' : char}
            </span>
          ))}
        </span>
        <span className="hero__script" aria-hidden dangerouslySetInnerHTML={{ __html: scriptMarkup }} />
      </h1>
    </div>
  );
}
