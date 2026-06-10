const formulario = document.getElementById("formulario-prato");

formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    const dados = new FormData(formulario);

    try {
        const resposta = await fetch(
            "http://localhost:3000/produto",
            {
                method: "POST",
                body: dados
            }
        );

        const resultado = await resposta.json();

        console.log(resultado);

    } catch (erro) {
        console.error(erro);
    }
});

async function carregarCardapio() {
    const resposta = await fetch(
        "http://localhost:3000/produtos"
    );

    const produtos = await resposta.json();

    const container = document.getElementById("cardapio");

    container.innerHTML = "";

    produtos.forEach(produto => {
        container.innerHTML += `
            <div class="card">
                <img src="http://localhost:3000/uploads/${produto.imagem}">
                <h3>${produto.nome}</h3>
                <p>${produto.descricao}</p>
                <p>R$ ${produto.preco}</p>
            </div>
        `;
    });
}