const fs = require('fs')
const pathModule = require('path');

module.exports = (path  = null, prefixRef = 'ref') => (req,res,next)=> {
    try {
        const finalPath = 'public/semantic/' + path
        if(req.originalUrl.includes('update')){
            console.log('Update')
            const directory = 'public/semantic/articles/' + req.params.id
            fs.readdir(directory, (err, files) => {
                if (err) throw err;
                for (const file of files) {
                    fs.unlinkSync(pathModule.join(directory, file) )
                }
            });
            req.imageRef = req.params.id
        } else{
            console.log('Nouveau')
            req.imageRef = prefixRef + Date.now()
            let folder =  finalPath + '/' + req.imageRef
            fs.mkdirSync(folder, { recursive: true } )
        }
        req.folderPath = `${finalPath}/${req.imageRef}`
        next()
    }catch (e) {
        res.status(500).json({title : "Erreur Serveur : Probleme de gestion des fichiers", message : e | e.message})
    }

}