const Persons = ({ persons, handleDeleteButton }) => {
  return persons.map((person) => (
    <Person
      key={person.id}
      person={person}
      handleDeleteButton={handleDeleteButton}
    />
  ))
}

const Person = ({ person, handleDeleteButton }) => {
  return (
    <>
      {person.name} {person.number}
      <button onClick={() => handleDeleteButton(person.id)}>delete</button>
      <br />
    </>
  )
}

export default Persons
