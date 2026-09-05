import { memo } from 'react';
import { useReveal } from '../hooks/useReveal';
import { handlePointerGlow } from '../hooks/usePointerGlow';
import badgeVideo from '../assets/icons/badge-video.svg';
import badgeCore from '../assets/icons/badge-core.svg';
import badgeImage from '../assets/icons/badge-image.svg';
import arrowCyan from '../assets/icons/arrow-cyan.svg';
import arrowLime from '../assets/icons/arrow-lime.svg';
import showcaseVideo from '../assets/img/showcase-video.png';
import showcaseStudio from '../assets/img/showcase-studio.png';
import showcaseImage from '../assets/img/showcase-image.png';
import './Showcase.css';

type Card = {
  id: string;
  image: string;
  badge: string;
  badgeIcon: string;
  arrowIcon: string;
  accent: 'cyan' | 'lime';
  title: string;
  description: string;
};

const CARDS: Card[] = [
  {
    id: 'video',
    image: showcaseVideo,
    badge: 'Video',
    badgeIcon: badgeVideo,
    arrowIcon: arrowCyan,
    accent: 'cyan',
    title: 'Create Video',
    description: 'Cinematic shots, talking avatars, social-ready clips.',
  },
  {
    id: 'studio',
    image: showcaseStudio,
    badge: 'Core',
    badgeIcon: badgeCore,
    arrowIcon: arrowLime,
    accent: 'lime',
    title: 'Creation Studio',
    description: 'One composer. Every model. Image, video, audio — side by side.',
  },
  {
    id: 'image',
    image: showcaseImage,
    badge: 'Image',
    badgeIcon: badgeImage,
    arrowIcon: arrowCyan,
    accent: 'cyan',
    title: 'Create Image',
    description: 'Editorial portraits, product shots, brand visuals.',
  },
];

export const Showcase = memo(function Showcase() {
  const reveal = useReveal<HTMLElement>();

  return (
    <section className={`showcase ${reveal.className}`} ref={reveal.ref}>
      <header className="showcase__header">
        <span className="eyebrow">
          <span className="eyebrow__dot" aria-hidden />
          Featured · Showreel
        </span>
        <h2 className="showcase__heading section-title">
          <span>Viral Videos.Perfect Images.</span>
          <span className="gradient-lime">Instantly</span>
        </h2>
      </header>

      <div className="showcase__cards">
        {CARDS.map((card, index) => (
          <a
            className="showcase__card glow-card"
            key={card.id}
            href={`#${card.id}`}
            style={{ transitionDelay: `${index * 40}ms` }}
            onPointerMove={handlePointerGlow}
          >
            <img className="showcase__card-image" src={card.image} alt="" />
            <span className="showcase__card-scrim" aria-hidden />

            <span className={`showcase__badge showcase__badge--${card.accent}`}>
              <img src={card.badgeIcon} alt="" width={12} height={12} />
              {card.badge}
            </span>

            <span className="showcase__card-body">
              <span className="showcase__card-title">{card.title}</span>
              <span className="showcase__card-text">{card.description}</span>
              <span className={`showcase__explore showcase__explore--${card.accent}`}>
                Explore
                <img src={card.arrowIcon} alt="" width={12} height={12} />
              </span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
});
