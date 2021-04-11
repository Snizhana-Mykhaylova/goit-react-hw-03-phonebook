import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Form from './Components/Form';
import Contacts from './Components/Contacts';
import Filter from './Components/Filter';

import './common.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsContacts = JSON.parse(contacts);
    if (parsContacts) {
      this.setState({ contacts: parsContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  formSubmitHandler = (contactName, ContactNumber) => {
    const contact = {
      name: contactName,
      id: uuidv4(),
      number: ContactNumber,
    };

    const normalizedName = contactName.toLowerCase();
    if (
      this.state.contacts.find(
        contact => contact.name.toLowerCase() === normalizedName,
      )
    ) {
      alert(`${contactName} is already in contacts`);
      return;
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  filterChange = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  onDeleteContact = id => {
    const refreshContacts = this.state.contacts.filter(
      contact => contact.id !== id,
    );
    this.setState({ contacts: refreshContacts });
  };

  render() {
    const normalizedFilter = this.state.filter.toLocaleLowerCase();
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter),
    );

    return (
      <div className="containerApp">
        <h1>Phonebook</h1>
        <Form onSubmit={this.formSubmitHandler} />
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.filterChange} />
        <Contacts
          contacts={filteredContacts}
          onDeleteContact={this.onDeleteContact}
        />
      </div>
    );
  }
}

export default App;
