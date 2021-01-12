let fs = require('fs');
module.expots = (req,res,next)=>{
    let path = '/public/semantic/articles/'+ req.params.id
    if( fs.existsSync(path) ) {
        fs.readdirSync(path).forEach((file)=> {
            let curPath = path + "/" + file;
            fs.unlinkSync(curPath);
        });
        fs.rmdirSync(path);
    }
    next()
};