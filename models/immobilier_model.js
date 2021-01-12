let mongoose = require('mongoose')

const schemImmobilier = mongoose.Schema({
    reference : {type : String, required : true},
    type : { type : String, required : true},
    banniere : {type:String, required : true},
    photos : {type : Array, default : []},
    title : { type: String, required : true},
    status : {type : String, required : true},
    description : {type : String, required : true},
    surface : {type : Number, required : true},
    price : {type : Number, required : true},
    bedroom : {type : Number, required : true},
    bathroom : {type : Number, required : true},
    living_room : {type :Number, required : true },
    kitchen : {type : Number, required : true},
    rooms : {type : Number, required : true},
    garage : {type : Boolean, required : true},
    terrace : {type : Boolean, required : true},
    address : {
        country : {type : String, required : true},
        region : {type  : String, required : true},
        city : {type : String, required : true},
        postal_code : {type : String, required : true},
        street : {type  : String, required : true},
        longitude : {type : Number, required : true},
        latitude : {type  : Number, required : true}
    },
    date : {type : Date, default : Date.now()},
    sellerName : {type : String, required : true},
    sellerFirstName : {type : String, required : true},
    offres : {type : Array, default: []},
});

module.exports = mongoose.model('immos', schemImmobilier)