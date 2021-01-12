
exports.test = (req,res)=>{
    console.log('************* IL Y A EU UNE DEMANDE POUR TEST ************')
    res.status(200).json({salut : 'okayy'})
}


const articleSchema = require ('../models/articlesModel')

exports.getOneArticle = (req,res)=>{
    articleSchema.findOne({reference: req.params.id })
        .then(article => {
            res.status(200).json(article)
        } )
        .catch(err =>res.status(404).json({err: err.message}))
}

exports.getAll = (req,res)=>{
    articleSchema.find({online: true })
        .then(articles => {
            res.status(200).json(articles)} )
        .catch(err =>res.status(404).json({err: err.message}))
}
exports.getByCategories = (req,res)=>{
    let limit = +req.query.number
    articleSchema.find({categorie: req.params.id, online: true }).limit(limit)
        .then(articles => res.status(200).json(articles) )
        .catch(err =>res.status(404).json({err: err.message}))
}
exports.getLast = (req,res)=>{
    let limit = +req.query.number //Penser a le convertir en nombre
    articleSchema.find({online: true}).sort({date: -1}).limit(limit)
        .then(articles => res.status(200).json(articles) )
        .catch(err =>res.status(404).json({err: err.message}))
}