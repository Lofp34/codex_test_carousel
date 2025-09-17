import PropTypes from 'prop-types'

const defaultPalette = ['#6366f1', '#a855f7']

const getInitials = (name) =>
  name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

export function AvatarBadge({ name, palette = defaultPalette }) {
  const [firstColor, secondColor] = palette
  const initials = getInitials(name)

  return (
    <span
      className="avatar-badge"
      aria-hidden="true"
      style={{
        backgroundImage: `linear-gradient(135deg, ${firstColor}, ${secondColor})`,
      }}
    >
      {initials}
    </span>
  )
}

AvatarBadge.propTypes = {
  name: PropTypes.string.isRequired,
  palette: PropTypes.arrayOf(PropTypes.string),
}
