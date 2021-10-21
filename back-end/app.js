const express = require('express');
const logger = require('morgan');
const { ValidationError } = require('express-validation');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
const mongoose = require('mongoose');
const cors = require('cors');

const CompaniesRouter = require('./routes/companies');
const CnpjRouter = require('./routes/cnpj');

const app = express();

app.use(cors({ origin: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
mongoose.connect('mongodb+srv://admin:admin@cluster0.uybux.mongodb.net/desafio?retryWrites=true&w=majority');

app.use('/companies', CompaniesRouter);
app.use('/cnpj', CnpjRouter);
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
