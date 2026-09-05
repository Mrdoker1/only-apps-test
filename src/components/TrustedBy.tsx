import type { CSSProperties } from 'react';
import { memo } from 'react';
import { useReveal } from '../hooks/useReveal';
import youtube from '../assets/img/logo-youtube.svg';
import tiktok from '../assets/img/logo-tiktok.svg';
import instagram from '../assets/img/logo-instagram.svg';
import facebook from '../assets/img/logo-facebook.svg';
import x from '../assets/img/logo-x.svg';
import linkedin from '../assets/img/logo-linkedin.svg';
import './TrustedBy.css';

/* `desktopOnly` logos are dropped on the mobile layout, matching the design. */
const LOGOS = [
  { src: youtube, name: 'YouTube', width: 110, desktopOnly: true },
  { src: tiktok, name: 'TikTok', width: 119 },
  { src: instagram, name: 'Instagram', width: 116 },
  { src: facebook, name: 'Facebook', width: 124 },
  { src: x, name: 'X', width: 40, desktopOnly: true },
  { src: linkedin, name: 'LinkedIn', width: 111, desktopOnly: true },
];

export const TrustedBy = memo(function TrustedBy() {
  const reveal = useReveal<HTMLElement>();

  return (
    <section className={`trusted ${reveal.className}`} ref={reveal.ref}>
      <h2 className="trusted__label">Trusted by creators</h2>
      <div className="trusted__logos">
        {LOGOS.map((logo) => (
          <img
            className={logo.desktopOnly ? 'trusted__logo trusted__logo--desktop' : 'trusted__logo'}
            key={logo.name}
            src={logo.src}
            alt={logo.name}
            style={{ '--logo-width': logo.width } as CSSProperties}
          />
        ))}
      </div>
    </section>
  );
});
