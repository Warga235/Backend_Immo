//Appels Modules
const mongoose = require('mongoose')
const unique_validator = require('mongoose-unique-validator')
mongoose.set('useCreateIndex',true)

//Shemas

const userSchema = mongoose.Schema({
    mail : {type : String, require : true, unique : true},
    mdp : {type : String, require : true},
    sexe : {type : String, require : true},
    nom : {type : String, require : true},
    prenom : {type : String, require : true},
    adresse : {
        pays : {type : String, require : true},
        ville : {type : String, require : true},
        cp : {type : String, require : true},
        rue : {type : String, require : true},
    },
    phone : {type : String, require : true },
    pub1 : {type : Boolean, default : false},
    pub2 : {type : Boolean, default : false},
    isAdmin : {type : Boolean, default : false},
    created_date : {type:Date, default : Date.now }
})

userSchema.plugin(unique_validator)
module.exports = mongoose.model('users',userSchema)