const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  question: String,
  date_created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Question', QuestionSchema);
