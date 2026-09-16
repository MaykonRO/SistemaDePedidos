async function carregarJson() {
  try {
    const resposta = await fetch('/json/produtos.json');
    if (!resposta.ok) throw new Error('Erro ao carregar o JSON');

    const dados = await resposta.json();
    return dados; // Aqui você retorna os dados do JSON

  } catch (erro) {
    console.error('Erro:', erro);
    return []; // Retorna um array vazio se der erro
  }
}

//variavel estatica
let selecionado = "Todos";

//pega o container (div) que os filters vão entrar
const filtrosElement = document.getElementById("container-filters");
const displayCards = document.getElementById("display-cards");

async function criaFilters() {
  const categorias = await converteCategoriasJson();

  //vai criar a lista das categorias
  filtrosElement.innerHTML = categorias.map(
    categoria => `<button class="botao-categorias${categoria === selecionado ? " selecionado" : ""}" data-category="${categoria}">${categoria}</button>`
  ).join("");

  //pega todos os elementos que tem essa classe dentro do container
  filtrosElement.querySelectorAll(".botao-categorias").forEach(btn => {

    //ao receber um click o evento vai chamar novamente o cria filter e o rendergrig
    btn.addEventListener("click", () => {

      //vai selecionar o botao clicado
      selecionado = btn.dataset.category;
      criaFilters();
      criaCards();
    });
  });
}

async function criaCards() {
  const listaProdutos = await carregarJson();
  const list = selecionado === "Todos" ? listaProdutos : listaProdutos.filter(product => product.category === selecionado);

  if (!list.length) {
    gridEl.innerHTML = `<div class="empty">Nenhum produto encontrado.</div>`;
    return;
  }

  displayCards.innerHTML = list.map(product => {
    return `
          <div class="card">
            <div class="image">
              <img src="${product.img}" alt="${product.name}" loading="lazy" />
            </div>
            <div class="info">
              <p class="category">${product.category}</p>
              <p class="name">${product.name}</p>
              <div class="price-row">
                <span class="price">${converteParaMoedaBr(product.price)}</span>
              </div>
            </div>
          </div>
        `;
  }).join("");
}


async function converteCategoriasJson() {
  const recebeJson = await carregarJson();

  const listaCategorias = ["Todos", ... new Set(recebeJson.map(product => product.category))];
  return listaCategorias;
}

function converteParaMoedaBr(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

criaFilters();
criaCards();
carregarJson();
converteCategoriasJson();