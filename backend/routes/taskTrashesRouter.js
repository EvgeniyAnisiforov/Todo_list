const Router = require('express')
const router = new Router()
const TaskTrashesController = require('../controllers/taskTrashesController')

router.get('/', TaskTrashesController.getAll)    // получение задачек
router.post('/', TaskTrashesController.create) // добавление задачки
router.put('/', TaskTrashesController.update)  // обновление задачки
router.delete('/', TaskTrashesController.delete) // удаление задачки 

module.exports = router