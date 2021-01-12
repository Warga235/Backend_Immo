const express = require('express')
const router = express.Router()
//-------------------------Routes -----------------------------------------
const adminArticles = require('../controllers/admin/cont_admin_articles')
const adminImmo = require('../controllers/admin/cont_admin_immo')
const adminUsers = require('../controllers/admin/cont_users')
const agenceCtrl = require('../controllers/cont_agence')

//---------------MiddleWare----------------------
const isAdmin = require('../middlewares/isAdmin')
const newOrUpdateImmo = require('../middlewares/gestionFichierAdmin/newOrUpdateImmo')
const newOrUpdateArticles = require('../middlewares/gestionFichierAdmin/newOrUpdateArticles')
const multer3 = require('../middlewares/gestionFichierAdmin/multer3')

// -------------------------------------Routes---------------------------------------------

//Publication D'articles
router.get('/articles/getAll',isAdmin,adminArticles.getAllArticle)
router.post('/articles/publish',isAdmin,newOrUpdateArticles('articles'),multer3(),adminArticles.publishArticle)
router.put('/articles/update/:id',isAdmin,newOrUpdateArticles('articles'),multer3(),adminArticles.updateArticle)
router.delete('/articles/delete/:id',isAdmin,adminArticles.deleteArticle)

//Publication de logement
router.post('/immo/getByFilter',isAdmin,adminImmo.by_filter)
router.get('/immo/getAll',isAdmin,adminImmo.get_all)
router.delete('/immo/delete/:id',isAdmin,adminImmo.deleteImmo)
router.post('/immo/newImmo',isAdmin,newOrUpdateImmo,multer3('immobilier'),adminImmo.newImmo)
router.put('/immo/update/:id',newOrUpdateImmo,multer3('immobilier'),adminImmo.update)

//Utilisateurs
router.get('/users/getAll',isAdmin,adminUsers.get_all)
router.delete('/users/delete/:id',isAdmin,adminUsers.delete_one)

//Agence
router.put('/agence/update',isAdmin,agenceCtrl.modifyAgence)

module.exports = router

