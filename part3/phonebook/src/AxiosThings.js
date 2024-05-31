import axios from 'axios';

const baseUrl = 'http://localhost:3000/api/persons';

const getPersons = () => {
    return axios.get(baseUrl)
        .then(response => response.data)
        .catch(error => {
            console.error(error);
            throw error;
        });
};

const updatePerson = (existingPerson, updatedPerson) => {
    return axios
        .put(`${baseUrl}/${existingPerson.id}`, updatedPerson)
        .then(response => response.data)
        .catch(error => {
            console.error(error);
            throw error;
        });
};

const createPerson = (newPerson) => {
    return axios
        .post(baseUrl, newPerson)
        .then(response => response.data)
        .catch(error => {
            console.error(error);
            throw error;
        });
};

const deletePerson = (id) => {
    return axios
        .delete(`${baseUrl}/${id}`)
        .then(response => response.data)
        .catch(error => {
            console.error(error);
            throw error;
        });
};

export default {
    getPersons,
    updatePerson,
    createPerson,
    deletePerson
};
