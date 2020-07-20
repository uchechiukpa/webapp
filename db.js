'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TaskSchema = new Schema({
   Firstname: {
    type: String,
    // required: 'Kindly enter the name of the task'
  },
  Lastname: {
    type: String,
    // default: Date.now
  },
  Email: {
    type: String,
    // default: Date.now
  },
  
});

module.exports = mongoose.model('Tasks', TaskSchema);