export function PersonList({ persons }) {
  return persons.map((person) => (
    <PersonItem key={person.name} person={person} />
  ))
}

function PersonItem({ person }) {
  return (
    <div key={person.name}>
      {person.name} {person.number}
    </div>
  )
}
