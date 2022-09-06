const express = require('express');
const app = express();

app.use(express.json());
app.use("/customer",require('./routes/customerRoute'));
app.use("/item",require('./routes/itemRoute'));
app.use('/order', require('./routes/orderRoute'));

app.listen(3000,() => {
   console.log('APP Listening');
});

