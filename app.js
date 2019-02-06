const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // allow Cross-origin resource sharing
const keys = require('./server/keys');
const postRouter = require('./server/routes/post');

const port = process.env.port || 5000;
const clientPath = path.join(__dirname, './client/public');

mongoose.connect(keys.mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(`error ${err}`));

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api/post', postRouter);
app.use(express.static(clientPath));

app.listen(port, () => {
  console.log(`Server has been started on port ${port}`);
});
