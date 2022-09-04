const { response } = require('express');
const mysql = require('mysql2');
const db = require('../configs/Db.configs');

const connection = mysql.createConnection(db.database);

connection.connect((err) => {
   if (!err) {
      console.log('connected');
      const ctQuery = 
      "CREATE TABLE IF NOT EXISTS "+
      "Customer( id VARCHAR(255)," +
      "name VARCHAR(255) NOT NULL DEFAULT 'unknown'," + 
      "address VARCHAR(255)," +  
      "tel VARCHAR(15)," +
      "CONSTRAINT PRIMARY KEY (id))";

      connection.query(ctQuery, (err, result) => {
         if (result.warningStatus === 0){
            console.log('customer table created');
         }

         if (err) result.status(500).send(response(err.sqlMessage, null));

      });


   }else {
      console.log(err);
   }
});

const getAllCustomers = (req,res) => {
   const query = 'SELECT * FROM Customer';
   connection.query(query, (error, result) => {
      res.send(result);

      if (error){
         res.status(500).send(error.sqlMessage);
      }

   });
};

const saveCustomer = (req, res) => {
   const id = req.body.id;
   const name = req.body.name;
   const address = req.body.address;
   const tel = req.body.tel;

   const query = "INSERT INTO Customer(id,name,address,tel) VALUES(?,?,?,?)";

   connection.query(query, [id, name, address, tel], (err) => {
         if(!err){
            res.send('customer saved');
         }else{
            res.status(500).send(err.sqlMessage);
         }
   });

};


module.exports = {getAllCustomers, saveCustomer};