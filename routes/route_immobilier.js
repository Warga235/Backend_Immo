const express = require('express')
const router = express.Router()
const immoCtrl = require('../controllers/cont_immobilier') //Apel des Controllers

//--------Les routes---------------
router.get('/',immoCtrl.get_all)
router.post('/filter',immoCtrl.post_filter)
router.get('/findOne/:id',immoCtrl.get_one)

router.post('/numberResults',immoCtrl.numberResults)
router.get('/getLast/:quantity',immoCtrl.get_last)
router.post('/getDistinct',immoCtrl.distinct)



module.exports = router
