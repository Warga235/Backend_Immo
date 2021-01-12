const express = require('express')
const router = express.Router()
const articleCtrl = require('../controllers/cont_articles')

//Recuperation des articles
router.get('/getOne/:id',articleCtrl.getOneArticle)
router.get('/getAll',articleCtrl.getAll)
router.get('/getByCategories/:id',articleCtrl.getByCategories)
router.get('/getLast',articleCtrl.getLast)

router.get('/test',articleCtrl.test)

module.exports = router
