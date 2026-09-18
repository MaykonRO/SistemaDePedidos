// 1. Captura do botão e de todos os checkboxes pelo atributo 'name'
const checkboxesPagamento = document.querySelectorAll('input[name="pagamento"]');
const btnVoltar = document.getElementById('btnVoltar');
const btnContinuar = document.getElementById('btnContinuar');
const toastAlerta = document.getElementById('toast-alerta');

function botoes() {
  btnContinuar.addEventListener('click', (e) => {
    e.preventDefault();

    // Pega o data-url do botão específico que foi clicado
    const destino = btnContinuar.dataset.url;

    try {
      capturaCheckBox()
    } catch (error) {
      console.log(error)
      return;
    }

    if (destino) {
      window.location.href = destino;
    }
  });

  btnVoltar.addEventListener('click', (e) => {
    e.preventDefault();

    // Pega o data-url do botão específico que foi clicado
    const destino = btnVoltar.dataset.url;

    if (destino) {
      window.location.href = destino;
    }
  });

}

function capturaCheckBox() {
  // Filtra apenas os checkboxes que estão marcados e mapeia para pegar seus valores
  const formasSelecionadas = Array.from(checkboxesPagamento)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);

  // Exemplo de uso dos dados capturados
  if (formasSelecionadas.length === 0) {
    mostrarAlerta('Por favor, selecione ao menos uma forma de pagamento!');
    throw new Error("Nenhuma forma de pagamento selecionada");

  } else {
    console.log('Formas de pagamento escolhidas:', formasSelecionadas);
  }
}

// Função reutilizável para exibir o alerta visual temporário
function mostrarAlerta(mensagem) {
  toastAlerta.textContent = mensagem;
  toastAlerta.classList.remove('oculto');
  toastAlerta.classList.add('visivel');

  // Some sozinho após 3 segundos (3000 milissegundos)
  setTimeout(() => {
    toastAlerta.classList.remove('visivel');
    toastAlerta.classList.add('oculto');
  }, 3000);
}

botoes();