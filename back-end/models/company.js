const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    nome: 'string',
    cnpj: 'string',
    razao_social: 'string',
    endereco: 'string',
    atividade_primaria: 'string'
});
exports.Company = mongoose.model('Companies', schema);