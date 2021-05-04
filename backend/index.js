const express = require("express");
const path = require("path")
const mongoose = require("mongoose");

const cityRoutes = require("./Routes/cities")
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config({ path : "./config.env"});

const providerRoutes = require("./Routes/providers");

const resourceRoutes = require("./Routes/resource")

// const PORT = 8080

// mongoose 
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }) 
  .then(() => { 
    console.log("DB CONNECTED");
  }).catch(err => {console.log(err)} )

  app.use(bodyParser.json()); 
  app.use(cookieParser());
  app.use(cors());

  if(process.env.NODE_ENV  === "production"){
    app.use(express.static( 'client/build' ) );
     app.get("*",(req,res) => {
    res.sendFile( path.resolve( __dirname,"client" , "build" , "index.html"  ))
  } )
 }else{
 app.get("/" , (req,res) => {
   res.send("Workinggg")
 } )
 }

  app.use("/api",providerRoutes);

  app.use("/api",resourceRoutes);

  app.use("/api",cityRoutes)
const PORT = process.env.PORT
  app.listen( process.env.PORT, () => {  console.log(`PORT started running on ${PORT}`)});
