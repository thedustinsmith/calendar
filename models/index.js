var bookshelf = require('./config');

var Users = bookshelf.Model.extend({
  tableName: 'Users',
  idAttribute: 'UserID'
  // messages: function() {
  //   return this.hasMany(Posts);
  // }
});

module.exports = {
	Users: Users
};