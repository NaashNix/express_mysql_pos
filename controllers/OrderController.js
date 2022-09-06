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
         const orderID = order.orderID;
         const date = order.date.toLocaleDateString();
         const customerId = order.customerId;
         const totalPrice = order.totalPrice;
         const orderDetailsObj = orderDetails.getAllOrderDetails(orderID);
         orders.push({
            orderID: orderID,
            date: date,
            customerId: customerId, 
            totalPrice: totalPrice,
            orderDetails: orderDetailsObj,
         });
      }
      if (orders.length > 0) {
         res.send(orders);
      }

      if (error) {
         res.status(500).send(error.sqlMessage);
      }
   });

}


const saveOrder = (req,res) => {
   const orderID = req.body.orderID;
   const date = req.body.date;
   const customerId = req.body.customerId;
   const totalPrice = req.body.totalPrice;
   const orderDetailsObj = req.body.orderDetails;

   const query = "INSERT INTO Orders(orderID,date,customerId,totalPrice) VALUES(?,?,?,?)";
   connection.query(
      query,[orderID, date, customerId, totalPrice],(err) => {
         if (!err) {
            for (const orderDetail of orderDetailsObj){
               orderDetails.saveOrderDetails(
                  orderDetail.odID,
                  orderID,
                  orderDetail.itemCode, 
                  orderDetail.qty,
                  orderDetail.unitPrice,
                  orderDetail.itemTotal
                  );
            }

            res.send('order saved!');

         } else {
            res.status(500).send(err.sqlMessage);
         }
      });
}

const deleteOrder = (req,res) => {
   const orderID = req.params.orderID;
   let OdResult = orderDetails.deleteOrderDetails(orderID);

   if (!OdResult) {
      const query = "DELETE FROM Orders WHERE orderID=?";
      connection.query(query, [orderID], (error, result) => {
         if (!error){
            res.send('order deleted!');
         }else {
            res.send(error.sqlMessage);
         }
      });

   } else {
      res.send('error in orderDetails');
   }

}


module.exports = { getAllOrders, saveOrder, deleteOrder };