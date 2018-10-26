import axios from 'axios';

export async function getQuestion (id) {
  return await axios.get(`/api/question/${id}`);
};

export async function getQuestions () {
  return await axios.get('/api/questions');
}

export async function getAnswer (id) {
  return await axios.get(`/api/answer/${id}`);
}

export async function addVote (id) {
  return await axios.put(`/api/answer/${id}`);
}

export function createQuestion(question, answers, history) {

  axios.post('/api/question', { question })
    .then((response) => {
      const questionId = response.data._id;
      let promises = [];
      answers.forEach((answer) => {
        if(answer !== '') {
          promises.push (
            createAnswer(answer, questionId)
          )
        }
      });
      console.log(promises);
      Promise.all(promises).then(() =>
        history.push(`/${questionId}`)
      );
    })
    .catch((error) => {
      console.error(error);
    });
}

async function createAnswer(answer, questionId) {
  return await axios.post('/api/answer', { answer, questionId });
}

export function createQuestionWithAnswers(question, answers, history) {
  axios.post('/api/questionWithAnswers', { question, answers })
    .then((response) => {
      const questionId = response.data._id;
      history.push(`/${questionId}`)
    })
    .catch((error) => {
      console.error(error);
    });
}
