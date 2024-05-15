const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3001

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

// Return the request body if it's a POST request
morgan.token('req-body', (req, res) => {
  if (req.method === 'POST') return JSON.stringify(req.body)
})

// Middlewares
app.use(express.json()) // Parse req body to json
// Log requests
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :req-body'
  )
)
app.use(cors()) // Allow cross-origin requests

// Root route
app.get('/', (request, response) => {
  response.send('<h1>Full Stack Phonebook!</h1>')
})

// Fetch all persons
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

// Get the amount of persons in the phonebook and the request time
app.get('/info', (request, response) => {
  const date = new Date()

  response.send(
    `<p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>`
  )
})

// Fetch a single person by id
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find((person) => person.id === id)

  if (person) response.json(person)
  else response.status(404).end()
})

// Delete a person by id
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter((person) => person.id !== id)

  response.status(204).end()
})

// Generate a new id
const generateId = () => {
  return Math.floor(Math.random() * 9999)
}

// Add a new person
app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing',
    })
  }

  if (persons.find((person) => person.name === body.name)) {
    return response.status(400).json({
      error: 'name must be unique',
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person)
  response.json(person)
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
