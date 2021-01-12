let mongoose = require('mongoose')

const schemAgence = mongoose.Schema({
    nomAgence: {type : String, required : true},
    photos : {type : []},
    fixe1 : { type : String, required : true},
    fixe2 : { type : String},
    portable : {type : String, required : true},
    horraires : {type :String, required : true},
    jours : {type : String, required : true},
    mail1 : {type:String, required : true},
    mail2 : {type:String},
    presentation : {type : String},
    address : {
        country : {type : String, required : true},
        region : {type  : String, required : true},
        city : {type : String, required : true},
        postal_code : {type : Number, required : true},
        street : {type  : String, required : true},
        longitude : {type  : Number, required : true},
        latitude : {type  : Number, required : true},
    },
    gerant : {
        nom : {type : String, required : true},
        prenom : {type : String, required : true},
        photo : {type : String},
    }

});
module.exports = mongoose.model('agence', schemAgence)