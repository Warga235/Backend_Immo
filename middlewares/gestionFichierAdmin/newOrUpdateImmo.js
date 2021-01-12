
const fs = require('fs')

module.exports = (req,res,next)=>{
    try {
        if(req.originalUrl.includes('admin/immo/update')){
            console.log('Update Immo')
            const path = 'public/semantic/immobilier/'
            let regex = new RegExp(req.params.id)
            fs.readdirSync(path)
                .filter(f => regex.test(f)
                )
                .map(f => fs.unlinkSync(path + f)
                )
            req.imageRef = req.params.id
        } else{
            console.log('Nouveau Immo')
            req.imageRef = 'ref_' + Date.now() + '_'
        }
        next()
    }catch (e) {
        res.status(500).json({title : "Erreur Serveur : Probleme de gestion des fichiers", message : e.message})
    }

}