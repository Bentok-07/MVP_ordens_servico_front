// URL base da sua API
const API_URL = "http://localhost:5000";

// Seletores
const formOrdem = document.getElementById("form-ordem");
const numeroEquipamento = document.getElementById("numero_equipamento");
const descricaoProblema = document.getElementById("descricao_problema");
const listaOrdens = document.getElementById("lista-ordens");
const listaOrdensFechadas = document.getElementById("lista-ordens-fechadas");

const modal = document.getElementById("modal-solucao");
const closeModal = document.querySelector(".close-button");
const formSolucao = document.getElementById("form-solucao");
const descricaoSolucao = document.getElementById("descricao_solucao");
const ordemIdInput = document.getElementById("solucao_ordem_id");

let editandoSolucao = false; 

// Carrega ordens ao iniciar
document.addEventListener("DOMContentLoaded", () => {
  carregarOrdens();
  carregarOrdensFechadas();
});

// Submissão do formulário de nova ordem
formOrdem.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = new FormData();
  payload.append("numero_equipamento", numeroEquipamento.value);
  payload.append("descricao_problema", descricaoProblema.value);

  const response = await fetch(`${API_URL}/ordem_servico`, {
    method: "POST",
    body: payload,
  });

  if (response.ok) {
    formOrdem.reset();
    carregarOrdens();
  } else {
    alert("Erro ao cadastrar a ordem.");
  }
});

// Buscar apenas ordens em aberto
async function carregarOrdens() {
  listaOrdens.innerHTML = "";

  const response = await fetch(`${API_URL}/ordens_pendentes`);
  const data = await response.json();

  data.ordens.forEach((ordem) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>Nº Equipamento:</strong> ${ordem.numero_equipamento}<br>
      <strong>Problema:</strong> ${ordem.descricao_problema}<br>
      <strong>Abertura:</strong> ${new Date(ordem.data_hora_defeito).toLocaleString()}<br>
      <button onclick="abrirModal(${ordem.id})">Fechar Ordem</button>
      <button class="deletar" onclick="deletarOrdem(${ordem.id})">Deletar</button>
    `;
    listaOrdens.appendChild(li);
  });
}

// Buscar soluções (ordens fechadas)
async function carregarOrdensFechadas() {
  listaOrdensFechadas.innerHTML = "";

  const response = await fetch(`${API_URL}/solucoes`);
  const data = await response.json();

  data.solucoes.forEach((solucao) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>Nº Equipamento:</strong> ${solucao.ordem_servico.numero_equipamento}<br>
      <strong>Problema:</strong> ${solucao.ordem_servico.descricao_problema}<br>
      <strong>Abertura:</strong> ${new Date(solucao.ordem_servico.data_hora_defeito).toLocaleString()}<br>
      <strong>Fechada em:</strong> ${new Date(solucao.data_hora_fechamento).toLocaleString()}<br>
      <strong>Solução:</strong> ${solucao.descricao}<br>
      <button onclick="editarSolucao(${solucao.ordem_servico_id}, '${solucao.descricao.replace(/'/g, "\\'")}')">Editar</button>
      <button class="deletar" onclick="deletarOrdem(${solucao.ordem_servico_id})">Deletar</button>
    `;
    listaOrdensFechadas.appendChild(li);
  });
}

// Abrir o modal de solução
function abrirModal(ordemId) {
  editandoSolucao = false;
  modal.classList.remove("hidden");
  ordemIdInput.value = ordemId;
  descricaoSolucao.value = "";
}

// Abrir o modal para edição da solução
function editarSolucao(ordemId, descricao) {
  editandoSolucao = true;
  modal.classList.remove("hidden");
  ordemIdInput.value = ordemId;
  descricaoSolucao.value = descricao;
}

// Fechar modal
closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Submeter solução (nova ou edição)
formSolucao.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = new FormData();
  payload.append("descricao", descricaoSolucao.value);
  payload.append("ordem_servico_id", ordemIdInput.value);

  const response = await fetch(`${API_URL}/solucao`, {
    method: editandoSolucao ? "PUT" : "POST",
    body: payload,
  });

  if (response.ok) {
    modal.classList.add("hidden");
    formSolucao.reset();
    carregarOrdens();
    carregarOrdensFechadas();
  } else {
    alert("Erro ao salvar solução.");
  }
});

// Deletar ordem
async function deletarOrdem(id) {
  const response = await fetch(`${API_URL}/ordem_servico?id=${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    carregarOrdens();
    carregarOrdensFechadas();
  } else {
    alert("Erro ao deletar a ordem.");
  }
}
