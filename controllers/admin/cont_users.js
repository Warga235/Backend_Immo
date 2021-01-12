const userDB = require('../../models/user_model')

exports.get_all = (req,res)=>{
    userDB.find()
        .then(users=> res.status(200).json(users))
        .catch(err =>res.status(404).json({err: err.message}))
}

exports.delete_one= (req,res)=>{
    userDB.deleteOne({ _id:req.params.id,isAdmin : false })
        .then( ()=> res.status(200).json({success: {message : "L'utilisateur à été supprimé avec succès"}}))
        .catch((error)=> res.status(500).json({title : 'Probleme lors de la suppression',message : error.message}))
}