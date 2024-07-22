export function PersonList({ persons, onDelete }) {
  return persons.map((person) => (
    <PersonItem key={person.id} person={person} onDelete={onDelete} />
  ))
}

function PersonItem({ person, onDelete }) {
  return (
    <div key={person.name}>
      {person.name} {person.number}
      <button type="button" onClick={() => onDelete(person.id)}>
        Delete
      </button>
    </div>
  )
}
