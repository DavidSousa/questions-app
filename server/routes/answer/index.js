const mongoose = require('mongoose');

const Answer = require('../../models/answer');

exports.getQuestionAnswers = (req, res) => {
  const questionId = mongoose.Types.ObjectId(req.params.questionId.trim());

  Answer.find({ question: questionId })
    .exec((err, answers) => {
      if (err) {
        res.send(err);
      }
      res.json(answers);
    });
};

exports.createAnswer = (req, res) => {
  const answer = new Answer();
  answer.answer = req.body.answer;
  answer.question = req.body.questionId;

  answer.save((err) => {
    if (err) {
      res.send(err);
    }
    res.json(answer);
  });
};

exports.updateAnswerAddVote = (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id.trim());

  Answer.findByIdAndUpdate(id, { $inc: { votes: 1 } })
    .exec((err, answer) => {
      if (err) {
        res.send(err);
      }
      res.json(answer);
    });
};

exports.getAnswer = (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.answerId.trim());

  Answer.findById(id)
    .exec((err, answer) => {
      if (err) {
        res.send(err);
      }
      res.json(answer);
    });
};
