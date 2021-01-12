let mongoose = require('mongoose')

const schemArticle = mongoose.Schema({
    titre: {type: String, default : 'Pas de titre'},
    reference : {type : String, default : ()=> `PROBLEME${Date.now()}`},
    photo: {type: String, default: 'https://enzo-cora.cloudns.cl:8080/assets/semantic/articles/defaultBannierePhoto.png'},
    contenu: {type: String, required: true},
    online : {type : Boolean, required: true},
    date : {type : Date, default : ()=> new Date()},

    categorie : {type : String, default : 'none'},
    sousTitre : {type: String, default : 'Pas de sous titre'},
})

module.exports = mongoose.model('articles', schemArticle)