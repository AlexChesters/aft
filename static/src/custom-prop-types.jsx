import PropTypes from 'prop-types'

export default {
  checklist: PropTypes.shape({
    aircraft: PropTypes.string.isRequired,
    sections: PropTypes.arrayOf(PropTypes.shape({
      entries: PropTypes.arrayOf(PropTypes.string).isRequired
    })).isRequired,
    identifier: PropTypes.string.isRequired,
    notes: PropTypes.string.isRequired
  })
}
