const Router = require('express')
const router = new Router()
const TasksController = require('../controllers/tasksController')

router.get('/', TasksController.getAll)    // получение задачек
router.post('/', TasksController.create) // добавление задачки
router.put('/:id', TasksController.update)  // обновление задачки
router.delete('/:id', TasksController.delete) // удаление задачки 

module.exports = router