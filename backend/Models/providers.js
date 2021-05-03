const mongoose = require("mongoose");

const ProviderSchema = new mongoose.Schema({
    State : {
        type : String,
        required : true
    },
    Name : {
        type : String,
        required : true
    },	
    PhoneNumber : {
	type : Number,
	required : true	
},
    ResourceType : {
        type : String,
        required : true
    },
    Available : {
        type : Boolean,
        required : true
    },
    Verified : {
        type : Boolean,
        required : true
    },
    Address : {
        type : String,
        required : true
    },
    Price : {
        type : Number,
        required : true
    },
    Stock : {
        type : Number,
        required : true
    },
    Description : {
        type : String,
        required : true   
    },
    lastVerified : {
        type : String
    },
    Photo : {
            data: Buffer,
            contentType: String
          }
     
    
}, { timestamps: true })

module.exports = mongoose.model("Providers" , ProviderSchema);