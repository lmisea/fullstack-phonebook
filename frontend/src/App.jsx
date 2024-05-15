import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [personsToShow, setPersonsToShow] = useState(persons)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
      setPersonsToShow(initialPersons)
    })
  }, []) // The empty array as the second argument ensures that the effect is executed only the first time the component is rendered.
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    if (isPersonInPhonebook(newName)) {
      const result = window.confirm(
        `${newName} is already added to the phonebook. Replace the old number with a new one?`
      )
      if (result) {
        const person = persons.find(
          (p) => p.name.toLowerCase() === newName.toLowerCase()
        )
        const updatedPerson = { ...person, number: newNumber }

        personService
          .update(person.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) => (p.id !== person.id ? p : returnedPerson))
            )
            setPersonsToShow(
              persons.map((p) => (p.id !== person.id ? p : returnedPerson))
            )
          })
          .catch(() => {
            setIsError(true)
            setNotificationMessage(
              `Information of ${newName} has already been removed from the server`
            )
            setTimeout(() => {
              setNotificationMessage(null)
              setIsError(false)
            }, 5000)
            setPersons(persons.filter((p) => p.id !== person.id))
            setPersonsToShow(persons.filter((p) => p.id !== person.id))
          })
      }
      return
    }

    const personObject = {
      name: newName,
      number: newNumber,
    }

    personService.create(personObject).then((returnedPerson) => {
      personObject.id = returnedPerson.id
      setPersons(persons.concat(returnedPerson))
      setPersonsToShow(persons.concat(returnedPerson))
      setNotificationMessage(`Added ${newName}`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    })

    setNewFilter('')
    setNewName('')
    setNewNumber('')
  }

  const isPersonInPhonebook = (name) => {
    return persons.some(
      (person) => person.name.toLowerCase() === name.toLowerCase()
    )
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = async (event) => {
    setNewFilter(event.target.value)
    const updatedFilter = event.target.value

    if (updatedFilter.length === 0) {
      setPersonsToShow(persons)
      return
    }

    setPersonsToShow(
      persons.filter((person) =>
        person.name.toLowerCase().startsWith(updatedFilter.toLowerCase())
      )
    )
  }

  const handleClearButton = (event) => {
    event.preventDefault()
    setNewName('')
    setNewNumber('')
  }

  const handleDeleteButton = (id) => {
    const person = persons.find((p) => p.id === id)
    const result = window.confirm(`Delete ${person.name}?`)
    if (result) {
      personService.deletePerson(id).then(() => {
        setPersons(persons.filter((p) => p.id !== id))
        setPersonsToShow(persons.filter((p) => p.id !== id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} isError={isError} />
      <Filter handleFilterChange={handleFilterChange} newFilter={newFilter} />
      <h2>add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleClearButton={handleClearButton}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons
        persons={personsToShow}
        handleDeleteButton={handleDeleteButton}
      />
    </div>
  )
}

export default App
