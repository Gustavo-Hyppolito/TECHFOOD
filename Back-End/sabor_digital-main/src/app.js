const express = require('express');
const cors = require('cors');
const path = require('path');

const routes = require('./routes');

const app = express();

app.use(cors());

app.use(express.json());

app.use(
    '/uploads',
    express.static(
        path.resolve('uploads')
    )
);

app.use('/', routes);

module.exports = app;