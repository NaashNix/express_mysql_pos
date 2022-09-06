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
   const orderItems = [];
   connection.query(query, [orderID], (error, result) => {

      
         if ( !error ){
            for (const oDetails of result) {
               orderItems.push(JSON.stringify(oDetails));
               console.log("oDetails@51"+oDetails);
            }
            return orderItems;

         }else {
            console.log(error.sqlMessage);
            return null;
         }
   });
}

const deleteOrderDetails = (orderID) => {
   const query = "DELETE FROM OrderDetails WHERE orderID=?";
   connection.query(query, [orderID], (error, result) => {
      if (result.affectedRows > 0) {
         return true;
      } else if (result.affectedRows == 0){
         return false;
      }else {
         console.log(error);
         return false;
      }
   });
}

const saveOrderDetails = (odID,orderID,itemCode, qty, unitPrice, itemTotal) => {
   const query = "INSERT INTO OrderDetails(odID, orderID, itemCode,qty,unitPrice,itemTotal) VALUES(?,?,?,?,?,?)";
   connection.query(query, [odID, orderID, itemCode, qty, unitPrice, itemTotal], (error) => {
      if (!error) {
         return true;
      } else {
         return false;
      }
   })
}

module.exports = {getAllOrderDetails, deleteOrderDetails,saveOrderDetails}