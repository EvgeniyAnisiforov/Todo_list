const {Task, TaskTrash} = require('../models/models')

class TasksController {
    async getAll(req, res){
        const getAllTask = await Task.findAll()
        return res.json(getAllTask)
    }
    async create(req, res){
        const {text, rating, userId} = req.body
        await Task.create({text, rating, userId})
        return res.status(200).json({message: 'Задача успешно добавлена'})
    }
    async update(req, res){
        const {id} = req.params
        const {text, rating, userId} = req.body
        await Task.update({text, rating, userId}, {where:{id}})
        return res.status(200).json({ message: 'Задача успешно изменена' });
    }
    async delete(req, res){
        const {id} = req.params
        const task = await Task.findByPk(id)
        await TaskTrash.create({text: task.text, rating: task.rating, userId: task.userId})
        await Task.destroy({where: {id}})
        return res.status(200).json({ message: 'Задача успешно удалена' });
    }
}

module.exports = new TasksController()