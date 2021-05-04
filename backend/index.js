const express = require("express");

const mongoose = require("mongoose");

const cityRoutes = require("./Routes/cities")
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const providerRoutes = require("./Routes/providers");

const resourceRoutes = require("./Routes/resource")

const PORT = 8080

// mongoose 
mongoose
  .connect(process.env.Database, {
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

  app.use("/api",providerRoutes);

  app.use("/api",resourceRoutes);

  app.use("/api",cityRoutes)

  app.listen( PORT , () => {  console.log(`PORT started running on ${PORT}`)});
