import { useRef, useState } from 'react';
import { Popover } from './Popover';
import logo from '../assets/icons/logo.svg';
import chevron from '../assets/icons/chevron-12.svg';
import './Header.css';

type NavItem = {
  id: string;
  label: string;
  badge?: string;
  menu?: string[];
};

const NAV_ITEMS: NavItem[] = [
  { id: 'image', label: 'Image', menu: ['Create image', 'Upscale', 'Remove background', 'Style transfer'] },
  { id: 'video', label: 'Video', menu: ['Create video', 'Talking avatar', 'Lip sync', 'Video upscale'] },
  { id: 'models', label: 'AI Models' },
  { id: 'assist', label: 'Assist', badge: 'NEW' },
  { id: 'studio', label: 'Studio' },
  { id: 'pricing', label: 'Pricing' },
];

function NavMenu({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button
        className="header__nav-link"
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((previous) => !previous)}
      >
        {item.label}
        <img className="header__chevron" src={chevron} alt="" width={12} height={12} />
      </button>
      <Popover anchor={triggerRef.current} open={open} onClose={() => setOpen(false)} label={item.label}>
        <div className="nav-menu">
          {item.menu?.map((entry) => (
            <button className="nav-menu__item" key={entry} type="button" onClick={() => setOpen(false)}>
              {entry}
            </button>
          ))}
        </div>
      </Popover>
    </>
  );
}

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
          <div className="header__nav-item" key={item.id}>
            {index > 0 && <span className="header__nav-divider" aria-hidden />}
            {item.menu ? (
              <NavMenu item={item} />
            ) : (
              <a className="header__nav-link" href={`#${item.id}`}>
                {item.label}
                {item.badge && <span className="header__nav-badge">{item.badge}</span>}
              </a>
            )}
          </div>
        ))}
      </nav>

      <button className="btn-lime header__sign-in" type="button">
        Sign In
      </button>
    </header>
  );
}
