const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Incorrect usage: node mongo.js password')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://andreaskpetersen:${password}@phonebook.ggcvdpp.mongodb.net
  `

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

person.save().then(result => {
  console.log('person saved!')
  mongoose.connection.close()
})