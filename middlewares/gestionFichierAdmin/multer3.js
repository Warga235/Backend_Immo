const multer = require('multer')
const fs = require('fs')
const MINE_TYPE = {
    'image/jpg' : '.jpg',
    'image/jpeg' : '.jpg',
    'image/png' : '.png'
}

/**
 * @(path : Chemin du dossier dans lequel l'image sera enregistrée)
 */

module.exports = (path = null)=>{
    const storage = multer.diskStorage({
        destination: (req,file,callback)=>{
            let destination = req.folderPath ? req.folderPath : 'public/semantic/'+ path // req.folderPath --> Pour les Articles ET  'public/semantic/'+ path --> Pour l'immobilier
            callback(null, destination )
        },
        filename : (req,file,callback)=>{
            const name = file.originalname.split(' ').join('_')
            const extension = MINE_TYPE[file.mimetype]
            callback(null, name + req['imageRef'] + Date.now() + extension)
        }
    })
    return  multer({storage: storage}).fields([{name :'img'},  {name: 'imgs'}, ])
}
