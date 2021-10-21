const { validCNPJ } = require('../utils');

exports.cnpjValidator = (value) => {
    if (!validCNPJ(value)) {
        throw new Error('Invalid CNPJ');
    }
};