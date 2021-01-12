const filtrator2000admin = require('./filtrator2000admin')
const immobilierDB = require('../../models/immobilier_model')
const fs = require('fs')


exports.newImmo = (req,res)=>{
    let photos = []
    if(req.files.imgs){
        req.files.imgs.forEach((elem)=>{
            photos.push(`/api1/assets/semantic/immobilier/${elem.filename}`)
        })
    }
    let immo = new immobilierDB({
        ...req.body,
        banniere : `/api1/assets/semantic/immobilier/${req.files.img[0].filename}`,
        address : {...req.body},
        reference : req.imageRef,
        photos : photos
    })
    immo.save()
        .then(()=>{
            console.log("SUCCES : AJOUT EFFECTUER AVEC SUCCES")
            res.status(201).json({success :{message : "Le logement à bien été enregistré"}})
        })
        .catch((error)=>{
            console.log("ERREUR : ", error)
            res.status(500).json({title : "Erreur : Enregistrement impossible",message : error.message})
        })
}

exports.update = (req,res)=>{
    let photos = []
    if(req.files.imgs){
        req.files.imgs.forEach((elem)=>{
            photos.push(`/api1/assets/semantic/immobilier/${elem.filename}`)
        })
    }
    immobilierDB.updateOne({reference : req.params.id}, {
        ...req.body,
        banniere : `/api1/assets/semantic/immobilier/${req.files.img[0].filename}`,
        address : {...req.body},
        photos : photos
    })
    .then(()=>{res.status(201).json({success :{message : "Le logement à bien été mis à jour"}})})
    .catch((error)=>{res.status(500).json({title : "Erreur : Mise à jour impossible",message : error.message})})
}


exports.get_all= (req,res)=>{
    immobilierDB.find()
        .then(immobilier => res.status(200).json(immobilier) )
        .catch(err =>res.status(404).json({err: err.message}))
}

exports.by_filter = (req,res)=> {
    let filter = new filtrator2000admin(req.body)

    immobilierDB.find().and(filter.finalArray)
        .then(immobilier => {
            res.status(200).json(immobilier)} )
        .catch(err =>res.status(500).json({title : "Erreur lors du filtrage",message: err.message}))
}

exports.deleteImmo = (req,res)=>{
    immobilierDB.deleteOne({ reference:req.params.id})
        .then( ()=> {
            const path = 'public/semantic/immobilier/'
            let regex = new RegExp(req.params.id)
            fs.readdirSync(path)
                .filter(f => regex.test(f)
                )
                .map(f => fs.unlinkSync(path + f)
                )
            res.status(200).json({success: {message : "Le logement à été supprimé avec succès"}})
        } )
        .catch((error)=> res.status(401).json({title : 'Erreur : La suppresion à échouée ',message : error.message}))
}