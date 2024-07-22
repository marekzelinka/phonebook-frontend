import { useState } from 'react'

function App() {
  let [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ])
  let [newName, setNewName] = useState('')
  let [newNumber, setNewNumber] = useState('')
  let [filter, setFilter] = useState('')

  let personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()),
  )

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        <label htmlFor="q" aria-label="Filter by name">
          filter shown with
        </label>{' '}
        <input
          type="search"
          name="q"
          id="q"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />
      </div>
      <h2>Add person</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault()

          let personWithExistingName = persons.find(
            (person) => person.name === newName,
          )
          if (personWithExistingName) {
            return window.alert(`${newName} is already added to phonebook`)
          }

          let personObject = {
            name: newName,
            number: newNumber,
            id: persons.length + 1,
          }
          setPersons((persons) => persons.concat(personObject))

          setNewName('')
          setNewNumber('')
        }}
      >
        <div>
          <label htmlFor="name" style={{ display: 'block' }}>
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="number" style={{ display: 'block' }}>
            Number
          </label>
          <input
            type="text"
            name="number"
            id="number"
            value={newNumber}
            onChange={(event) => setNewNumber(event.target.value)}
          />
        </div>
        <div>
          <button type="submit">Save</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  )
}

export default App
