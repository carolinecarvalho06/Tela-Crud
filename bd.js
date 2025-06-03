function inicializar() {
  if (!localStorage.getItem("tds")) {
    const dados = [
      { id: 1, nome: "will", senha: "123" },
      { id: 2, nome: "bob", senha: "2222" },
      { id: 3, nome: "ringo", senha: "3333" }
    ];
    localStorage.setItem("tds", JSON.stringify(dados));
  }
}

function logon() {
  const dados = JSON.parse(localStorage.getItem("tds")) || [];
  const login = document.querySelector("#login").value;
  const senha = document.querySelector("#senha").value;

  for (const usuario of dados) {
    if (usuario && login === usuario.nome && senha === usuario.senha) {
      sessionStorage.setItem("user", JSON.stringify(usuario));
      location.href = "airline.html";
      return;
    }
  }

  alert("Login ou senha incorretos.");
}

function logado() {
  const dados = JSON.parse(sessionStorage.getItem("user"));
  if (dados) {
    document.getElementById("nome").innerHTML = "Bem vindo " + dados.nome;
    return dados.nome;
  }
}

function logaout() {
  sessionStorage.removeItem("user");
  location.href = "localStorage.html";
}

function adicionar() {
    let dados = JSON.parse(localStorage.getItem("tds")) || [];
    let id = parseInt(document.querySelector("#id").value);
    let login = document.querySelector("#login").value;
    let senha = document.querySelector("#senha").value;

    if (!id || !login || !senha) {
        alert("Preencha todos os campos!");
        return;
    }

    let user = {
        id: id,
        nome: login,
        senha: senha
    };

  dados.push(user);
  localStorage.setItem("tds", JSON.stringify(dados));
  alert("Registro adicionado.");
  limpar();
  tabela();
}

function buscar() {
  const dados = JSON.parse(localStorage.getItem("tds")) || [];
  const login = document.querySelector("#buscarInput").value.trim();

  for (const usuario of dados) {
    if (usuario && login === usuario.nome) {
      document.querySelector("#id").value = usuario.id;
      document.querySelector("#login").value = usuario.nome;
      document.querySelector("#senha").value = usuario.senha;
      return;
    }
  }

  alert("Usuário não encontrado.");
}

function tabela() {
  const dados = JSON.parse(localStorage.getItem("tds")) || [];
  const tbody = document.getElementById("tabelaCorpo");
  if (!tbody) return;

  tbody.innerHTML = "";
  dados.forEach(d => {
    if (d) {
      tbody.innerHTML += `
        <tr>
          <td>${d.id}</td>
          <td>${d.nome}</td>
          <td>${d.senha}</td>
        </tr>
      `;
    }
  });
}

function atualizar() {
  const dados = JSON.parse(localStorage.getItem("tds")) || [];
  const id = parseInt(document.querySelector("#id").value);
  const login = document.querySelector("#login").value.trim();
  const senha = document.querySelector("#senha").value;

  if (!id || !login || !senha) {
    alert("Preencha todos os campos!");
    return;
  }

  for (let i = 0; i < dados.length; i++) {
    if (dados[i] && dados[i].id === id) {
      dados[i].nome = login;
      dados[i].senha = senha;
      localStorage.setItem("tds", JSON.stringify(dados));
      alert("Atualizado!");
      limpar();
      tabela();
      return;
    }
  }

  alert("ID não encontrado.");
}

function apagarItemVetor() {
  const id = parseInt(document.querySelector("#id").value);
  const login = document.querySelector("#login").value.trim();
  const dados = JSON.parse(localStorage.getItem("tds")) || [];

  const novoArray = dados.filter(d => !(d && d.id === id && d.nome === login));
  localStorage.setItem("tds", JSON.stringify(novoArray));
  alert("Registro apagado.");
  limpar();
  tabela();
}

function apagaTudo() {
  localStorage.removeItem("tds");
  alert("Todos os registros foram apagados.");
  tabela();
}

function limpar() {
  document.querySelector("#id").value = "";
  document.querySelector("#login").value = "";
  document.querySelector("#senha").value = "";
}

window.onload = function () {
  inicializar();
  tabela();
}
