const mysql = require('mysql2');
const db = require('../configs/Db.configs');
const orderDetails = require('./OrderDetails');
const connection = mysql.createConnection(db.database);


connection.connect((err) => {
   if (!err) {
      
      const query =
         "CREATE TABLE IF NOT EXISTS `Orders`(" + 
         "orderID VARCHAR(255) NOT NULL," +
         "date DATE," + 
         "customerId VARCHAR(255)," +
         "totalPrice double," +
         "orderDetails VARCHAR(255)," +
         "CONSTRAINT PRIMARY KEY (orderId)," +
         "CONSTRAINT FOREIGN KEY (customerId) REFERENCES Customer(id))";

      connection.query(query, (err, result) => {
         if (result.warningCount === 0) {
            console.log("order table created");
         }
         if (err) console.log(err);
      });

   } else {
      console.log(err);
   }

});

const getAllOrders = (req,res) => {
   const query = 'SELECT * FROM Orders';
   connection.query(query, (error, result) => {
      let orders = [];
      for (const order of result){
         const orderId = order.orderID;
         const date = order.date.toLocaleDateString();
         const customerId = order.customerId;
         const totalPrice = order.totalPrice;
         const orderDetails = JSON.parse(order.orderDetails);
         orders.push({
            orderId: orderId,
            date: date,
            customerId: customerId, 
            totalPrice: totalPrice,
            orderDetails: orderDetails,
         });
      }
      if (orders.length > 0) {
         res.send(orders);
      }

      if (error) {
         res.status(500).send(error.sqlMessage);
      }
   });

   orderDetails.getAllOrderDetails("OO1", "I001");

}

module.exports = {getAllOrders};