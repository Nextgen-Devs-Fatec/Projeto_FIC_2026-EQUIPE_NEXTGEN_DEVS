## Mapeamento e Documentação das Rotas da API (REST)

### A) Módulo de Autenticação e Usuários

**POST /api/v1/auth/login**

- **Descrição:** Autentica coordenadores/voluntários e gera o token de acesso.
- **Body:** `{ "email": "user@email.com", "senha": "123" }`
- **Resposta (200):** `{ "token": "eyJhbGciOi...", "usuario": { "id": 1, "nome": "Ana" } }`

**POST /api/v1/voluntarios/cadastrar**

- **Descrição:** Autocadastro público de novos voluntários da ONG.
- **Body:** `{ "nome": "Carlos", "email": "carlos@email.com", "telefone": "1999999999" }`
- **Resposta (201):** `{ "mensagem": "Voluntário cadastrado com sucesso!" }`

### B) Módulo de Gestão de Estoque e Insumos

**GET /api/v1/estoque**

- **Descrição:** Lista medicamentos em estoque com opção de ordenação por validade.
- **Headers:** `Authorization: Bearer <token>`
- **Resposta (200):** `[ { "id": 10, "produto": "Paracetamol", "quantidade": 50, "validade": "2026-12-31" } ]`

**POST /api/v1/estoque/cadastrar**

- **Descrição:** Cadastra um novo lote de medicamento no sistema.
- **Body:** `{ "produto": "Amoxicilina", "principioAtivo": "Amoxicilina", "quantidade": 100, "validade": "2027-01-01", "lote": "L123", "local": "Armário A" }`
- **Resposta (201):** `{ "id": 11, "status": "Cadastrado" }`

**PUT /api/v1/estoque/movimentar/:id**

- **Descrição:** Registra a baixa ou entrada manual/via código de barras de um item.
- **Body:** `{ "tipo": "SAIDA", "quantidade": 5, "motivo": "Ação de Campo" }`
- **Resposta (200):** `{ "id": 10, "novoEstoque": 45 }`

**GET /api/v1/estoque/alertas**

- **Descrição:** Retorna insumos com validade próxima (< 30 dias) ou abaixo do estoque mínimo.
- **Resposta (200):** `{ "vencimentoProximo": [...], "estoqueBaixo": [...] }`

### C) Módulo de Doações e Transparência Pública

**GET /api/v1/doacoes/necessidades**

- **Descrição:** Rota pública (sem auth) que lista insumos em falta para o portal de doações.
- **Resposta (200):** `[ { "item": "Soro Fisiológico", "prioridade": "ALTA" } ]`

**POST /api/v1/doacoes/registrar**

- **Descrição:** Registra a entrada de uma nova doação recebida.
- **Body:** `{ "doador": "Empresa X", "tipo": "MEDICAMENTO", "quantidade": 20 }`
- **Resposta (201):** `{ "id_arrecadacao": 505, "status": "Registrado" }`

