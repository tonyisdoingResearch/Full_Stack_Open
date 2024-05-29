import React, { useState, useEffect } from 'react';
import './App.css';
import AxiosThings from './AxiosThings';

const Filter = ({ searchTerm, setSearchTerm }) => (
  <p>
    filter shown with <input value={searchTerm} onChange={event => setSearchTerm(event.target.value)} />
  </p>
);

const Notification = ({ notification }) => {
  if (!notification) {
    return null;
  }

  const { message, type } = notification;
  const notificationClass = type === 'error' ? 'error-notification' : 'notification';

  return (
    <div className={notificationClass}>
      {message}
    </div>
  );
};

const PersonForm = ({ addName, newName, setNewName, newNumber, setNewNumber }) => (
  <form onSubmit={addName}>
    <div>
      name: <input value={newName} onChange={event => setNewName(event.target.value)} />
    </div>
    <div>
      number: <input value={newNumber} onChange={event => setNewNumber(event.target.value)} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

const Person = ({ person, deletePerson }) => (
  <p>
    {person.name} {person.number}
    <button onClick={() => deletePerson(person.id)}>delete</button>
  </p>
);

const Persons = ({ persons, deletePerson }) => (
  persons.map(person =>
    <Person key={person.id} person={person} deletePerson={deletePerson} />
  )
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = '') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  useEffect(() => {
    AxiosThings.getPersons()
      .then(persons => setPersons(persons))
      .catch(error => showNotification('Error fetching persons', 'error'));
  }, []);

  const addName = (event) => {
    event.preventDefault();

    const existingPerson = persons.find(person => person.name === newName);

    if (existingPerson) {
      const confirmUpdate = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);

      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        AxiosThings.updatePerson(existingPerson, updatedPerson)
          .then(updatedPersonData => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : updatedPersonData));
            setNewName('');
            setNewNumber('');
            showNotification(`Updated ${newName}`);
          })
          .catch(error => showNotification(`Error updating ${newName}`, 'error'));
      }
    } else {
      const newPerson = { name: newName, number: newNumber };

      AxiosThings.createPerson(newPerson)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson));
          setNewName('');
          setNewNumber('');
          showNotification(`Added ${newName}`);
        })
        .catch(error => showNotification(`Error adding ${newName}`, 'error'));
    }
  };

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id);

    if (window.confirm(`Delete ${person.name}?`)) {
      AxiosThings.deletePerson(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id));
          showNotification(`Deleted ${person.name}`);
        })
        .catch(error => showNotification(`Information of ${person.name} has already been removed from server`, 'error'));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <h3>Add a new</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />

      <h3>Numbers</h3>
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
