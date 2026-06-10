const ProdutoService =
require('../services/ProdutoService');

class ProdutoController {

    async listar(req, res) {

        try {

            const resultado =
                await ProdutoService.listarProdutos();

            res.json(resultado);

        } catch (erro) {

            res.status(500).json({
                sucesso: false,
                mensagem: erro.message
            });
        }
    }

    async buscarPorId(req, res) {

        try {

            const resultado =
                await ProdutoService.buscarProdutoPorId(
                    req.params.id
                );

            res.json(resultado);

        } catch (erro) {

            res.status(500).json({
                sucesso: false,
                mensagem: erro.message
            });
        }
    }

    async cadastrar(req, res) {
        try {
            const dadosProduto = {...req.body, imagem: req.file ? req.file.filename : null};
            const resultado = await ProdutoService.cadastrarProduto(dadosProduto);
            res.status(201).json(resultado);
        } catch (erro) {
            res.status(500).json({
                sucesso: false,
                mensagem: erro.message
            });
        }
    }

    async atualizar(req, res) {
        try {
            const dadosProduto = {...req.body};
            if (req.file) {
                dadosProduto.imagem =
                    req.file.filename;
            }
            const resultado = await ProdutoService.atualizarProduto(req.params.id, dadosProduto);
            res.json(resultado);
        } catch (erro) {
            res.status(500).json({
                sucesso: false,
                mensagem: erro.message
            });
        }
    }

    async deletar(req, res) {

        try {

            const resultado =
                await ProdutoService.deletarProduto(
                    req.params.id
                );

            res.json(resultado);

        } catch (erro) {

            res.status(500).json({
                sucesso: false,
                mensagem: erro.message
            });
        }
    }
}

module.exports =
new ProdutoController();