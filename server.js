const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
require('dotenv').config()
console.log(process.env)

//TODO:
//UPDATE, DELETE запросы и залить в cyclic. На этом всё

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'to-do'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
  db.collection('Todos').find().toArray()
  .then(data => {
    res.render('index.ejs', {info: data})
  })
  .catch(err => console.error(err))
})

app.post('/addTodo', (req, res) => {
  db.collection('Todos').insertOne({task: req.body.task})
  .then(result => {
    console.log('Task added...')
    res.redirect('/')
  })
})

app.delete('/deleteTask', (req, res) => {
  db.collection('Todos').deleteOne( {task: req.body.task} )
  .then(result => {
    console.log('Task deleted.')
    res.json('Task deleted.')
  })
  .catch(error => console.error(error))
})

app.listen(process.env.PORT || PORT, ()=>{
  console.log(`Server running on port ${PORT}`)
})