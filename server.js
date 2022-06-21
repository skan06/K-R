// Importation express
const express = require("express");
// Instence creation
const app = express();
// Jsson middleware
app.use(express.json())
// Importation dotenv
require("dotenv").config();
// db connection
const db=require("./Config/connectdb");
db();
// Root global creation
app.use("/api/user",require("./Routes/user"));
app.use("/api/cars",require("./Routes/car"));
// Port creation
const port=process.env.PORT;
// Server creation
app.listen(port,error=>error ?
    console.log(error)
    :console.log(`The server is running on ${port}`));