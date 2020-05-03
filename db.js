var Datastore = require('nedb')

var db = new Datastore({
  filename: 'db.db',
  autoload: true
});

module.exports = db