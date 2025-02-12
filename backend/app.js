const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const path = require('path');
const routes = require('./routes/index');
const { ValidationError } = require('sequelize');
const { environment } = require('./config');
const isProduction = environment === 'production';
// const multer = require ('multer');

const app = express();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');  // Specify the directory where files should be stored
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));  // Rename the file
//   }
// });

// const upload = multer({ 
//   storage: storage,
//   limits: { fileSize: 50 * 1024 * 1024 }, // Set a file size limit (50MB in this case)
// }).single('file')

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
// app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Security Middleware
if (!isProduction) {
  // enable cors only in development
  app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
  })
);

// Set the _csrf token and create req.csrfToken method
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true
    }
  })
);

// app.use(express.static(path.join(__dirname, '../frontend')));

app.use(routes);

app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = { message: "The requested resource couldn't be found." };
  err.status = 404;
  next(err);
});

app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    let errors = {};
    for (let error of err.errors) {
      errors[error.path] = error.message;
    }
    err.title = 'Validation error';
    err.errors = errors;
  }
  next(err);
});

app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors || null,
    stack: isProduction ? null : err.stack
  });
});

module.exports = app;