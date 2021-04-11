import PropTypes from 'prop-types';
import styles from './contacts.module.css';

const phoneFormatter = require('phone-formatter');

const Contacts = ({ contacts, onDeleteContact }) => {
  return (
    <ul>
      {contacts.map(contact => (
        <li className={styles.contactItem} key={contact.id}>
          {contact.name}:
          <span className={styles.number}>
            {phoneFormatter.format(contact.number, 'NNN-NN-NN')}
          </span>
          <button
            className={styles.button}
            onClick={() => onDeleteContact(contact.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Contacts;

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  ).isRequired,
  number: PropTypes.string,
  onDeleteContact: PropTypes.func.isRequired,
};
