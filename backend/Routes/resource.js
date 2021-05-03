const express = require("express");

const Router = express.Router();

const {createResource,getAllResources,getResources} = require("../Controllers/resource")


Router.post("/create/resource" , createResource  )

Router.get("/getallresources",getResources)

Router.get("/getallresourcesinstate/:State",getAllResources)



module.exports = Router; 