```mermaid
flowchart LR

%% =========================================================
%% AUTENTICAÇÃO CENTRAL
%% =========================================================
AUTH["🔐 JWT / Sessão<br/>Authorization: Bearer &lt;token&gt;"]

%% =========================================================
%% MÓDULO 1 - CADASTROS BASE
%% =========================================================
subgraph CADASTROS["1. Módulo de Cadastros Base"]
    direction TB
    
    subgraph CAD_AUTH ["Autenticação & Usuários"]
        U1["POST /api/v1/usuarios<br/>Criar usuário<br/>Body: nome, email, senha, perfil<br/>201 Created | 400 Bad Request"]
        U2["POST /api/v1/auth/login<br/>Autenticação<br/>Body: email, senha<br/>200 OK | 401 Unauthorized"]
        U3["GET /api/v1/usuarios/{id}<br/>Consultar usuário<br/>Header: Authorization<br/>200 OK | 401 | 404"]
        U4["PUT /api/v1/usuarios/{id}<br/>Atualizar usuário<br/>Header: Authorization<br/>Body: dados cadastrais<br/>200 OK | 400 | 401 | 404"]
    end

    subgraph CAD_DOAD ["Doadores"]
        D1["GET /api/v1/doadores<br/>Listar doadores<br/>Query: tipo, paginação<br/>200 OK | 401"]
        D2["POST /api/v1/doadores<br/>Cadastrar doador<br/>Body: PF/PJ, nome, documento<br/>201 Created | 400 | 401"]
        D3["PUT /api/v1/doadores/{id}<br/>Atualizar doador<br/>Body: dados cadastrais<br/>200 OK | 400 | 401 | 404"]
    end

    subgraph CAD_BENEF ["Beneficiários"]
        B1["GET /api/v1/beneficiarios<br/>Listar beneficiários<br/>Query: status, paginação<br/>200 OK | 401"]
        B2["POST /api/v1/beneficiarios<br/>Cadastrar beneficiário<br/>Body: dados cadastrais<br/>201 Created | 400 | 401"]
        B3["PUT /api/v1/beneficiarios/{id}<br/>Atualizar beneficiário<br/>Body: dados cadastrais<br/>200 OK | 400 | 401 | 404"]
    end
end

%% =========================================================
%% MÓDULO 2 - DOAÇÕES
%% =========================================================
subgraph DOACOES["2. Módulo de Doações"]
    direction TB
    
    subgraph DOAC_PUB ["Portal Público"]
        DO0["🌐 GET /api/v1/doacoes/necessidades<br/>[PÚBLICA] Listar necessidades<br/>200 OK"]
    end

    subgraph DOAC_GEST ["Gestão de Doações"]
        DO1["POST /api/v1/doacoes<br/>Registrar doação<br/>Body: tipo, doador, valor/itens<br/>201 Created | 400 | 401"]
        DO2["GET /api/v1/doacoes<br/>Listar doações<br/>Query: data, tipo, doador, paginação<br/>200 OK | 401"]
        DO3["GET /api/v1/doacoes/{id}<br/>Detalhes da doação<br/>Header: Authorization<br/>200 OK | 401 | 404"]
        DO4["DELETE /api/v1/doacoes/{id}<br/>Excluir/estornar doação<br/>Header: Authorization<br/>204 No Content | 401 | 404"]
        DO5["PATCH /api/v1/doacoes/{id}/cancelar<br/>Cancelar doação<br/>Header: Authorization<br/>200 OK | 400 | 401 | 404"]
    end
end

%% =========================================================
%% MÓDULO 3 - ESTOQUE / PRODUTOS
%% =========================================================
subgraph ESTOQUE["3. Módulo de Estoque / Produtos"]
    direction TB
    
    subgraph EST_PROD ["Catálogo de Produtos"]
        P1["GET /api/v1/produtos<br/>Listar produtos<br/>Query: categoria, status, paginação<br/>200 OK | 401"]
        P2["GET /api/v1/produtos/{id}<br/>Detalhes do produto<br/>200 OK | 401 | 404"]
        P3["PUT /api/v1/produtos/{id}<br/>Atualizar produto<br/>Body: nome, categoria, unidade<br/>200 OK | 400 | 401 | 404"]
        P4["DELETE /api/v1/produtos/{id}<br/>Excluir/inativar produto<br/>204 No Content | 401 | 404"]
    end

    subgraph EST_MOV ["Movimentação e Alertas"]
        E1["GET /api/v1/estoque<br/>Consultar estoque<br/>Query: produto, categoria<br/>200 OK | 401"]
        E2["POST /api/v1/estoque/movimentacoes<br/>Registrar movimentação<br/>Body: produto, tipo, quantidade<br/>201 Created | 400 | 401"]
        E3["⚠️ GET /api/v1/estoque/alertas<br/>Alertas de validade e nível crítico<br/>200 OK | 401"]
    end
end

%% =========================================================
%% MÓDULO 4 - VOLUNTÁRIOS
%% =========================================================
subgraph VOLUNTARIOS["4. Módulo de Voluntários"]
    direction TB
    
    subgraph VOL_PUB ["Portal Público"]
        V1_PUB["🌐 POST /api/v1/voluntarios/cadastrar<br/>[PÚBLICA] Autocadastro voluntário<br/>Body: dados, habilidades, interesses<br/>201 Created | 400 Bad Request"]
    end

    subgraph VOL_CAD ["Gestão de Voluntários"]
        V2["GET /api/v1/voluntarios<br/>Listar voluntários<br/>Query: status, especialidade, paginação<br/>200 OK | 401"]
        V3["GET /api/v1/voluntarios/{id}<br/>Consultar voluntário<br/>200 OK | 401 | 404"]
        V4["PUT /api/v1/voluntarios/{id}<br/>Atualizar voluntário<br/>Body: dados cadastrais<br/>200 OK | 400 | 401 | 404"]
    end

    subgraph VOL_ESC ["Escalas e Turnos"]
        V5["GET /api/v1/voluntarios/escalas<br/>Consultar escalas<br/>Query: data, voluntário<br/>200 OK | 401"]
        V6["POST /api/v1/voluntarios/escalas<br/>Criar escala/turno<br/>Body: voluntário, atividade, data<br/>201 Created | 400 | 401"]
    end
end

%% =========================================================
%% CONEXÕES DE AUTENTICAÇÃO LIMPAS
%% =========================================================
AUTH -.-> CADASTROS
AUTH -.-> DOAC_GEST
AUTH -.-> ESTOQUE
AUTH -.-> VOL_CAD
AUTH -.-> VOL_ESC
```