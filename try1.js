const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;


mongoose.connect("mongodb://localhost:27017/mydata", {
    userNewUrlParser: true, useUnifiedTopology: true
}, (err) => { if (err) { console.log(err) } else { console.log("Success") } })

app.listen(PORT, () => { console.log(`On port is ${PORT}`) })