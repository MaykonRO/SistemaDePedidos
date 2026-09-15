const products = [
  {
    name: "Tênis Runner Pro",
    cat: "Calçados",
    price: 289.90,
    old: 349.90,
    badge: "sale",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80"
  },
  {
    name: "Mochila Urban 20L",
    cat: "Acessórios",
    price: 159.00,
    badge: "new",
    img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80"
  },
  {
    name: "Câmera Instant Mini",
    cat: "Eletrônicos",
    price: 449.00,
    img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&q=80"
  },
  {
    name: "Relógio Clássico",
    cat: "Acessórios",
    price: 320.00,
    old: 400.00,
    badge: "sale",
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80"
  },
  {
    name: "Fone BT Studio",
    cat: "Eletrônicos",
    price: 199.90,
    badge: "new",
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80"
  },
  {
    name: "Jaqueta Windbreaker",
    cat: "Roupas",
    price: 259.00,
    img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80"
  },
  {
    name: "Garrafa Térmica",
    cat: "Acessórios",
    price: 89.90,
    img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80"
  },
  {
    name: "Óculos Polarizado",
    cat: "Acessórios",
    price: 175.00,
    old: 220.00,
    badge: "sale",
    img: "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=400&q=80"
  },
];

const cats = ["Todos", ...new Set(products.map(p => p.cat))];
let active = "Todos";

const filtersEl = document.getElementById("filters");
const gridEl = document.getElementById("grid");

function fmt(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function renderFilters() {
  filtersEl.innerHTML = cats.map(c =>
    `<button class="chip${c === active ? " active" : ""}" data-cat="${c}">${c}</button>`
  ).join("");

  filtersEl.querySelectorAll(".chip").forEach(btn => {
    btn.addEventListener("click", () => {
      active = btn.dataset.cat;
      renderFilters();
      renderGrid();
    });
  });
}

function renderGrid() {
  const list = active === "Todos" ? products : products.filter(p => p.cat === active);

  if (!list.length) {
    gridEl.innerHTML = `<div class="empty">Nenhum produto encontrado.</div>`;
    return;
  }

  gridEl.innerHTML = list.map(p => {
    const discount = p.old ? Math.round((1 - p.price / p.old) * 100) : 0;
    const badgeHtml = p.badge === "sale"
      ? `<span class="badge sale">-${discount}%</span>`
      : p.badge === "new"
        ? `<span class="badge new">Novo</span>`
        : "";

    return `
          <div class="card">
            <div class="img-wrap">
              <img src="${p.img}" alt="${p.name}" loading="lazy" />
            </div>
            <div class="info">
              <p class="cat">${p.cat}</p>
              <p class="name">${p.name}</p>
              <div class="price-row">
                <span class="price">${fmt(p.price)}</span>
                ${p.old ? `<span class="old-price">${fmt(p.old)}</span>` : ""}
                ${badgeHtml}
              </div>
            </div>
          </div>
        `;
  }).join("");
}

renderFilters();
renderGrid();
