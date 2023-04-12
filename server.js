// Import required modules and configure environment variables
const express = require('express');
const app = express();
require('dotenv').config();
const morgan = require('morgan');
const mongoose = require('mongoose');
const { expressjwt } = require('express-jwt');
const path = require('path');

const authRouter = require('./routes/authRouter.js');
const issueRouter = require('./routes/issueRouter.js');
const commentRouter = require('./routes/commentRouter.js');

// Use middleware

app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Connect to MongoDB database

const connectDatabase = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGO_URL);

    console.log('connected to database');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDatabase();

// Define routes
app.use('/auth', authRouter);
app.use('/api/issue', issueRouter);
app.use('/api/comment', commentRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.log(err);
  if (err.name === 'UnauthorizedError') {
    res.status(err.status);
  }
  return res.send({ errMsg: err.message });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// Start server
app.listen(9000, () => {
  console.log(`Server is running on local port 9000`);
});
