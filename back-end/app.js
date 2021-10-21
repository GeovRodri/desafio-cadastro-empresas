const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { ValidationError } = require('express-validation');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
const mongoose = require('mongoose');

const CompaniesRouter = require('./routes/companies');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
mongoose.connect('mongodb+srv://admin:admin@cluster0.uybux.mongodb.net/desafio?retryWrites=true&w=majority');

app.use('/companies', CompaniesRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(function(err, req, res, next) {
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err)
    }

    return res.status(err.statusCode).json(err);
});

app.listen(3000, () => {
    console.log('Server is listening on PORT 3000...');
});
