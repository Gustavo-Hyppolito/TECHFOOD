const pool =
require('../config/database');

class ProdutoService {

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
}

module.exports =
new ProdutoService();