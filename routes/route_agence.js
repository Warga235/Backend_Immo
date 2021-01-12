const express = require('express')
const router = express.Router()
const agenceCtrl = require('../controllers/cont_agence')


router.get('/getAgence',agenceCtrl.getAgence)

module.exports = router
