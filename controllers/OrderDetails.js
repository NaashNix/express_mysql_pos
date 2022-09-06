const mysql = require('mysql2');

const db = require('../configs/Db.configs');

const connection = mysql.createConnection(db.database);


connection.connect((err) => {
   if (!err) {
      console.log('connected');
      const ctQuery =
         "CREATE TABLE IF NOT EXISTS OrderDetails(" +  
         "odID VARCHAR(255)," +
         "orderID VARCHAR(255) NOT NULL," +
         "itemCode VARCHAR(255)," +
         "qty INT," +
         "unitPrice DOUBLE," +
         "itemTotal DOUBLE," +
         "CONSTRAINT PRIMARY KEY (odID)," +
         "CONSTRAINT FOREIGN KEY(orderID) REFERENCES Orders(orderID)," +
         "CONSTRAINT FOREIGN KEY (itemCode) REFERENCES Item(code))";

      connection.query(ctQuery, (error, result) => {

         console.log(error);
         console.log(result);

         if (result.warningStatus === 0) {
            console.log('orderDetails table created');
         }

         if (err) result.status(500).send(response(err.sqlMessage, null));

      });

   }else {
      console.log(err);
   }

});

const getAllOrderDetails =  (orderID) =>{
   const query = 'SELECT * FROM OrderDetails WHERE orderID = ?';
   connection.query(query, [orderID], (error, result) => {
         if ( !error ){
            
         }
   });
}

module.exports = {getAllOrderDetails}