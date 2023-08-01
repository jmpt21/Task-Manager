const mongoose = require('mongoose')
const { Schema } = require('mongoose')
let taskSchema = mongoose.Schema

taskSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The field \'title\' is required.']
  },
  date: {
    type: Date,
    default: Date.now
  },
  state: {
    type: [{
      type: String, enum: ['Ahead', 'In progress', 'Done']
    }],
    default: ['Ahead']
  }
})

module.exports = mongoose.model('task', taskSchema)
