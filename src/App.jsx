import { useEffect, useState } from 'react'
import { Filter } from './components/Filter.jsx'
import { PersonForm } from './components/PersonForm.jsx'
import { PersonList } from './components/PersonList.jsx'
import {
  createPerson,
  deletePersonById,
  getPersons,
} from './services/person.js'

function App() {
  let [persons, setPersons] = useState([])
  let [filter, setFilter] = useState('')

  useEffect(() => {
    getPersons().then(setPersons)
  }, [])

  let personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()),
  )

  let addPerson = ({ name, number }) => {
    let personWithExistingName = persons.find((person) => person.name === name)
    if (personWithExistingName) {
      window.alert(`${name} is already added to phonebook`)
      return { status: 'error' }
    }

    let personObject = {
      name,
      number,
    }
    createPerson(personObject).then((newPerson) => {
      setPersons((persons) => persons.concat(newPerson))
    })

    return { status: 'success' }
  }

  let deletePerson = (id) => {
    let personToDelete = persons.find((person) => person.id === id)

    let shouldDelete = window.confirm(`Delete ${personToDelete.name}?`)
    if (!shouldDelete) {
      return
    }

    deletePersonById(id).then(() => {
      setPersons((persons) => persons.filter((person) => person.id !== id))
    })
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter value={filter} onChange={setFilter} />
      <h2>Add person</h2>
      <PersonForm onSubmit={addPerson} />
      <h2>Numbers</h2>
      <PersonList persons={personsToShow} onDelete={deletePerson} />
    </div>
  )
}

export default App
