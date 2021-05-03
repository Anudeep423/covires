const ProviderSchema = require("../Models/providers")
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { json } = require("body-parser");

exports.getProviderById = (req, res, next, id) => {
    ProviderSchema.findById(id)
      .exec((err, provider) => {
        if (err) {
          return res.status(400).json({
            error: "provider not found"
          });
        }
        req.provider = provider;
        next();
      });
  };

  exports.getProviderByNumber = (req,res) => {
    ProviderSchema.find({PhoneNumber : req.params.Number })
    .exec( (err,provider) => {
      if (err) {
        return res.status(400).json({
          error: "provider not found"
        });
      }
     return res.json(provider)
    }   )

  }

 
exports.createProvider = (req, res) => {

    const provider = new ProviderSchema(req.body);

    provider.save( (err, provider ) => {
      if(err){
        return res.json({Error : err})
      }
      return res.json({Success : "Provider Added" })
    } )



    // let form = new formidable.IncomingForm();
    // form.keepExtensions = true;
  
    // form.parse(req, (err, fields, file) => {
    //   if (err) {
    //     return res.status(400).json({
    //       error: "problem with Photo"
    //     });
    //   }
  
    //   let provider = new ProviderSchema(fields);

    //   //handle file here
    //   if (file.Photo) {
    //     if (file.Photo.size > 3000000) {
    //       return res.status(400).json({
    //         error: "File size too big!"
    //       });
    //     }
    //     provider.Photo.data = fs.readFileSync(file.Photo.path);
    //     provider.Photo.contentType = file.Photo.type;
    //   }
    //   // console.log(provider);
  
    //   //save to the DB
    //   provider.save((err, provider) => {
    //     if (err) {
    //       res.status(400).json({
    //         error: err
    //       });
    //     }
    //     res.json(provider);
    //   });
    // });
  };

  exports.getAllProviders = (req, res) => {
    ProviderSchema.find({State : req.params.State})
    .select("-Photo")
      .exec((err, provider) => {
        if (err) {
          return res.status(400).json({
            error: "NO provider FOUND"
          });
        }

        const Res = provider.filter( (data,i) => {
          if(data.ResourceType == req.params.Res){
            return data
          }
        } )
        
        res.json(Res);
      });
  };

  exports.getProviders = (req, res) => {
    ProviderSchema.find({City : req.params.City})
    .select("-Photo")
      .exec((err, provider) => {
        if (err) {
          return res.status(400).json({
            error: "NO provider FOUND"
          });
        }

        res.json(provider);
      });
  };

  exports.updateProvider = (req, res) => {
    if(req.body.Verified === true && req.provider.Verified !==  req.body.Verified){
      const lastVerifiedAdded = {...req.body,lastVerified : Date.now()}
      ProviderSchema.findByIdAndUpdate(
        { _id: req.provider._id },
        { $set: lastVerifiedAdded },
        { new: true, useFindAndModify: false },
        (err, Provider) => {
          if (err) {
            return res.status(400).json({
              error: err
            });
          }
        return  res.json(Provider);
        }
      );
    }else{
    console.log(req.body.Verified)
    console.log(req.provider._id);
    ProviderSchema.findByIdAndUpdate(
      { _id: req.provider._id },
      { $set: req.body },
      { new: true, useFindAndModify: false },
      (err, Provider) => {
        if (err) {
          return res.status(400).json({
            error: err
          });
        }
     return res.json(Provider);
      }
    );
    }
    // let form = new formidable.IncomingForm();
    // form.keepExtensions = true;
  
    // form.parse(req, (err, fields, file) => {
    //   if (err) {
    //     return res.status(400).json({
    //       error: "problem with image"
    //     });
    //   }
  
    //   //updation code
    //   let provider = req.provider;
    //   provider = _.extend(provider, fields);
  
    //   //handle file here
    //   if (file.image) {
    //     if (file.image.size > 3000000) {
    //       return res.status(400).json({
    //         error: "File size too big!"
    //       });
    //     }
    //     provider.image.data = fs.readFileSync(file.image.path);
    //     provider.image.contentType = file.image.type;
    //   }
    //   // console.log(provider);
  
    //   //save to the DB
    //   provider.save((err, provider) => {
    //     if (err) {
    //       res.status(400).json({
    //         error: err
    //       });
    //     }
    //     res.json(provider);
    //   });
    // });
  };

  exports.getProvider = (req,res) => {
  return  res.json(req.provider)
  }

  exports.deleteProvider = (req, res) => {
    let provider = req.provider;
    provider.remove((err, deletedprovider) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to delete the provider"
        });
      }
      res.json({
        message: "Deletion was a success",
      });
    });
  };

//   exports.updateProvider = (req, res) => {
//     let form = new formidable.IncomingForm();
//     form.keepExtensions = true;
  
//     form.parse(req, (err, fields, file) => {
//       if (err) {
//         return res.status(400).json({
//           error: "problem with image"
//         });
//       }
  
//       //updation code
//       let product = req.product;
//       product = _.extend(product, fields);
  
//       //handle file here
//       if (file.image) {
//         if (file.image.size > 3000000) {
//           return res.status(400).json({
//             error: "File size too big!"
//           });
//         }
//         product.image.data = fs.readFileSync(file.image.path);
//         product.image.contentType = file.image.type;
//       }
//       // console.log(product);
  
//       //save to the DB
//       product.save((err, product) => {
//         if (err) {
//           res.status(400).json({
//             error: "Updation of product failed"
//           });
//         }
//         res.json(product);
//       });
//     });
//   };