import { useEffect, useState } from 'react'
import { Alert } from './components/Alert.jsx'
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
  let [notification, setNotification] = useState(null)

  function notify({ status = 'success', message, timeOutMs = 5000 }) {
    setNotification({ status, message })
    window.setTimeout(() => setNotification(null), timeOutMs)
  }

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
      updatePersonById(existingPerson.id, personObject)
        .then((updatedPerson) => {
          setPersons((persons) =>
            persons.map((person) =>
              person.id === existingPerson.id ? updatedPerson : person,
            ),
          )
        })
        .catch((error) => {
          notify({ status: 'error', message: error.response.data.error })
        })

      return { status: 'success' }
    }

    createPerson(personObject)
      .then((newPerson) => {
        setPersons((persons) => persons.concat(newPerson))
        notify({ message: `Added ${newPerson.name}` })
      })
      .catch((error) => {
        notify({ status: 'error', message: error.response.data.error })
      })

    return { status: 'success' }
  }

  let deletePerson = (id) => {
    let personToDelete = persons.find((person) => person.id === id)

    let shouldDelete = window.confirm(`Delete ${personToDelete.name}?`)

    if (!shouldDelete) {
      return
    }

    deletePersonById(id)
      .then(() => {
        setPersons((persons) => persons.filter((person) => person.id !== id))
      })
      .catch(() => {
        notify({
          status: 'error',
          message: `Information of ${personToDelete.name} has already been removed from server`,
        })
        setPersons((persons) => persons.filter((person) => person.id !== id))
      })
  }

  return (
    <div>
      <h1>Phonebook</h1>
      {notification ? (
        <Alert status={notification.status} message={notification.message} />
      ) : null}
      <Filter value={filter} onChange={setFilter} />
      <h2>Add person</h2>
      <PersonForm onSubmit={addPerson} />
      <h2>Numbers</h2>
      <PersonList persons={personsToShow} onDelete={deletePerson} />
    </div>
  )
}

export default App
