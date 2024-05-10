import React, { useState, useEffect } from 'react'; // Import React and the useState and useEffect functions
import { getAll, create, deletePerson, updateNumber } from './persons.js';

// Component for filtering results
const Filter = ({ value, onChange }) => (
  <div>
    {/* Input for filtering */}
    filter shown with <input value={value} onChange={onChange} />
  </div>
);

// Component for the form to add a new person
const PersonForm = ({ onSubmit, name, onNameChange, number, onNumberChange }) => (
  <form onSubmit={onSubmit}>
    <div>
      {/* Input for the name */}
      name: <input value={name} onChange={onNameChange} />
    </div>
    <div>
      {/* Input for the number */}
      number: <input value={number} onChange={onNumberChange} />
    </div>
    <div>
      {/* Button to add a person */}
      <button type="submit">add</button>
    </div>
  </form>
);

// Component to display the list of persons
const Persons = ({ persons, nameStyle, handleDelete }) => (
  persons.map((person, index) => 
    <p style={nameStyle} key={index}>
      {/* Display name and number */}
      {person.name} {person.number},
      {/* Button to delete */}
      <button onClick={() => handleDelete(person.id)}>Delete</button>
    </p>
  )
);
// Main component of the application
const App = () => {
  // States used in the application
  const [persons, setPersons] = useState([]); // State for the list of persons
  const [newName, setNewName] = useState(''); // State for the new name
  const [newNumber, setNewNumber] = useState(''); // State for the new number
  const [search, setSearch] = useState(''); // State for the search string

  // Loading initial phonebook data
  useEffect(() => {
    getAll().then(initialPersons => {
      // Update state with initial data
      setPersons(initialPersons);
    })
  }, []);

  // Handling name input change
  const handleNameChange = (event) => {
    // Update state with input value
    setNewName(event.target.value);
  };

  // Handling number input change
  const handleNumberChange = (event) => {
    // Update state with input value
    setNewNumber(event.target.value);
  };

  // Handling search string change
  const handleSearchChange = (event) => {
    // Update state with input value
    setSearch(event.target.value);
  };

  // Adding a new person
  const addName = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(p => p.name === newName);
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to the phonebook. Replace the old number with a new one?`)) {
        const updatedPersons = persons.map(p => p.name === newName ? { ...p, number: newNumber } : p);
        updateNumber(existingPerson.id, newNumber, setPersons, updatedPersons);
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      create(personObject, setPersons, setNewName, setNewNumber, persons); // Add the new person to the state
    }
  };
  
  // Filtering persons based on search string
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()));

  // Style for person names
  const nameStyle = {
    lineHeight: '0.3' // Modify style for person names
  };

  // Handling person deletion
  const handleDelete = (id) => {
    const person = persons.find(p => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      deletePerson(id, setPersons, setNewName, setNewNumber, persons)
        .then(() => {
          const updatedPersons = persons.filter(person => person.id !== id);
          setPersons(updatedPersons);
        });
    }
  };

  // Rendering the user interface
  return (
    <div>
      <h2>Phonebook</h2>
      {/* Filter component */}
      <Filter value={search} onChange={handleSearchChange} />
      <h3>Add a new</h3>
      {/* PersonForm component */}
      <PersonForm
        onSubmit={addName}
        name={newName}
        onNameChange={handleNameChange}
        number={newNumber}
        onNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      {/* Persons component */}
      <Persons persons={filteredPersons} nameStyle={nameStyle} handleDelete={handleDelete} />
    </div>
  );
};

export default App; // Export the main component of the application
