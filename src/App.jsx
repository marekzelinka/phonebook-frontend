import axios from 'axios'
import { useEffect, useState } from 'react'
import { Filter } from './components/Filter.jsx'
import { PersonForm } from './components/PersonForm.jsx'
import { PersonList } from './components/PersonList.jsx'

function App() {
  let [persons, setPersons] = useState([])
  let [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3000/persons')
      .then(({ data }) => setPersons(data))
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
    axios
      .post('http://localhost:3000/persons', personObject)
      .then(({ data }) => {
        setPersons((persons) => persons.concat(data))
      })

    return { status: 'success' }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter value={filter} onChange={setFilter} />
      <h2>Add person</h2>
      <PersonForm onSubmit={addPerson} />
      <h2>Numbers</h2>
      <PersonList persons={personsToShow} />
    </div>
  )
}

export default App
