const express = require('express')

const app = express()
const PORT = 3001

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

// Root route
app.get('/', (request, response) => {
  response.send('<h1>Full Stack Phonebook!</h1>')
})

// Fetch all persons
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
