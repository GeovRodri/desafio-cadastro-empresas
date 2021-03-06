const {cnpjValidator} = require("../validators/cnpj");
const { validate, Joi } = require('express-validation');
const { Company } = require('../models/company');

const express = require('express');
const router = express.Router();

const companyValidation = {
    body: Joi.object({
        nome: Joi.string().required(),
        cnpj: Joi.string().custom(cnpjValidator).required(),
        razao_social: Joi.string().required(),
        endereco: Joi.string().required(),
        atividade_primaria: Joi.string().required()
    })
};
router.post('/', validate(companyValidation, {}, {}), async (req, res, next) => {
    // #swagger.description = 'Endpoint para cadastrar empresa'
    // #swagger.produces = ['application/json']
    // #swagger.consumes = ['application/json']
    /* #swagger.parameters['body'] = {
            in: 'body',
            description: 'Nova empresa',
            schema: {
                nome: 'Nome Fantasia',
                cnpj: '25430578000109',
                razao_social: 'Razao Social',
                endereco: 'Rua 17',
                atividade_primaria: 'Desenvolvedor'
            }
        }
    */

    const body = req.body;
    const existCnpj = await Company.where('cnpj').equals(body.cnpj).exec();
    if (existCnpj.length > 0) {
        return res.status(400).send({error: 'company-already-exists'});
    }

    const company = new Company(body);
    await company.save();

    return res.send(company);
});

router.get("/", async (req, res, next) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    const count = await Company.count().exec();
    const results = await Company.find({}, null, {sort: {nome: 1}})
        .skip(page > 0 ? ((page - 1) * limit) : 0)
        .limit(limit).exec();

    return res.json({
        "count": count,
        "pages": Math.ceil(count / limit),
        "results": results
    });
});

module.exports = router;
