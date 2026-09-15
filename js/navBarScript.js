// 1. Captura todos os botões com a classe
const botoesNav = document.querySelectorAll('.botao-navegacao');

// 2. Passa por cada botão da lista individualmente
botoesNav.forEach(botao => {
  botao.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Pega o data-url do botão específico que foi clicado
    const destino = botao.dataset.url;
    
    if (destino) {
      window.location.href = destino;
    }
  });
});