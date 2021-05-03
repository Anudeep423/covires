
const mongoose = require("mongoose")

const citySchema = new mongoose.Schema({

    state : {
        reqired : true,
        type : String
    }

})


module.exports = mongoose.model("Cities" , citySchema)


