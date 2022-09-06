const mysql = require('mysql2');
const db = require('../configs/Db.configs');

const connection = mysql.createConnection(db.database);


connection.connect((err) => {
   if (!err) {
      console.log("Connected to my sql server");
      const customerTableQuery =
         "CREATE TABLE IF NOT EXISTS Item(code VARCHAR(255) NOT NULL," +
         "description VARCHAR(255),qtyOnHand INT," +
         "unitPrice double,CONSTRAINT PRIMARY KEY (code))";
      connection.query(customerTableQuery, (err, result) => {
         if (result.warningCount === 0) {
            console.log("item table created");
         }
         if (err) res.status(500).send(response(err.sqlMessage, null));
      });
   } else {
      console.log(err);
   }
});


const getAllItems = (req,res) => {
   const query = 'SELECT * FROM Item';
   connection.query(query, (error, result) => {
         if (err){
            res.status(500).send(err.sqlMessage);
         }else {
            res.send(result);
         }
   });
}

const saveItem = (req,res) => {
   const query = "INSERT INTO Item (code, description, qtyOnHand, unitPrice) VALUES(?,?,?,?)";
   const code = req.body.code;
   const description = req.body.description;
   const qtyOnHand = req.body.qtyOnHand;
   const unitPrice = req.body.unitPrice;

   connection.query(query, (error, result) => {
      if (!error){
         res.send('item saved');
      }else {
         res.send(error.sqlMessage);
      }
   });

}


module.exports = {getAllItems, saveItem};