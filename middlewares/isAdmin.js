const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{

    try{//Si la vérification du token est Ok alors on Next
        if(req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1]
            if (token) {
                const decodtoken = jwt.verify(token, 'RANDOM_TOKEN_SECRET')
                if (decodtoken['isAdmin']) {
                    return next()
                }
            }
        }
        throw "Vous n'avez pas les autorisations Admin nécéssaires"

    }catch (error){//Si la vérification du token n'est pas valide alors on renvoi une erreur
        res.status(401).json({message : error})
    }
}