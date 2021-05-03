const mongoose = require("mongoose")

const ResourceSchema = new mongoose.Schema({
    Name : {
        type : String , 
        required : true
    },
    Photo : {
        data: Buffer,
        contentType: String
      }
});


module.exports = mongoose.model("Resources",ResourceSchema)