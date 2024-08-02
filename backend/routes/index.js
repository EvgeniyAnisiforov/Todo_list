const Router = require('express')
const router = new Router()
const tasksRouter = require('./tasksRouter')
const taskTrashesRouter = require('./taskTrashesRouter')
const usersRouter = require('./usersRouter')

router.use('/users', usersRouter)
router.use('/tasks', tasksRouter)
router.use('/taskTrashes', taskTrashesRouter)

module.exports = router