const mysql = require('mysql');
const db = require('../configs/Db.configs');

const connection = mysql.createConnection(db.database);

connection.connect((err) => {
   if (!err) {
      console.log()
   }
})