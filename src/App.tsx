import { useCallback, useEffect, useRef, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { GeneratorCard } from './components/GeneratorCard';
import { PreviewCard } from './components/PreviewCard';
import { TrustedBy } from './components/TrustedBy';
import { Showcase } from './components/Showcase';
import './App.css';

/** How long the mocked generation runs before results come back. */
const GENERATION_MS = 1600;

export default function App() {
  const [variants, setVariants] = useState(4);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState({ count: 4, runId: 0 });
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const generate = useCallback(() => {
    setIsGenerating(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setIsGenerating(false);
      setResult((previous) => ({ count: variants, runId: previous.runId + 1 }));
    }, GENERATION_MS);
  }, [variants]);

  return (
    <div className="page" id="top">
      <div className="page__header">
        <Header />
      </div>

      <main className="page__main">
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
  );
}
