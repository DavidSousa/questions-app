const express = require('express');

const questionRoute = require('./question');
const answerRoute = require('./answer');

const router = express.Router();

router.get('/question/:id', questionRoute.getQuestion);
router.get('/questions', questionRoute.getQuestions);
router.post('/question', questionRoute.createQuestion);
router.post('/questionWithAnswers', questionRoute.createQuestionWithAnswers);

router.get('/answer/:answerId', answerRoute.getAnswer);
router.get('/answers/:questionId', answerRoute.getQuestionAnswers);
router.post('/answer', answerRoute.createAnswer);
router.put('/answer/:id', answerRoute.updateAnswerAddVote);

module.exports = router;
