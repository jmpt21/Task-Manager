const Task = require('../models/task-model.js')

exports.listAllTasks = async (req, res) => {
  await Task.find({})
    .then(task => res.json(task))
    .catch(err => {
      res.send(err.name)
    })
  //res.send('List of task.')
}

exports.createTask = async (req, res) => {
  await Task(req.body).save()
  //await newTask.save()
    .then(task => {
      res.json(task)
    })
    .catch(err => {
      res.send(`${err.name}: ${err.errors.name}`)
    })
  //res.send('Created task!')
}

exports.readTask = async (req, res) => {
  await Task.findById(req.params.taskId)
    .then(task => {
      res.json(task)
    })
    .catch(err => {
      res.send(err.name)
    })
  //res.send('View: Task N')
}

exports.updateTask = async (req, res) => {
  await Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true})
    .then(task => {
      res.json(task)
    })
    .catch(err => {
      res.send(err.name)
    })
  //res.send('Updated task.')
}

exports.deleteTask = (req, res) => {
  Task.deleteOne({_id: req.params.taskId})
    .then(() => {
      res.json({message: 'Task successfully deleted.'})
    })
    .catch(err => {
      res.send(err.name)
    })
  //res.send('Deleted task!')
}
