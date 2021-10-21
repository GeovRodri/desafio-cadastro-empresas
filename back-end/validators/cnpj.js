const { validCNPJ } = require('../utils');

exports.cnpjValidator = (value) => {
    console.log(value, validCNPJ(value));
    if (!validCNPJ(value)) {
        throw new Error('Invalid CNPJ');
    }
};