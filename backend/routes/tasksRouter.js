const Router = require('express')
const router = new Router()
const TasksController = require('../controllers/tasksController')

router.get('/', TasksController.getAll)    // получение задачек
router.post('/', TasksController.create) // добавление задачки
router.put('/', TasksController.update)  // обновление задачки
router.delete('/', TasksController.delete) // удаление задачки 

module.exports = router