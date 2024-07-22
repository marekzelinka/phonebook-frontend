import { useState } from 'react'

function App() {
  let [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  let [newName, setNewName] = useState('')
  let [newNumber, setNewNumber] = useState('')

  return (
    <div>
      <h1>Phonebook</h1>
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
      {persons.map((person) => (
        <div key={person.name}>{person.name}</div>
      ))}
    </div>
  )
}

export default App
