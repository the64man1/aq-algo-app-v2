const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const app = express();
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
const connString = process.env.ATLAS_URI;

app.use(bodyParser.json());
app.use(cors());

const router = require('./routes');
app.use(router);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../build")));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
  })
}

mongoose.connect(connString, {
    useNewUrlParser: true,
    //useFindAndModify: false,
    useUnifiedTopology: true    
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});