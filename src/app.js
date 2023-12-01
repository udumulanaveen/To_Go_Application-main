const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path')
const router = express.Router();
require('dotenv').config({ path: '.env' });
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan('tiny'));
app.use('/',router)


app.use('/api', require('./routes/public'), require('./routes/apis'));
app.use('/api/auth', require('./routes/auth'));


module.exports = app;
