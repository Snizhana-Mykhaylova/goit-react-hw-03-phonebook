import PropTypes from 'prop-types';
import styles from './filter.module.css';

const Filter = ({ value, onChange }) => (
  <label>
    Find contacts by name
    <input
      className={styles.input}
      type="text"
      value={value}
      onChange={onChange}
    />
  </label>
);

export default Filter;
Filter.defaultProps = {
  value: '',
};

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
