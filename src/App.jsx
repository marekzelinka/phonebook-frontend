import { useState } from 'react'

function App() {
  let [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  let [newName, setNewName] = useState('')

  return (
    <div>
      <h1>Phonebook</h1>
      <form>
        <div>
          name: <input />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      ...
    </div>
  )
}

export default App
