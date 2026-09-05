import { useCallback, useEffect, useRef, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { GeneratorCard } from './components/GeneratorCard';
import { PreviewCard } from './components/PreviewCard';
import { TrustedBy } from './components/TrustedBy';
import { Showcase } from './components/Showcase';
import { Loader } from './components/Loader';
import { useAssetsReady } from './hooks/useAssetsReady';
import { handleParallax } from './hooks/useParallax';
import './App.css';

/**
 * Every bitmap in the artwork folder, preloaded before the page is shown —
 * they are the heavy assets and popping in half-drawn looks broken.
 */
const ARTWORK = Object.values(
  import.meta.glob('./assets/img/*.{png,jpg,jpeg,webp}', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
) as string[];

/** How long the loading screen takes to fade away. */
const FADE_MS = 380;

/** How long the mocked generation runs before results come back. */
const GENERATION_MS = 1600;

export default function App() {
  const { ready, progress } = useAssetsReady(ARTWORK);
  const [phase, setPhase] = useState<'loading' | 'fading' | 'done'>('loading');
  const [variants, setVariants] = useState(4);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState({ count: 4, runId: 0 });
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  // The page mounts as the loader fades, so its entrance animations are not
  // spent behind the overlay.
  useEffect(() => {
    if (!ready) return;
    setPhase('fading');
    const fade = window.setTimeout(() => setPhase('done'), FADE_MS);
    return () => window.clearTimeout(fade);
  }, [ready]);

  const generate = useCallback(() => {
    setIsGenerating(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setIsGenerating(false);
      setResult((previous) => ({ count: variants, runId: previous.runId + 1 }));
    }, GENERATION_MS);
  }, [variants]);

  if (phase === 'loading') {
    return <Loader progress={progress} hiding={false} />;
  }

  return (
    <>
      {phase === 'fading' && <Loader progress={1} hiding />}
      <div className="page" id="top">
        <span className="page__noise" aria-hidden />
        <div className="page__header">
          <Header />
        </div>

        <main className="page__main" onPointerMove={handleParallax}>
          <span className="page__glow page__glow--left" aria-hidden />
          <span className="page__glow page__glow--right" aria-hidden />
          <span className="page__halo" aria-hidden />

          <Hero />

          <div className="page__workspace">
            <GeneratorCard
              variants={variants}
              onVariantsChange={setVariants}
              isGenerating={isGenerating}
              onGenerate={generate}
            />
            <PreviewCard count={result.count} runId={result.runId} isGenerating={isGenerating} />
          </div>

          <TrustedBy />
        </main>

        <Showcase />
      </div>
    </>
  );
}
