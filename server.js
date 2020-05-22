var path = require('path')
var express = require('express')
var app = express()
var db = require('./db')

app.use(express.json({ extended: false }))
app.use('/', express.static(path.join(__dirname, 'client', 'build')))
app.use('/model/tris.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'src', 'components', 'three', 'classes', 'Player', 'model', 'tris.js'))
})

app.post('/api/addlevel', (req, res) => {
  try {
    db.insert(req.body, function (err, newDoc) {
      if (err) throw err
    })
    res.send("Zapisano")
  } catch (error) {
    res.send("Error")
  }

})

app.get('/api/levels', (req, res) => {
  try {
    db.find({}, function (err, docs) {
      if (err) throw err
      const levels = []
      docs.forEach(doc => {
        levels.push({
          name: doc.name,
          id: doc._id
        })
      })
      res.send(levels)
    })
  } catch (error) {
    res.send("Error")
  }

})

app.get('/api/level/:id', (req, res) => {
  console.log(req.params.id)
  try {
    db.find({ _id: req.params.id }, function (err, docs) {
      if (err) throw err
      res.send(docs[0])
    })
  } catch (error) {
    res.send("Error")
  }
})

app.put('/api/level/:id', (req, res) => {
  console.log("PUT " + req.params.id)
  try {
    db.update({ _id: req.params.id }, { $set: req.body }, {}, function (err, numUpdated) {
      if (err) throw err
      console.log(numUpdated)
      res.send('ok')
    });
  } catch (error) {
    res.send("Error")
  }
})

app.delete('/api/level/:id', (req, res) => {
  console.log("DELETE " + req.params.id)
  try {
    db.remove({ _id: req.params.id }, {}, function (err, numRemoved) {
      if (err) throw err
      console.log(numRemoved)
      res.send('ok')
    });
  } catch (error) {
    res.send("Error")
  }
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT)