import { useEffect, useState } from 'react'
import { Filter } from './components/Filter.jsx'
import { PersonForm } from './components/PersonForm.jsx'
import { PersonList } from './components/PersonList.jsx'
import {
  createPerson,
  deletePersonById,
  getPersons,
  updatePersonById,
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

  let addPerson = (personObject) => {
    let existingPerson = persons.find(
      (person) => person.name === personObject.name,
    )

    if (
      existingPerson &&
      window.confirm(
        `${personObject.name} is already added to phonebook, replace the old number with a new one?`,
      )
    ) {
      updatePersonById(existingPerson.id, personObject).then(
        (updatedPerson) => {
          setPersons((persons) =>
            persons.map((person) =>
              person.id === existingPerson.id ? updatedPerson : person,
            ),
          )
        },
      )

      return { status: 'success' }
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
