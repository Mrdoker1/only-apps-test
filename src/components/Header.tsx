import logo from '../assets/icons/logo.svg';
import chevron from '../assets/icons/chevron-12.svg';
import './Header.css';

type NavItem = {
  label: string;
  hasChevron?: boolean;
  badge?: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: 'Image', hasChevron: true },
  { label: 'Video', hasChevron: true },
  { label: 'AI Models' },
  { label: 'Assist', badge: 'NEW' },
  { label: 'Studio' },
  { label: 'Pricing' },
];

export function Header() {
  return (
    <header className="header">
      <a className="header__brand" href="#top">
        <span className="header__logo">
          <img src={logo} alt="" width={22} height={22} />
        </span>
        <span className="header__brand-name">Robinzone</span>
      </a>

      <nav className="header__nav" aria-label="Main">
        {NAV_ITEMS.map((item, index) => (
          <div className="header__nav-item" key={item.label}>
            {index > 0 && <span className="header__nav-divider" aria-hidden />}
            <a className="header__nav-link" href={`#${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
              {item.label}
              {item.hasChevron && <img className="header__chevron" src={chevron} alt="" width={12} height={12} />}
              {item.badge && <span className="header__nav-badge">{item.badge}</span>}
            </a>
          </div>
        ))}
      </nav>

      <button className="btn-lime header__sign-in" type="button">
        Sign In
      </button>
    </header>
  );
}
