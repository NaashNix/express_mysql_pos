const express = require('express');
const app = express();

app.use(express.json());
app.use("/customer",require('./routes/customerRoute'));

app.listen(3000,() => {
   console.log('APP Listening');
});

