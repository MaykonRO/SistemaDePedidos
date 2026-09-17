const btnVoltar = document.getElementById('btnVoltar');
const btnContinuar = document.getElementById('btnContinuar');

function botoes() {
    btnContinuar.addEventListener('click', (e) => {
        e.preventDefault();

        // Pega o data-url do botão específico que foi clicado
        const destino = btnContinuar.dataset.url;

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

botoes();