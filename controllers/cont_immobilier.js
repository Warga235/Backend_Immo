const filtrator2000 = require('../middlewares/filtrator2000')
const immobilierDB = require('../models/immobilier_model')

exports.get_all= (req,res)=>{
    immobilierDB.find()
        .then(immobilier => res.status(200).json(immobilier) )
        .catch(err =>res.status(404).json({err: err.message}))
}

exports.post_filter = (req,res)=>{
    let filter = new filtrator2000(req.body)
    immobilierDB.find().and(filter.finalArray)
        .then(immobilier => {
            res.status(200).json(immobilier)} )
        .catch(err =>res.status(404).json({err: err.message}))
}

exports.get_last = (req,res)=>{
    immobilierDB.find().sort({date: -1}).limit(+req.params.quantity)
        .then(immobiliers => {
            res.status(200).json(immobiliers)} )
        .catch(err =>res.status(404).json({err: err.message}))
}

exports.distinct = (req,res)=>{
    let filter = {}
    filter[req.body.name] =  new RegExp('^'+req.body.value,'i')
    immobilierDB.find(filter).distinct(req.body.name)
        .then(immobiliers => {
            res.status(200).json(immobiliers)} )
        .catch(err =>res.status(404).json({err: err.message}))
}


exports.numberResults = (req,res)=>{
    let filter = new filtrator2000(req.body)
    let recherche = {'$and' : filter.finalArray}
    immobilierDB.aggregate([
        {$match : recherche},
        {$group : {_id : null,total : {$sum : 1}}}
    ])
        .then(number => {
            res.status(200).json(number)
        })
        .catch(err =>res.status(404).json({err: err.message}))
}

exports.get_one = (req,res)=> {
    immobilierDB.findOne({reference: req.params.id})
        .then(logement => {
            res.status(200).json(logement)
        } )
        .catch(err =>res.status(404).json({err: err.message}))
}