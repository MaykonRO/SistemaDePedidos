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


async function formataCelular() {
    // 1. Seleciona o input do celular pelo ID
    const inputCelular = document.getElementById('celular');

    // 2. Fica escutando cada tecla digitada
    inputCelular.addEventListener('input', (e) => {
        // Remove tudo o que não for número
        let valor = e.target.value.replace(/\D/g, '');

        // Limita o tamanho máximo para 11 dígitos (DDD + 9 números do celular)
        if (valor.length > 11) {
            valor = valor.slice(0, 11);
        }

        // Aplica a formatação passo a passo conforme o tamanho cresce
        if (valor.length > 7) {
            valor = valor.replace(/^(\d{2})(\d{5})(\d+).*/, '($1) $2-$3');
        } else if (valor.length > 2) {
            // Formato intermediário 
            valor = valor.replace(/^(\d{2})(\d+)/, '($1) $2');
        } else if (valor.length > 0) {
            // Formato inicial apenas com o DDD: (11
            valor = valor.replace(/^(\d*)/, '($1');
        }

        // Devolve o valor formatado para o input
        e.target.value = valor;
    });
}

formataCelular();
botoes();