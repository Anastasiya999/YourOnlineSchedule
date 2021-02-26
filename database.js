var mysql = require('mysql');
var conn = mysql.createConnection({
  host: 'localhost', // Replace with your host name
  user: 'pechko_1151779',      // Replace with your database username
  password: '474600s*L',      // Replace with your database password
  database: 'WWW20_PECHKO' // // Replace with your database Name
}); 
conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
module.exports = conn;