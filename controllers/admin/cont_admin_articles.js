const articleSchema = require('../../models/articlesModel')
const fs = require('fs')

exports.getAllArticle = (req,res)=>{
    articleSchema.find()
        .then(articles => res.status(200).json(articles) )
        .catch(err =>res.status(404).json({err: err.message}))
}


exports.deleteArticle = (req,res)=>{
    articleSchema.deleteOne({ reference:req.params.id})
        .then( ()=> {
            let path = 'public/semantic/articles/'+ req.params.id
            if( fs.existsSync(path) ) {
                fs.readdirSync(path).forEach((file)=> {
                    let curPath = path + "/" + file;
                    fs.unlinkSync(curPath);
                });
                fs.rmdirSync(path);
            }
            res.status(200).json({success: {message : "L'article à été supprimé"}})
        } )
        .catch((error)=> res.status(401).json({title : 'Erreur lors de la suppresion',message : error.message}))
}

exports.publishArticle = (req,res)=>{
    let upload = {...req.body, reference : req.imageRef }
    if(req.files.imgs){
        let regex =  /<img src="(data:image\S+)">/
        let chaine = req.body.contenu
        let monTableau;
        for (let i = 0; (monTableau = regex.exec(chaine)) !== null ; i++) {
            let image = `/api1/assets/semantic/articles/${req.imageRef}/${req.files.imgs[i].filename}`
            chaine = chaine.replace(monTableau[1],image)
        }
        upload.contenu = chaine
    }
    if(req.files.img){
        upload.photo = `/api1/assets/semantic/articles/${req.imageRef}/${req.files.img[0].filename} `
    }
    const article = new articleSchema( upload )
    article.save()
        .then(()=> {
            let msg = req.body.online === 'true' ? 'Et à été publié' : 'Sans être publié'
            res.status(201).json({success :{title: "L'article à été créer", message : msg} })
        })
        .catch(error =>  {
            if(req.files.img){
                fs.unlink(`public/semantic/articles/${req.imageRef}/${req.files.img[0].filename}`,()=>{} )
            }else if(req.files.imgs){
                req.files.imgs.forEach(elem => {
                    fs.unlink(`public/semantic/articles/${req.imageRef}/${elem.filename}`,()=>{} )
                })
            }
            res.status(500).json({title : "Probleme lors de l'enregistrement",message : error.message})
        })
}


exports.updateArticle = (req,res)=>{
    let upload = {...req.body, reference : req.imageRef }
    if(req.files.imgs){
        let regex =  /<img src="(data:image\S+)">/
        let chaine = req.body.contenu
        let monTableau;
        for (let i = 0; (monTableau = regex.exec(chaine)) !== null ; i++) {
            let image = `/api1/assets/semantic/articles/${req.imageRef}/${req.files.imgs[i].filename}`
            chaine = chaine.replace(monTableau[1],image)
        }
        upload.contenu = chaine
    }
    if(req.files.img){
        upload.photo = `/api1/assets/semantic/articles/${req.imageRef}/${req.files.img[0].filename} `
    }
    articleSchema.updateOne({reference : req.params.id}, upload )
        .then(()=> {
            let msg = req.body.online === 'true' ? 'Disponible au publique' : 'Sans être publié'
            res.status(201).json({success: {title: "L'article à été mis à jour", message : msg}})
        })
        .catch(error =>  {
            res.status(500).json({title : "Probleme lors de l'enregistrement",message : error.message})
        })
}