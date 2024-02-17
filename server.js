const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
require('dotenv').config()
console.log(process.env)

//TODO:
//UPDATE, DELETE запросы и залить в cyclic. На этом всё
//create, read, update, delete

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
  db.collection('Todos').insertOne({task: req.body.task, completed: false})
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
  .catch(err => console.error(err))
})

app.put('/markComplete', (req, res) => {
  db.collection('Todos').updateOne( { task: req.body.task}, {$set: {
    completed: true
  }}, {
    sort: {_id: -1},
    upsert: false
  })
  .then(result => {
    console.log('Mark completed.')
    res.json('Marked complete')
  })
  .catch(err => console.error(err))

})

app.put('/markUncomplete', (req, res) => {
  db.collection('Todos').updateOne( { task: req.body.task}, {$set: {
    completed: false
  }}, {
    sort: {_id: -1},
    upsert: false
  })
  .then(result => {
    console.log('Mark uncompleted.')
    res.json('<arked uncompleted.')
  })
  .catch(err => console.error(err))
})


app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

