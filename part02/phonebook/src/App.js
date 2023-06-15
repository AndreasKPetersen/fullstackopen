import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import personService from './services/persons'

const App = () => {
  
  const [persons, setPersons] = useState([])
  
  useEffect(() => {
    personService
      .getAll()
      .then(response => setPersons(response.data))
      .catch(error => {
        console.log('failed during getAll')
      })
  }, [])

  const [newFilter, setNewFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(null)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter newFilter={newFilter} setNewFilter={setNewFilter}/>

      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />

      <h3>Numbers</h3>
      <Persons persons={persons} setPersons={setPersons} newFilter={newFilter} setMessage={setMessage}/>

    </div>
  )
}

export default App