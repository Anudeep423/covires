const express = require("express");

const Router = express.Router();

const {createProvider,getProviderByNumber,getAllProviders,getProviderById,updateProvider,getProvider,deleteProvider,getProviders} = require("../Controllers/providers");

Router.param("providerId", getProviderById);

Router.post( "/create/provider", createProvider );

Router.get("/getproviderbynumber/:Number" , getProviderByNumber   )

Router.get("/getallprovidersByCityAndResource/:State/:Res" , getAllProviders  );

Router.get("/getprovider/:providerId" , getProvider );

Router.get("/getallproviders",getProviders)

Router.put(
    "/updateprovider/:providerId", 
    updateProvider
  );

  Router.delete(
    "/deleteprovider/:providerId",
    deleteProvider
  ); 



module.exports = Router;

