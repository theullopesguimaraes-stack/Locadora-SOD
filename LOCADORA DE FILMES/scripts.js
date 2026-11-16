
function ModoEscuro() {
    document.body.classList.toggle("escuro");
}

function AbrirJanela() {
    indiceEdicao = null;

    document.getElementById("formFilme").reset();

    const previewImagem = document.getElementById("previewImagem");
    previewImagem.src = "";
    previewImagem.style.display = "none";
    previewImagem.style.transform = "scale(1)";

    document.querySelector(".conteudo-modal h2").textContent = "Adicionar Filme";

    document.querySelector("#formFilme button[type='submit']").textContent =
        "Cadastrar filme";

    document.getElementById("modal").style.display = "block";
}

function FecharJanela() {
    document.getElementById("modal").style.display = "none";
}

let filmes = JSON.parse(localStorage.getItem("filmes")) || [];

let indiceEdicao = null;



function salvarFilmes() {
    localStorage.setItem("filmes", JSON.stringify(filmes));
}



function mostrarFilmes() {
    const linhas = document.querySelector(".linhas");

    document.querySelectorAll(".card-filme").forEach(card => card.remove());

    filmes.forEach((filme, index) => {
        const card = document.createElement("div");
        card.className = "card-filme";

        const imagem = document.createElement("img");

        if (filme.foto && filme.foto.startsWith("data:image/")) {
            imagem.src = filme.foto;
        } else {
            console.error("Imagem inválida:", filme.nome);
        }

        imagem.alt = filme.nome;
        imagem.style.transform = `scale(${filme.zoom || 1})`;

        const titulo = document.createElement("h3");
        titulo.textContent = filme.nome;
        const classificacao = document.createElement("p");
        classificacao.textContent = filme.classificacao;

        const editar = document.createElement("button");
        editar.textContent = "Editar";
        editar.className = "editar-filme";

        editar.onclick = function() {
            EditarFilme(index);
        };

        const remover = document.createElement("button");
        remover.textContent = "Remover";
        remover.className = "remover-filme";

        remover.onclick = function() {
            const confirmar = confirm("Deseja realmente remover este filme?");

            if (confirmar) {
                filmes.splice(index, 1);
                salvarFilmes();
                mostrarFilmes();
            }
        };

const botoes = document.createElement("div");
botoes.className = "botoes-filme";

botoes.append(editar, remover);

card.append(imagem, titulo, classificacao, botoes);
        linhas.appendChild(card);
    });
}


function EditarFilme(index) {
    const filme = filmes[index];

    indiceEdicao = index;

    document.getElementById("nomeFilme").value = filme.nome;
    document.getElementById("categoriaFilme").value = filme.categoria;
    document.getElementById("classificacaoFilme").value = filme.classificacao;
    document.getElementById("precoFilme").value = filme.preco || "";
    document.getElementById("anoFilme").value = filme.ano;
    document.getElementById("sinopseFilme").value = filme.sinopse;

    const previewImagem = document.getElementById("previewImagem");

    previewImagem.src = filme.foto;
    previewImagem.style.display = "block";

    const zoomImagem = document.getElementById("zoomImagem");

    zoomImagem.value = (filme.zoom || 1) * 100;

    previewImagem.style.transform =
        `scale(${filme.zoom || 1})`;

    document.querySelector(".conteudo-modal h2").textContent = "Editar Filme";

    document.querySelector("#formFilme button[type='submit']").textContent =
        "Salvar alterações";

    document.getElementById("modal").style.display = "block";
}
document.addEventListener("DOMContentLoaded", function() {

    mostrarFilmes();

    const fotoFilme = document.getElementById("fotoFilme");
    const previewImagem = document.getElementById("previewImagem");
    const zoomImagem = document.getElementById("zoomImagem");


    fotoFilme.addEventListener("change", function() {
        const arquivo = this.files[0];

        if (arquivo) {
            const leitor = new FileReader();

            leitor.onload = function() {
                previewImagem.src = leitor.result;
                previewImagem.style.display = "block";

                zoomImagem.value = 100;
                previewImagem.style.transform = "scale(1)";
            };

            leitor.readAsDataURL(arquivo);
        }
    });

    zoomImagem.addEventListener("input", function() {
        const zoom = Number(this.value) / 100;

        previewImagem.style.transform = `scale(${zoom})`;
    });

    document.getElementById("formFilme").addEventListener("submit", function(event) {
        event.preventDefault();

        const arquivo = fotoFilme.files[0];

        if (indiceEdicao === null && !arquivo) {
            alert("Selecione uma foto para o filme!");
            return;
        }

        function salvarDados(foto) {

            const filme = {
                nome: document.getElementById("nomeFilme").value,
                foto: foto,
                zoom: Number(zoomImagem.value) / 100,
                categoria: document.getElementById("categoriaFilme").value,
                classificacao: document.getElementById("classificacaoFilme").value,
                ano: document.getElementById("anoFilme").value,
                preco: document.getElementById("precoFilme").value,
                sinopse: document.getElementById("sinopseFilme").value
            };

            if (indiceEdicao !== null) {
                filmes[indiceEdicao] = filme;
            } else {
                filmes.push(filme);
            }

            salvarFilmes();
            mostrarFilmes();

            document.getElementById("formFilme").reset();

            previewImagem.src = "";
            previewImagem.style.display = "none";
            previewImagem.style.transform = "scale(1)";

            indiceEdicao = null;

            document.querySelector(".conteudo-modal h2").textContent =
                "Adicionar Filme";

            document.querySelector("#formFilme button[type='submit']").textContent =
                "Cadastrar filme";

            FecharJanela();
        }
        if (arquivo) {
            const leitor = new FileReader();

            leitor.onload = function() {
                salvarDados(leitor.result);
            };

            leitor.readAsDataURL(arquivo);

        } else {
            salvarDados(filmes[indiceEdicao].foto);
        }
    });

});
card.append(imagem, titulo, classificacao, editar, remover);