const express = require('express')
const router = express.Router()

const cont_auth = require('../controllers/cont_auth')
const isAuth = require('../middlewares/auth')

router.post('/register',cont_auth.postRegister)
router.post('/login',cont_auth.postConnect)
router.get('/user/:id',isAuth, cont_auth.get_user )


module.exports = router
