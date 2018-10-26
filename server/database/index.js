const mongoose = require('mongoose');

const user = process.env.DB_USER;
const pass = process.env.DB_PASS;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const name = process.env.DB_NAME;

const dbUri = `mongodb://${encodeURIComponent(user)}:${encodeURIComponent(pass)}@${host}:${port}/${name}`;
console.log(dbUri);
mongoose.connect(dbUri, { useNewUrlParser: true });
mongoose.connection.on('error', (err) => {
  if (err) {
    console.log(err);
  }
});

module.exports = mongoose;
