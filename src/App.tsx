import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { GeneratorCard } from './components/GeneratorCard';
import { PreviewCard } from './components/PreviewCard';
import { TrustedBy } from './components/TrustedBy';
import { Showcase } from './components/Showcase';
import './App.css';

export default function App() {
  return (
    <div className="page" id="top">
      <Header />

      <main className="page__main">
        <span className="page__glow page__glow--left" aria-hidden />
        <span className="page__glow page__glow--right" aria-hidden />
        <span className="page__halo" aria-hidden />

        <Hero />

        <div className="page__workspace">
          <GeneratorCard />
          <PreviewCard />
        </div>

        <TrustedBy />
      </main>

      <Showcase />
    </div>
  );
}
