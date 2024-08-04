const {TaskTrash, Task} = require('../models/models')

class TaskTrashesController {
    async getAll(req, res){
        const getAllTaskTrash = await TaskTrash.findAll()
        return res.json(getAllTaskTrash)
    }
    async create(req, res){
        const {text, rating, userId, id} = req.body
        await Task.create({text, rating, userId})
        await TaskTrash.destroy({where: {id}})
        res.status(200).json({message: 'Задача успешно вернулась из корзины'}) 
    }
    async update(req, res){
        const {id} = req.params
        const {text, rating} = req.body
        await TaskTrash.update({text, rating}, {where: {id}}) 
        res.status(200).json({message: 'Задача успешно изменена'})
    }
    async delete(req, res){
        const {id} = req.params
        await TaskTrash.destroy({where: {id}})
        res.status(200).json({message: "Задача успешно удалена"})
    }
}

module.exports = new TaskTrashesController()