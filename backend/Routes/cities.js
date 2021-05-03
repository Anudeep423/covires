const express = require("express")

const Router = express.Router();

const {createCity,getAllcities} = require("../Controllers/cities")

Router.post("/create/state" , createCity  );

Router.get("/getallcities",getAllcities)

module.exports = Router