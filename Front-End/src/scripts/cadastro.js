document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("form-produto");
    const mensagem = document.getElementById("mensagem");

    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const descricao = document.getElementById("descricao").value.trim();
        const preco = Number(document.getElementById("preco").value);
        const categoria = document.getElementById("categoria").value.trim();
        const imagem = document.getElementById("imagem").value.trim();

        if (!nome || !descricao || !categoria || preco <= 0) {
            mensagem.textContent =
                "Preencha todos os campos corretamente.";
            return;
        }

        const produto = {
            nome,
            descricao,
            preco,
            categoria,
            imagem,
            disponivel: true
        };

        try {

            await cadastrarProduto(produto);

            mensagem.textContent =
                "Produto cadastrado com sucesso!";

            form.reset();

            setTimeout(() => {
                window.location.href = "index.html";
            }, 1500);

        } catch (erro) {

            mensagem.textContent =
                "Erro ao cadastrar produto.";

            console.error(erro);
        }

    });

});