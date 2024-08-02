const Router = require('express')
const router = new Router()
const usersController = require('../controllers/usersController')

router.post('/registration', usersController.registration)
router.post('/login', usersController.login)
router.get('/auth', usersController.check)

module.exports = router
