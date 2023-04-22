const express = require('express')
const router = express.Router()
const {
  getAllTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
  getAllSortedTasks,
} = require('../controllers/controller')

router.route('/').get(getAllTasks).post(createTask)

router.route('/sort').get(getAllSortedTasks)
router.route('/:id').get(getTask).delete(deleteTask).put(updateTask)

module.exports = router
