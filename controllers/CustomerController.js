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


const updateCustomer = (req,res) => {
   const id = req.body.id;
   const name = req.body.name;
   const address = req.body.address;
   const tel = req.body.tel;

   const query = "UPDATE Customer SET name=?,address=?,tel=? WHERE id=?";

   connection.query(query, [name, address, tel, id], (err, result) => {
      if (result.changedRows > 0) {
         res.send('customer updated');
      } else {
         res.send('user not found!');
      }

   });
}

const deleteCustomer = (req, res) => {
   const id = req.params.id;
   const query = "DELETE FROM Customer WHERE id=? ";
   connection.query(query, id, (err, result) => {
      if (result.affectedRows > 0) {
         res.send('customer deleted!');
      } else {
         res.send('no user found!');
      }
      if (err) {
         res.status(500).send(err.sqlMessage);
      }
   });
}

const searchCustomer = (req,res) =>{
   const id = req.params.id;
   const query = "SELECT * FROM Customer WHERE id=?";
   connection.query(query, id, (error, result) => {
      const exist = result.length;
      if (exist) {
         res.send(result);
      } else {
         res.send('customer not found!');
      }

      if (error) {
         res.status(500).send(error.sqlMessage);
      }
   });
}

module.exports = {getAllCustomers, saveCustomer, updateCustomer, deleteCustomer, searchCustomer};