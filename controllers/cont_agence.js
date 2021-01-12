const agenceSchema = require ('../models/agence_model')

exports.getAgence = (req,res)=>{
    agenceSchema.findOne({_id : "5ebbf5000647f52fb4ce3ce1"})
        .then(agence => res.status(200).json(agence) )
        .catch(err =>res.status(404).json({err: err.message}))
}


exports.modifyAgence = (req,res)=>{ //For Admins
    agenceSchema.updateMany({},{
        ...req.body,
        gerant :{...req.body},
        address : {...req.body},
    })
        .then(() => res.status(200).json({success :{message : "L'agence à bien été modifiée"}}))
        .catch(err =>res.status(404).json({err: err.message}))
}