import React, { useState, useEffect } from 'react'; // Importa React e le funzioni useState e useEffect
import { getAll, create, deletePerson, updateNumber } from './persons.js';

// Componente per filtrare i risultati
const Filter = ({ value, onChange }) => (
  <div>
    filter shown with <input value={value} onChange={onChange} /> {/* Input per il filtraggio */}
  </div>
);

// Componente per il modulo di inserimento di una nuova persona
const PersonForm = ({ onSubmit, name, onNameChange, number, onNumberChange }) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input value={name} onChange={onNameChange} /> {/* Input per il nome */}
    </div>
    <div>
      number: <input value={number} onChange={onNumberChange} /> {/* Input per il numero */}
    </div>
    <div>
      <button type="submit">add</button> {/* Pulsante per aggiungere una persona */}
    </div>
  </form>
);

// Componente per visualizzare l'elenco delle persone
const Persons = ({ persons, nameStyle, handleDelete }) => (
  persons.map((person, index) => 
    <p style={nameStyle} key={index}>
      {person.name} {person.number},
      <button onClick={() => handleDelete(person.id)}>Delete</button>
    </p>
  )
);
// Componente principale dell'applicazione
const App = () => {
  // Definizione degli stati utilizzati nell'applicazione
  const [persons, setPersons] = useState([]); // Stato per l'elenco delle persone
  const [newName, setNewName] = useState(''); // Stato per il nuovo nome
  const [newNumber, setNewNumber] = useState(''); // Stato per il nuovo numero
  const [search, setSearch] = useState(''); // Stato per la stringa di ricerca

  // Caricamento dei dati iniziali della rubrica
  useEffect(() => {
    getAll().then(initialPersons => {
      setPersons(initialPersons); // Aggiorna lo stato delle persone con i dati iniziali
    })
  }, []); // La dipendenza vuota indica che questa operazione viene eseguita solo una volta, all'avvio dell'applicazione



  // Gestione del cambiamento del nome nell'input
  const handleNameChange = (event) => {
    setNewName(event.target.value); // Aggiorna lo stato del nuovo nome con il valore dell'input
  };

  // Gestione del cambiamento del numero nell'input
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value); // Aggiorna lo stato del nuovo numero con il valore dell'input
  };

  // Gestione del cambiamento della stringa di ricerca
  const handleSearchChange = (event) => {
    setSearch(event.target.value); // Aggiorna lo stato della stringa di ricerca con il valore dell'input
  };



  
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
  
  // Filtra le persone in base alla stringa di ricerca
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()));

  // Stile per il nome delle persone
  const nameStyle = {
    lineHeight: '0.3' // Modifica lo stile per il nome delle persone
  };

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
  


  // Renderizza l'interfaccia utente
return (
  <div>
    <h2>Phonebook</h2>
    <Filter value={search} onChange={handleSearchChange} />
    <h3>Add a new</h3>
    <PersonForm
      onSubmit={addName}
      name={newName}
      onNameChange={handleNameChange}
      number={newNumber}
      onNumberChange={handleNumberChange}
    />
    <h3>Numbers</h3>
    <Persons persons={filteredPersons} nameStyle={nameStyle} handleDelete={handleDelete} />
  </div>
);
};

export default App; // Esporta il componente principale dell'applicazione
