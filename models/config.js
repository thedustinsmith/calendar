var secrets = require('../secrets.json');
var knex = require('knex')({
  client: 'postgres',
  connection: {
    host     : '10.8.0.1',
    user     : secrets.dbUser,
    password : secrets.dbPassword,
    database : 'calendar',
    charset  : 'utf8'
  }
});

var bookshelf = require('bookshelf')(knex);
module.exports = bookshelf;