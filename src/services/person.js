import axios from 'axios'

const BASE_URL = 'http://localhost:3000/persons'

export function getPersons() {
  return axios.get(BASE_URL).then((response) => response.data)
}

export function createPerson(personObject) {
  return axios.post(BASE_URL, personObject).then((response) => response.data)
}

export function deletePersonById(id) {
  return axios.delete(`${BASE_URL}/${id}`).then((response) => response.data)
}
