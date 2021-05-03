const ResourceSchema = require("../Models/resource")
const ProviderSchema = require("../Models/providers")
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getResources = (req,res) => {
  console.log("Called")
  ResourceSchema.find()
  .select("-Photo")
  .exec( (err,resources) => {
    if(err){
      return res.json(err)
    }
    return res.json(resources)
  } )
}

exports.getAllResources = async  (req,res)  => {    



   ResourceSchema.find()
   .select("-Photo")
      .exec((err, resources) => {
        if (err) {
          return res.status(400).json({
            error: "NO resource FOUND"
          });
        }
        
        let distinctResources = []
        let Sending = []

        resources.map(  (data,index) => {
          if(distinctResources.indexOf(data.Name) == -1 ){
            distinctResources.push(data.Name)
          }
        }   )

        distinctResources.map(  (data,index) => {
          Sending[index] = {Resource : data , Count : 0 , Photo : resources[index].Photo }
        } ) 

      ProviderSchema.find({State :  req.params.State })
        .exec(  (err,providers) => {
          const empty = []
          if(err || providers.length < 1  ){
            resources.map( (data,i) => {
              empty.push({Resource : data.Name, Count : 0 , Photo : resources.Photo })
            } )
            return res.json(empty);
          } 
          providers.map(( data,i ) => {
           if(distinctResources.indexOf(data.ResourceType) !== -1 ){
           const info =  distinctResources.indexOf(data.ResourceType)
             console.log(data);
           const index = distinctResources.indexOf(data.ResourceType)
           Sending[index] = { Resource: data.ResourceType, Count : Sending[index].Count + 1 ,Photo : resources[index].Photo ,    }
           }  
           if(i === providers.length - 1 ){
            return res.json(Sending)
           }
          } )
        }  )

        // console.log(distinctResources);
        // console.log("Why Called Before",Sending)

       
      });
}


exports.createResource = (req, res) => {

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
  
    form.parse(req, (err, fields, file) => {
      if (err) {
        return res.status(400).json({
          error: "problem with Photo"
        });
      }
  
      let resource = new ResourceSchema(fields);

      //handle file here
      if (file.Photo) {
        if (file.Photo.size > 3000000) {
          return res.status(400).json({
            error: "File size too big!"
          });
        }
        resource.Photo.data = fs.readFileSync(file.Photo.path);
        resource.Photo.contentType = file.Photo.type;
      }
      // console.log(resource);
  
      //save to the DB
      resource.save((err, resource) => {
        if (err) {
          res.status(400).json({
            error: err
          });
        }
        res.json(resource);
      });
    });
  };