const mysql = require('mysql2');
const db = require('../configs/Db.configs');

const connection = mysql.createConnection(db.database);


connection.connect((err) => {
   if (!err) {
      console.log("Connected to my sql server");
      const customerTableQuery =
         "CREATE TABLE IF NOT EXISTS Item(" +
         "code VARCHAR(255) NOT NULL," +
         "description VARCHAR(255)," + 
         "qtyOnHand INT," +
         "unitPrice double," + 
         "CONSTRAINT PRIMARY KEY (code))";

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
         if (error){
            res.status(500).send(error.sqlMessage);
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

   connection.query(query,[code, description, qtyOnHand, unitPrice] ,(error) => {
      if (!error){
         res.send('item saved');
      }else {
         res.send(error.sqlMessage);
      }
   });

}


const updateItem = (req, res) => {
   const query = "UPDATE Item SET description =?, qtyOnHand =?, unitPrice =? WHERE code =?"
   const code = req.body.code;
   const description = req.body.description;
   const qtyOnHand = req.body.qtyOnHand;
   const unitPrice = req.body.unitPrice;

   connection.query(query, [description, qtyOnHand, unitPrice,code], (error,result) => {
      if (result.affectedRows > 0) {
         res.send('item updated');
      } else if ( result.affectedRows == 0){
         res.send('item not found!');
      }else {
         res.send(error.sqlMessage);
      }
   });

}

const deleteItem = (req,res) => {
   const code = req.params.code;
   const query = "DELETE FROM Item WHERE code=? ";
   connection.query(query, code, (err, result) => {
      if (result.affectedRows > 0) {
         res.send('Item deleted!');
      } else {
         res.send('no Item found!');
      }
      if (err) {
         res.status(500).send(err.sqlMessage);
      }
   });
}

const searchItem = (req,res) => {
   const code = req.params.code;
   const query = "SELECT * FROM Item WHERE code=?";
   connection.query(query, code, (error, result) => {
      const exist = result.length;
      if (exist) {
         res.send(result);
      } else {
         res.send('Item not found!');
      }

      if (error) {
         res.status(500).send(error.sqlMessage);
      }
   });
}

module.exports = {getAllItems, saveItem, updateItem, deleteItem, searchItem};