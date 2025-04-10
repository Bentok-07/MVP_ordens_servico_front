# Ordens de Serviço - Frontend

Este é o frontend da aplicação para **cadastro e gerenciamento de ordens de serviço**, desenvolvido como parte do projeto do curso de Desenvolvimento Full Stack.

A aplicação consome a API construída com Flask e exibe uma SPA (Single Page Application) desenvolvida com HTML, CSS e JavaScript.

---

##  Funcionalidades

-  Cadastro de novas ordens de serviço
-  Listagem de ordens em aberto com opção de:
  - Fechar com solução
  - Deletar se aberta por engano
-  Registro e exibição de soluções
-  Visualização de ordens fechadas com:
  - Horário de abertura
  - Horário de fechamento
  - Tempo de inatividade (visualmente implícito)
-  Interface com modal para registrar soluções
-  Integração com backend via Fetch API

---

##  Tecnologias Utilizadas

- HTML5
- CSS3 
- JavaScript 
- Consumo de API REST (Flask)

---

##  Como Executar o Frontend

1. Clone o repositório:

```bash
git clone https://github.com/Bentok-07/ordens_servico_front.git
```

2. Navegue até a pasta do projeto:

```bash
cd ordens_servico_front
```

3. **Execute diretamente no navegador**:

> Basta abrir o arquivo `index.html` no navegador.  


---

##  Estrutura dos Arquivos

```
ordens_servico_front/
│
├── index.html        # Página principal da aplicação
├── style.css         # Estilos visuais da interface
├── script.js         # Lógica da SPA e comunicação com a API
└── README.md         # Este arquivo
```

---

