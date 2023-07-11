const mongoose = require('mongoose')

const argc = process.argv.length

if (argc !== 3 && argc !== 5) {
  console.log('Incorrect usage: node mongo.js password')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://andreaskpetersen:${password}@phonebook.ggcvdpp.mongodb.net/personApp`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (argc === 3) {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}

if (argc === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}



