import { useState } from 'react'
import { Filter } from './components/Filter.jsx'
import { PersonForm } from './components/PersonForm.jsx'
import { PersonList } from './components/PersonList.jsx'

function App() {
  let [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ])
  let [filter, setFilter] = useState('')

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
      id: persons.length + 1,
    }
    setPersons((persons) => persons.concat(personObject))

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
