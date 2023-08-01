const express = require('express')
const router = express.Router()
const taskController = require('../controllers/task-controller')

const routesCR = '/api/task'
const routesUD = '/api/task/:taskId'

router
  .get(routesCR, taskController.listAllTasks)
  .post(routesCR, taskController.createTask)

router
  .get(routesUD, taskController.readTask)
  .put(routesUD, taskController.updateTask)
  .delete(routesUD, taskController.deleteTask)

module.exports = router
