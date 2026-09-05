import logo from '../assets/icons/logo.svg';
import './Loader.css';

type LoaderProps = {
  progress: number;
  hiding: boolean;
};

export function Loader({ progress, hiding }: LoaderProps) {
  return (
    <div className={`loader${hiding ? ' loader--hiding' : ''}`} role="status" aria-live="polite">
      <div className="loader__brand">
        <span className="loader__logo">
          <img src={logo} alt="" width={22} height={22} />
        </span>
        <span className="loader__name">Robinzone</span>
      </div>

      <div className="loader__track">
        <span className="loader__bar" style={{ transform: `scaleX(${progress})` }} />
      </div>

      <span className="sr-only">Loading the page</span>
    </div>
  );
}
