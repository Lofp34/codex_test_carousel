import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { AvatarBadge } from './AvatarBadge.jsx'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js'

const AUTOPLAY_DELAY = 7000

export function AuroraCarousel({ items }) {
  const [index, setIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || isPaused || items.length <= 1) {
      return undefined
    }

    const timer = setInterval(() => {
      setIndex((previous) => (previous + 1) % items.length)
    }, AUTOPLAY_DELAY)

    return () => clearInterval(timer)
  }, [items.length, isPaused, prefersReducedMotion])

  useEffect(() => {
    if (prefersReducedMotion || items.length <= 1) {
      setProgress(1)
      return () => {}
    }

    setProgress(0)
    let animationFrameId
    let startTimestamp

    const updateProgress = (timestamp) => {
      if (!startTimestamp) {
        startTimestamp = timestamp
      }

      const elapsed = timestamp - startTimestamp
      const nextProgress = Math.min(elapsed / AUTOPLAY_DELAY, 1)
      setProgress(nextProgress)

      if (nextProgress < 1) {
        animationFrameId = requestAnimationFrame(updateProgress)
      }
    }

    animationFrameId = requestAnimationFrame(updateProgress)

    return () => cancelAnimationFrame(animationFrameId)
  }, [index, prefersReducedMotion, items.length])

  if (items.length === 0) {
    return null
  }

  const activeItem = items[index]

  const goTo = (newIndex) => {
    if (items.length === 0) {
      return
    }

    const normalizedIndex = (newIndex + items.length) % items.length
    setIndex(normalizedIndex)
  }

  return (
    <div
      className="aurora-carousel"
      onPointerEnter={() => setIsPaused(true)}
      onPointerLeave={() => setIsPaused(false)}
    >
      <div className="aurora-surface" aria-hidden="true" />
      <article className="aurora-card">
        <header className="aurora-header">
          <span className="aurora-pill">Glassmorphism immersif</span>
          <p className="aurora-quote">“{activeItem.quote}”</p>
        </header>
        <footer className="aurora-footer">
          <div className="aurora-person">
            <AvatarBadge name={activeItem.name} palette={activeItem.palette} />
            <div>
              <p className="aurora-name">{activeItem.name}</p>
              <p className="aurora-role">
                {activeItem.role} · {activeItem.company}
              </p>
            </div>
            <span className="aurora-result">{activeItem.result}</span>
          </div>
          <ul className="aurora-highlights">
            {activeItem.highlights.map((highlight) => (
              <li key={highlight} className="aurora-highlight">
                {highlight}
              </li>
            ))}
          </ul>
        </footer>
      </article>
      <div className="aurora-controls">
        <div className="aurora-progress">
          <span style={{ transform: `scaleX(${progress})` }} />
        </div>
        <div className="aurora-buttons">
          <button
            type="button"
            className="carousel-button"
            onClick={() => goTo(index - 1)}
            aria-label="Slide précédente"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            className="carousel-button"
            onClick={() => goTo(index + 1)}
            aria-label="Slide suivante"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
        <div className="aurora-dots" role="tablist" aria-label="Sélection du témoignage">
          {items.map((item, itemIndex) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={index === itemIndex}
              className={`carousel-dot ${index === itemIndex ? 'is-active' : ''}`}
              onClick={() => goTo(itemIndex)}
            >
              <span className="sr-only">{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

AuroraCarousel.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      quote: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      company: PropTypes.string.isRequired,
      result: PropTypes.string.isRequired,
      highlights: PropTypes.arrayOf(PropTypes.string).isRequired,
      palette: PropTypes.arrayOf(PropTypes.string),
    }),
  ).isRequired,
}
