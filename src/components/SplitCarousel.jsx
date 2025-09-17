import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { AvatarBadge } from './AvatarBadge.jsx'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js'

const AUTOPLAY_DELAY = 6200

export function SplitCarousel({ items }) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || items.length <= 1) {
      return undefined
    }

    const timer = setInterval(() => {
      setDirection(1)
      setIndex((previous) => (previous + 1) % items.length)
    }, AUTOPLAY_DELAY)

    return () => clearInterval(timer)
  }, [items.length, prefersReducedMotion])

  if (items.length === 0) {
    return null
  }

  const activeItem = items[index]

  const handleSelect = (nextIndex) => {
    setDirection(nextIndex > index ? 1 : -1)
    setIndex(nextIndex)
  }

  return (
    <div className="split-carousel">
      <div className="split-sidebar" role="tablist" aria-label="Choisir une étude de cas">
        {items.map((item, itemIndex) => {
          const isActive = itemIndex === index
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`split-tab ${isActive ? 'is-active' : ''}`}
              onClick={() => handleSelect(itemIndex)}
            >
              <AvatarBadge name={item.name} palette={item.palette} />
              <div className="split-tab-text">
                <span className="split-tab-name">{item.name}</span>
                <span className="split-tab-role">{item.role}</span>
              </div>
              <span className="split-tab-result">{item.result}</span>
            </button>
          )
        })}
      </div>
      <article
        key={activeItem.id}
        className="split-card"
        data-direction={direction > 0 ? 'forward' : 'backward'}
      >
        <header className="split-card-header">
          <span className="split-eyebrow">Cas client orchestré</span>
          <h3>
            {activeItem.company}
            <span className="split-divider" aria-hidden="true">
              ·
            </span>
            <span className="split-result">{activeItem.result}</span>
          </h3>
        </header>
        <p className="split-quote">“{activeItem.quote}”</p>
        <div className="split-metrics">
          {activeItem.metrics.map((metric) => (
            <div key={metric.label} className="split-metric">
              <span className="metric-value">{metric.value}</span>
              <span className="metric-label">{metric.label}</span>
            </div>
          ))}
        </div>
      </article>
    </div>
  )
}

SplitCarousel.propTypes = {
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
