const citySchema = require("../Models/cities")

exports.createCity = (req,res) => {
    console.log(req.body);
    const city = new citySchema(req.body);

    city.save((err, city) => {
        if (err) {
          res.status(400).json({
            error: err
          });
        }
        const {city : cityName} = city;
        res.json({message : "City successfully added" , cityName });
      });
 

  };

  exports.getAllcities = (req,res) => {

    citySchema.find()
    .exec( (err,cities) => {
        if(err || !cities){
            return res.json("No Cities Found")
        }
        res.json({cities})
    }  )

  }
