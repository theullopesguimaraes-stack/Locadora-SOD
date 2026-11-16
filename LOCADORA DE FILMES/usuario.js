
function ModoEscuro() {
    document.body.classList.toggle("escuro");
}

function FecharDetalhes() {
    document.getElementById("modalDetalhes").style.display = "none";
}

// Carregar os filmes cadastrados pelo funcionário
function carregarCatalogo() {

    const catalogo = document.getElementById("catalogoFilmes");

    const filmes = JSON.parse(localStorage.getItem("filmes")) || [];

    catalogo.innerHTML = "";

    if (filmes.length === 0) {
        catalogo.textContent = "Nenhum filme cadastrado no momento.";
        return;
    }

    filmes.forEach(function(filme) {

        const card = document.createElement("div");
        card.className = "card-filme";

        const imagem = document.createElement("img");
        imagem.src = filme.foto;
        imagem.alt = filme.nome;

        const titulo = document.createElement("h3");
        titulo.textContent = filme.nome;

        const classificacao = document.createElement("p");
        classificacao.textContent = filme.classificacao;

        // Mantém o zoom escolhido pelo funcionário
        imagem.style.transform = `scale(${filme.zoom || 1})`;

        card.append(imagem, titulo, classificacao);

        // Abrir informações ao clicar no filme
        card.addEventListener("click", function() {
            AbrirDetalhes(filme);
        });

        catalogo.appendChild(card);

    });
}

// Mostrar informações completas do filme
function AbrirDetalhes(filme) {

    document.getElementById("detalheFoto").src = filme.foto;
    document.getElementById("detalheFoto").style.transform =
        `scale(${filme.zoom || 1})`;

    document.getElementById("detalheNome").textContent = filme.nome;
    document.getElementById("detalheCategoria").textContent = filme.categoria;
    document.getElementById("detalheClassificacao").textContent = filme.classificacao;
    document.getElementById("detalheAno").textContent = filme.ano;
    document.getElementById("detalhePreco").textContent =
    Number(filme.preco).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
    document.getElementById("detalheSinopse").textContent = filme.sinopse;

    document.getElementById("modalDetalhes").style.display = "flex";
}

document.addEventListener("DOMContentLoaded", function() {

    carregarCatalogo();

    document.getElementById("modalDetalhes").addEventListener("click", function(event) {
        if (event.target === this) {
            FecharDetalhes();
        }
    });

    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            FecharDetalhes();
        }
    });

});
