const Router = require('express')
const router = new Router()
const tasksRouter = require('./tasksRouter')
const taskTrashesRouter = require('./taskTrashesRouter')
const usersRouter = require('./usersRouter')

router.use('/user', usersRouter)
router.use('/task', tasksRouter)
router.use('/taskTrash', taskTrashesRouter)

module.exports = router