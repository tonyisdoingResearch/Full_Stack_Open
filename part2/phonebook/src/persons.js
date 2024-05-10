import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
        .then(response => response.data)
        .catch(error => {
            console.error('Error:', error)
            return []
        })
}


const create = (personObject, setPersons, setNewName, setNewNumber, persons) => {
    return axios.post(baseUrl, personObject)
        .then(response => {
            setPersons(persons.concat(response.data)); // Aggiorna lo stato delle persone con i dati della risposta
            setNewName(''); // Resetta lo stato del nuovo nome
            setNewNumber(''); // Resetta lo stato del nuovo numero
        })
        .catch(error => {
            console.error('Error:', error);
        });
};

const deletePerson = (id, setPersons, setNewName, setNewNumber, persons) => {
    return axios.delete(`http://localhost:3001/persons/${id}`)
        .then(response => {
            console.log('Response:', response);
            setPersons(persons.filter(person => person.id !== id));
        })
        .catch(error => {
            console.error('Error:', error);
        });
};

const updateNumber = (id, newNumber, setPersons, persons) => {
    const updatedPerson = persons.find(p => p.id === id);
    if (!updatedPerson) {
        throw new Error(`No person found with id ${id}`);
    }

    const personObject = { ...updatedPerson, number: newNumber };
    const updatedPersons = persons.map(p => p.id === id ? personObject : p);

    return axios.put(`http://localhost:3001/persons/${id}`, personObject)
        .then(response => {
            setPersons(updatedPersons);
        });
};

export { getAll, create, deletePerson, updateNumber };