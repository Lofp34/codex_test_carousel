import { useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { AvatarBadge } from './AvatarBadge.jsx'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js'

const AUTOPLAY_DELAY = 5500

const normaliseOffset = (index, active, total) => {
  const half = Math.floor(total / 2)
  let offset = index - active

  if (offset > half) {
    offset -= total
  } else if (offset < -half) {
    offset += total
  }

  return offset
}

export function CoverflowCarousel({ items }) {
  const [active, setActive] = useState(Math.floor(items.length / 2) || 0)
  const [isPaused, setIsPaused] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  const goTo = useCallback(
    (nextIndex) => {
      if (items.length === 0) {
        return
      }

      const normalizedIndex = (nextIndex + items.length) % items.length
      setActive(normalizedIndex)
    },
    [items.length],
  )

  useEffect(() => {
    if (prefersReducedMotion || isPaused || items.length <= 1) {
      return undefined
    }

    const timer = setInterval(() => {
      setActive((previous) => (previous + 1) % items.length)
    }, AUTOPLAY_DELAY)

    return () => clearInterval(timer)
  }, [items.length, isPaused, prefersReducedMotion])

  const cards = useMemo(
    () =>
      items.map((item, index) => {
        const offset = normaliseOffset(index, active, items.length)
        const distance = Math.abs(offset)

        return {
          item,
          index,
          offset,
          distance,
          isActive: index === active,
        }
      }),
    [items, active],
  )

  if (items.length === 0) {
    return null
  }

  return (
    <div className="coverflow-carousel">
      <div
        className="coverflow-stage"
        onPointerEnter={() => setIsPaused(true)}
        onPointerLeave={() => setIsPaused(false)}
      >
        {cards.map(({ item, offset, distance, isActive }) => (
          <article
            key={item.id}
            className={`coverflow-card ${isActive ? 'is-active' : ''}`}
            style={{
              '--offset': offset,
              '--abs-offset': distance,
              '--accent': item.palette?.[0] ?? '#6366f1',
            }}
            aria-hidden={!isActive}
          >
            <p className="coverflow-quote">“{item.quote}”</p>
            <footer className="coverflow-footer">
              <div className="coverflow-person">
                <AvatarBadge name={item.name} palette={item.palette} />
                <div>
                  <p className="coverflow-name">{item.name}</p>
                  <p className="coverflow-role">
                    {item.role} · {item.company}
                  </p>
                </div>
              </div>
              <div className="coverflow-metrics">
                <div className="coverflow-metric">
                  <span className="metric-label">Résultat clé</span>
                  <span className="metric-value">{item.result}</span>
                </div>
                {item.metrics.slice(0, 2).map((metric) => (
                  <div key={metric.label} className="coverflow-metric">
                    <span className="metric-label">{metric.label}</span>
                    <span className="metric-value">{metric.value}</span>
                  </div>
                ))}
              </div>
            </footer>
          </article>
        ))}
      </div>
      <div className="coverflow-nav">
        <button
          type="button"
          className="carousel-button"
          onClick={() => goTo(active - 1)}
          aria-label="Slide précédente"
        >
          <span aria-hidden="true">←</span>
        </button>
        <div className="coverflow-dots" role="tablist" aria-label="Choisir un témoignage">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active === index}
              className={`carousel-dot ${active === index ? 'is-active' : ''}`}
              onClick={() => goTo(index)}
            >
              <span className="sr-only">{item.name}</span>
            </button>
          ))}
        </div>
        <button
          type="button"
          className="carousel-button"
          onClick={() => goTo(active + 1)}
          aria-label="Slide suivante"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  )
}

CoverflowCarousel.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      quote: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      company: PropTypes.string.isRequired,
      result: PropTypes.string.isRequired,
      metrics: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired,
        }),
      ).isRequired,
      palette: PropTypes.arrayOf(PropTypes.string),
    }),
  ).isRequired,
}
