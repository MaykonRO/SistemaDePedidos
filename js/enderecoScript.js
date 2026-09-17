const inputRua = document.getElementById('rua');
const inputNumero = document.getElementById('numero');
const inputComplemento = document.getElementById('complemento');
const inputBairro = document.getElementById('bairro');
const inputCidade = document.getElementById('cidade');
const btnVoltar = document.getElementById('btnVoltar');
const btnContinuar = document.getElementById('btnContinuar');

async function mascaraCep() {
    const inputCep = document.getElementById('cep');

    // 2. Fica escutando cada tecla que o usuário digita (evento 'input')
    inputCep.addEventListener('input', (cep) => {
        // Pega o valor atual do input e remove tudo o que não for número usando RegEx
        let valor = cep.target.value.replace(/\D/g, '');

        // Limita o tamanho máximo para 8 números (quantidade de dígitos de um CEP)
        if (valor.length > 8) {
            valor = valor.slice(0, 8);
        }

        // Aplica a formatação do hífen se tiver mais de 5 números
        if (valor.length > 5) {
            valor = valor.replace(/^(\d{5})(\d)/, '$1-$2');
        }

        // Devolve o valor formatado de volta para o input
        cep.target.value = valor;
    });

}

function pegaCep() {
    const buttonCep = document.getElementById('buttonCep');
    buttonCep.addEventListener('click', () => {
        const cep = document.getElementById("cep").value.replace(/\D/g, '');

        if (cep.length === 8) {
            pesquisarCep(cep);
        }
    });


}

async function pesquisarCep(cep) {
    //uso a api (botar o try catch aqui ne paizao)
    try {
        const viacep = `https://viacep.com.br/ws/${cep}/json/`;

        //consulta os campos e faz a linha
        const dados = await fetch(viacep);
        const endereco = await dados.json();

        inputRua.value = endereco.logradouro;
        inputBairro.value = endereco.bairro;
        inputCidade.value = endereco.localidade;

        if (endereco.erro) {
            console.log("o cep não existe")
        }

    } catch (error) {
        console.error("[Erro]: não foi possível pesquisar o cep!")
    }

}

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
mascaraCep();
pegaCep();