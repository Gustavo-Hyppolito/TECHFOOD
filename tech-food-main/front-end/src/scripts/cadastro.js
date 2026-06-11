/* ==========================================================
   CADASTRO.JS — Gerenciar cadastro de pratos
   
   Responsabilidades:
   ✔ Validar campos do formulário
   ✔ Enviar dados ao back-end (POST /produtos)
   ✔ Dar feedback visual (sucesso/erro)
   ✔ Limpar o formulário após sucesso
   ========================================================== */

document.addEventListener("DOMContentLoaded", function () {
  inicializarFormularioCadastro();
});

/**
 * Inicializa o formulário de cadastro com validação e envio
 */
function inicializarFormularioCadastro() {
  const formulario = document.getElementById("formulario-prato");
  const botao = document.getElementById("btn-criar-produto");

  if (!formulario || !botao) return;

  formulario.addEventListener("submit", async function (evento) {
    evento.preventDefault();

    // Desabilita o botão para evitar duplo envio
    botao.disabled = true;
    botao.textContent = "Enviando...";

    try {
      // 1. Validar campos
      const validacao = validarCampos();
      if (!validacao.valido) {
        exibirErro(validacao.mensagem);
        return;
      }

      // 2. Preparar dados (FormData para suportar arquivo)
      const dados = new FormData(formulario);

      // 3. Enviar para o servidor
      const resposta = await cadastrarProduto(dados);

      // 4. Feedback de sucesso
      exibirSucesso("Prato cadastrado com sucesso! 🎉");
      formulario.reset();

      // 5. Redirecionar para cardápio após 1.5s
      setTimeout(function () {
        window.location.href = "index.html";
      }, 1500);
    } catch (erro) {
      exibirErro(erro.message || "Erro ao cadastrar prato. Tente novamente.");
    } finally {
      // Restaura o botão
      botao.disabled = false;
      botao.textContent = "Criar Produto";
    }
  });
}

/**
 * Valida os campos do formulário
 * @returns {Object} { valido: boolean, mensagem: string }
 */
function validarCampos() {
  const nome = document.getElementById("nome-prato")?.value.trim() || "";
  const descricao = document.getElementById("descricao-prato")?.value.trim() || "";
  const preco = document.getElementById("preco-prato")?.value.trim() || "";
  const imagem = document.getElementById("imagem")?.files?.[0];

  // Validar nome
  if (!nome) {
    return { valido: false, mensagem: "❌ Nome do prato é obrigatório." };
  }
  if (nome.length < 3) {
    return { valido: false, mensagem: "❌ Nome deve ter pelo menos 3 caracteres." };
  }

  // Validar descrição
  if (!descricao) {
    return { valido: false, mensagem: "❌ Descrição é obrigatória." };
  }
  if (descricao.length < 5) {
    return { valido: false, mensagem: "❌ Descrição deve ter pelo menos 5 caracteres." };
  }

  // Validar preço
  if (!preco) {
    return { valido: false, mensagem: "❌ Preço é obrigatório." };
  }
  const precoNum = parseFloat(preco.replace(",", "."));
  if (isNaN(precoNum) || precoNum <= 0) {
    return { valido: false, mensagem: "❌ Preço deve ser um número positivo." };
  }

  // Validar imagem (opcional — back-end pode ter padrão)
  // Se houver arquivo, validar tipo e tamanho
  if (imagem) {
    const tiposValidos = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!tiposValidos.includes(imagem.type)) {
      return {
        valido: false,
        mensagem: "❌ Arquivo deve ser uma imagem (PNG, JPG, GIF, WebP).",
      };
    }
    const maxSize = 5 * 1024 * 1024; // 5 MB
    if (imagem.size > maxSize) {
      return { valido: false, mensagem: "❌ Arquivo não pode exceder 5 MB." };
    }
  }

  return { valido: true };
}

/**
 * Envia os dados do novo prato ao servidor
 * POST /produtos — esperado pelo back-end (Aula 9)
 * @param {FormData} dados
 * @returns {Promise<Object>} resposta do servidor
 */
async function cadastrarProduto(dados) {
  const response = await fetch(`${BASE_URL}/produtos`, {
    method: "POST",
    body: dados, // FormData — servidor detecta enctype automaticamente
  });

  const resultado = await response.json();

  if (!response.ok) {
    throw new Error(resultado.erro || `Erro ${response.status}: Falha ao cadastrar.`);
  }

  return resultado;
}

/**
 * Exibe mensagem de sucesso
 * @param {string} mensagem
 */
function exibirSucesso(mensagem) {
  const div = document.createElement("div");
  div.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #27ae60;
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    font-weight: bold;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    animation: slideDown 0.3s ease;
  `;
  div.textContent = mensagem;

  document.body.appendChild(div);

  setTimeout(function () {
    div.style.animation = "slideUp 0.3s ease forwards";
    setTimeout(function () {
      div.remove();
    }, 300);
  }, 2000);
}

/**
 * Exibe mensagem de erro
 * @param {string} mensagem
 */
function exibirErro(mensagem) {
  const div = document.createElement("div");
  div.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #e74c3c;
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    font-weight: bold;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    animation: slideDown 0.3s ease;
  `;
  div.textContent = mensagem;

  document.body.appendChild(div);

  setTimeout(function () {
    div.style.animation = "slideUp 0.3s ease forwards";
    setTimeout(function () {
      div.remove();
    }, 300);
  }, 3000);
}

// ───────────────────────────────────────────────────────────────────────────
// Animações globais (inseridas no <style> dinâmico)
// ───────────────────────────────────────────────────────────────────────────
const style = document.createElement("style");
style.textContent = `
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }

  @keyframes slideUp {
    from {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
    to {
      opacity: 0;
      transform: translateX(-50%) translateY(-20px);
    }
  }
`;
document.head.appendChild(style);
