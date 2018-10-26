const mongoose = require('mongoose');

const Question = require('../../models/question');
const Answer = require('../../models/answer');

exports.getQuestions = (req, res) => {
  Question.find()
    .exec((err, questions) => {
      if (err) {
        res.send(err);
      }
      res.json(questions);
    });
};

exports.getQuestion = (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id.trim());

  Question.findById(id).exec()
    .then((question) => {
      Answer.find({ question: id }).exec()
        .then((answers) => {
          const result = question.toJSON();
          result.answers = answers;
          res.json(result);
        });
    })
    .then(undefined, (error) => {
      res.send(error);
    });
};

exports.createQuestion = (req, res) => {
  const question = new Question();
  question.question = req.body.question;

  question.save((err) => {
    if (err) {
      res.send(err);
    }
    res.json(question);
  });
};

const createAnswer = (answer, questionId) => {
  const newAnswer = new Answer();
  newAnswer.answer = answer;
  newAnswer.question = questionId;

  newAnswer.save((err) => {
    if (err) {
      throw err;
    }
  });
};

exports.createQuestionWithAnswers = (req, res) => {
  const answers = req.body.answers;
  const question = new Question();
  question.question = req.body.question;

  question.save((err) => {
    if (err) {
      res.send(err);
    }
    try {
      answers.forEach((answer) => {
        createAnswer(answer, question._id);
      });
    } catch (e) {
      res.send(e);
    }
    res.json(question);
  });
};
