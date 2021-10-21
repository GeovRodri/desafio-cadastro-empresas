const axios = require('axios').default;

const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
    // #swagger.description = 'Endpoint para consultar CNPJ na receita'
    // #swagger.produces = ['application/json']
    // #swagger.consumes = ['application/json']
    /* #swagger.parameters['cnpj'] = {
            in: 'query',
            description: 'CNPJ',
            required: true
        }
    */

    const cnpj = req.query.cnpj;
    const result = await axios.get(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`, {
        headers: {
            Authorization: 'Bearer ade978619cc60ce2c1b30e35039727d0823c2a0c0b3cf38ac949ed7d87b5c3fe'
        }
    });
    
    if (result.status !== 200 || result.data.status === 'ERROR') {
        return res.sendStatus(500);
    }

    return res.send({
        nome: result.data.nome,
        cnpj: cnpj,
        razao_social: result.data.fantasia,
        endereco: `${result.data.logradouro}, ${result.data.numero} ${result.data.bairro} ${result.data.municipio} - ${result.data.uf}, ${result.data.cep}`,
        atividade_primaria: result.data.atividade_principal[0].text
    });
});

module.exports = router;
