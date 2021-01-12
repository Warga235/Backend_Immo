var express=require('express');
const bodyparser =require('body-parser')
const cookieparser=require('cookie-parser')
const mongoose =require('mongoose');


//------------Connexion DB MongoDB------------------------
const {MONGO_URL}=require('./config');


const app = express()

app.use(express.json());

//------- Require Router ---------------
const routeImmo = require('./routes/route_immobilier')
const routeAdmin = require('./routes/route_admin')
const routeAuth = require('./routes/route_auth')
const routeAgence = require('./routes/route_agence')
const routeArticle = require('./routes/route_articles')

//-------------------MiddleWare CORS ------------------------------------------
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


//-------------------Les Routes ------------------------------------------
let router = express.Router()
app.use('/api1',router)
router.use('/assets',express.static('public'))
router.use('/immobilier',routeImmo)
router.use('/admin',routeAdmin)
router.use('/authentification',routeAuth)
router.use('/agence',routeAgence)
router.use('/articles',routeArticle)


//-------------------Les MidleWare ------------------------------------------
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.use(cookieparser())

mongoose.connect(MONGO_URL, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
    .then(()=>console.log('Ma base MongDB est connecté et écoute sur : ', MONGO_URL))
    .catch(err=>console.log('Il y a  une  erreur de base de données !!',MONGO_URL));

app.get('/', (req, res )=>{
    res.send('Vous êtes connecté à la base de données');
})
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>console.log('le serveur  marche sur le port' ,PORT));