const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })

app.get('/info', (request, response) => {
  const personCount = persons.length
  response.send(`
    <p>
      Phonebook has info for ${personCount} people
    </p>

    <p>
      ${Date()}
    </p>
  `)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  }
  else {
    response.statusMessage = `Not found: A person with id ${id} does not exist in the phonebook`
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.statusMessage = `No content: The person with id ${id} was successfully deleted from the phonebook`
  response.status(204).end()
})

function generateId() {
  const min = Math.ceil(1);
  const max = Math.floor(10**7);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}


app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name and/or number missing' 
    })
  }
  else if (persons.find(person => person.name === body.name)) {
    return response.status(400).json({ 
      error: `${body.name} is already in the phonebook` 
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person)

  response.json(persons)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)