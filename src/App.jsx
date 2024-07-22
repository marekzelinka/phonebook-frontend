import { useState } from 'react'

function App() {
  let [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  let [newName, setNewName] = useState('')

  return (
    <div>
      <h1>Phonebook</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault()

          let personObject = {
            name: newName,
          }
          setPersons((persons) => persons.concat(personObject))

          setNewName('')
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
