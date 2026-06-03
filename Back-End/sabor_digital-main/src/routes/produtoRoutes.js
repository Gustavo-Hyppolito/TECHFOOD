const express = require('express');
const router = express.Router();
const ProdutoController = require('../controllers/ProdutoController');

router.get('/', ProdutoController.listar);
router.get('/:id', ProdutoController.buscarPorId);
router.post('/', upload.single('imagem'), ProdutoController.cadastrar);
router.put('/:id', upload.single('imagem'), ProdutoController.atualizar);
router.delete('/:id', ProdutoController.deletar);


module.exports = router;
