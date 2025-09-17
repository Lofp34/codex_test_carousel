import './App.css'
import { AuroraCarousel } from './components/AuroraCarousel.jsx'
import { CoverflowCarousel } from './components/CoverflowCarousel.jsx'
import { SplitCarousel } from './components/SplitCarousel.jsx'
import { testimonials } from './data/testimonials.js'

const auroraSlides = testimonials.slice(0, 3)
const coverflowSlides = testimonials
const splitSlides = testimonials.slice(1)

function App() {
  return (
    <div className="page">
      <header className="hero">
        <div className="hero-gradient" aria-hidden="true" />
        <p className="hero-eyebrow">Moodboard UI · Témoignages clients</p>
        <h1>Trois carrousels contemporains à forte empreinte visuelle</h1>
        <p className="hero-lead">
          Une sélection premium de sliders React prêts à intégrer : chacun met en valeur
          la preuve sociale avec une mise en scène différente — aurora glass, coverflow 3D
          et narration split.
        </p>
        <ul className="hero-highlights">
          <li>
            <span aria-hidden="true">✨</span>
            Effets de profondeur et glow maîtrisés pour un rendu très haut de gamme.
          </li>
          <li>
            <span aria-hidden="true">🎯</span>
            Commandes accessibles (clavier, SR) et pauses automatiques au survol.
          </li>
          <li>
            <span aria-hidden="true">🧩</span>
            Structure modulable : remplacez simplement le JSON de témoignages.
          </li>
        </ul>
      </header>

      <main className="sections">
        <section className="section-block">
          <div className="section-heading">
            <span className="section-index">01</span>
            <h2>Aurora glass carousel</h2>
            <p>
              Une carte en verre poli suspendue sur un fond aux reflets aurora. Les pilles de
              mise en avant soulignent les bénéfices du témoignage.
            </p>
            <div className="section-tags">
              <span className="tag">Glassmorphism</span>
              <span className="tag">Autoplay progressif</span>
              <span className="tag">Pastilles métriques</span>
            </div>
          </div>
          <AuroraCarousel items={auroraSlides} />
        </section>

        <section className="section-block section-inverse">
          <div className="section-heading">
            <span className="section-index">02</span>
            <h2>Coverflow néon</h2>
            <p>
              Une perspective façon galerie immersive : les cartes latérales sont inclinées
              pour guider le regard vers la slide active.
            </p>
            <div className="section-tags">
              <span className="tag">Perspective 3D</span>
              <span className="tag">Cartes empilées</span>
              <span className="tag">Palette néon</span>
            </div>
          </div>
          <CoverflowCarousel items={coverflowSlides} />
        </section>

        <section className="section-block">
          <div className="section-heading">
            <span className="section-index">03</span>
            <h2>Layout split éditorial</h2>
            <p>
              Un panneau latéral liste les clients tandis que le contenu principal déroule la
              narration chiffrée avec un slide-in latéral.
            </p>
            <div className="section-tags">
              <span className="tag">Navigation secondaire</span>
              <span className="tag">Animations latérales</span>
              <span className="tag">Focus métriques</span>
            </div>
          </div>
          <SplitCarousel items={splitSlides} />
        </section>
      </main>

      <footer className="page-footer">
        <p>
          Ces variations partagent une même base de données et un design system commun.
          Gardez la structure et injectez vos propres témoignages pour un rendu impactant.
        </p>
      </footer>
    </div>
  )
}

export default App
