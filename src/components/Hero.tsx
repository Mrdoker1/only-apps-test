import script from '../assets/img/create-without-limits.svg';
import './Hero.css';

export function Hero() {
  return (
    <div className="hero">
      <span className="eyebrow">
        <span className="eyebrow__dot" aria-hidden />
        Create. Test. Get noticed.
      </span>
      <h1 className="hero__heading section-title">
        Powered by AI
        <img className="hero__script" src={script} alt="Create without limits" />
      </h1>
    </div>
  );
}
