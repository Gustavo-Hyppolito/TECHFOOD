const pool = require('../config/database');

class ProdutoService {

    async listarProdutos() {

        const sql = `
            SELECT * FROM produto
        `;

        const [produtos] = await pool.query(sql);

        return {
            sucesso: true,
            dados: produtos
        };
    }

    async buscarProdutoPorId(id) {

        const sql = `
            SELECT * FROM produto
            WHERE id = ?
        `;

        const [produtos] = await pool.query(sql, [id]);

        if (produtos.length === 0) {
            return {
                sucesso: false,
                mensagem: 'Produto não encontrado'
            };
        }

        return {
            sucesso: true,
            dados: produtos[0]
        };
    }

    async cadastrarProduto(produto) {

        const {
            nome,
            descricao,
            preco,
            categoria,
            disponivel,
            imagem
        } = produto;

        const sql = `
            INSERT INTO produto
            (
                nome,
                descricao,
                preco,
                categoria,
                disponivel,
                imagem
            )
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        const [resultado] =
            await pool.query(sql, [
                nome,
                descricao,
                preco,
                categoria,
                disponivel,
                imagem
            ]);

        return {
            sucesso: true,
            id: resultado.insertId
        };
    }

    async atualizarProduto(id, produto) {

        const {
            nome,
            descricao,
            preco,
            categoria,
            disponivel,
            imagem
        } = produto;

        const sql = `
            UPDATE produto
            SET
                nome = ?,
                descricao = ?,
                preco = ?,
                categoria = ?,
                disponivel = ?,
                imagem = ?
            WHERE id = ?
        `;

        await pool.query(sql, [
            nome,
            descricao,
            preco,
            categoria,
            disponivel,
            imagem,
            id
        ]);

        return {
            sucesso: true,
            mensagem: 'Produto atualizado'
        };
    }

    async deletarProduto(id) {

        const sql = `
            DELETE FROM produto
            WHERE id = ?
        `;

        await pool.query(sql, [id]);

        return {
            sucesso: true,
            mensagem: 'Produto removido'
        };
    }
}

module.exports = new ProdutoService();