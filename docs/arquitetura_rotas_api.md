# Mapeamento e Documentação das Rotas da API (REST)

#### 1. Módulo de Cadastros Base

* **`POST /api/v1/usuarios`**

  * **Acesso:** Protegido (JWT)
  * **Descrição:** Criação de novos usuários no sistema.
  * **Body:** `{ "nome": "String", "email": "String", "senha": "String", "perfil": "String" }`
  * **Respostas:** `201 Created` | `400 Bad Request` | `401 Unauthorized`

* **`POST /api/v1/auth/login`**

  * **Acesso:** **Público**
  * **Descrição:** Autenticação de usuários (Coordenador/Voluntário) e geração de token JWT.
  * **Body:** `{ "email": "String", "senha": "String" }`
  * **Respostas:** `200 OK` | `401 Unauthorized`

* **`GET /api/v1/usuarios/{id}`**

  * **Acesso:** Protegido (JWT)
  * **Descrição:** Consulta de dados do usuário autenticado.
  * **Header:** `Authorization: Bearer <token>`
  * **Respostas:** `200 OK` | `401 Unauthorized` | `404 Not Found`

* **`PUT /api/v1/usuarios/{id}`**

  * **Acesso:** Protegido (JWT)
  * **Descrição:** Atualização dos dados cadastrais do usuário.
  * **Header:** `Authorization: Bearer <token>`
  * **Body:** `{ "nome": "String", "email": "String" }`
  * **Respostas:** `200 OK` | `400 Bad Request` | `401 Unauthorized` | `404 Not Found`

* **`GET /api/v1/doadores`** | **`POST /api/v1/doadores`** | **`PUT /api/v1/doadores/{id}`**

  * **Acesso:** Protegido (JWT)
  * **Descrição:** Listagem (com paginação/filtros), cadastro (PF/PJ) e atualização de doadores parceiros da ONG.
  * **Respostas:** `200 OK` | `201 Created` | `400 Bad Request` | `401 Unauthorized` | `404 Not Found`

* **`GET /api/v1/beneficiarios`** | **`POST /api/v1/beneficiarios`** | **`PUT /api/v1/beneficiarios/{id}`**

  * **Acesso:** Protegido (JWT)
  * **Descrição:** Gestão e registro de pessoas ou famílias assistidas pelo projeto social.
  * **Respostas:** `200 OK` | `201 Created` | `400 Bad Request` | `401 Unauthorized` | `404 Not Found`

#### 2. Módulo de Doações e Transparência

* **`GET /api/v1/doacoes/necessidades`**

  * **Acesso:** **Público**
  * **Descrição:** Exibe a lista pública de insumos e remédios em falta na ONG para direcionar os doadores no site/portal.
  * **Respostas:** `200 OK`

* **`POST /api/v1/doacoes`**

  * **Acesso:** Protegido (JWT)
  * **Descrição:** Registro de entradas de doações (financeiras ou de insumos).
  * **Body:** `{ "tipo": "MEDICAMENTO/FINANCEIRO", "doador_id": "Integer", "itens": [...] }`
  * **Respostas:** `201 Created` | `400 Bad Request` | `401 Unauthorized`

* **`GET /api/v1/doacoes`** | **`GET /api/v1/doacoes/{id}`**

  * **Acesso:** Protegido (JWT)
  * **Descrição:** Listagem geral com filtros (data, tipo) e consulta detalhada de uma doação.
  * **Respostas:** `200 OK` | `401 Unauthorized` | `404 Not Found`

* **`DELETE /api/v1/doacoes/{id}`** | **`PATCH /api/v1/doacoes/{id}/cancelar`**

  * **Acesso:** Protegido (JWT)
  * **Descrição:** Estorno, exclusão física ou cancelamento lógico de lançamentos de doação.
  * **Respostas:** `200 OK` | `204 No Content` | `401 Unauthorized` | `404 Not Found`

#### 3. Módulo de Estoque e Produtos

* **`GET /api/v1/produtos`** | **`GET /api/v1/produtos/{id}`**

  * **Acesso:** Protegido (JWT)
  * **Descrição:** Consulta ao catálogo de produtos/medicamentos mapeados pela ONG.
  * **Respostas:** `200 OK` | `401 Unauthorized` | `404 Not Found`

* **`PUT /api/v1/produtos/{id}`** | **`DELETE /api/v1/produtos/{id}`**

  * **Acesso:** Protegido (JWT)
  * **Descrição:** Edição de especificações do produto e inativação no catálogo.
  * **Respostas:** `200 OK` | `204 No Content` | `400 Bad Request` | `401 Unauthorized` | `404 Not Found`

* **`GET /api/v1/estoque`**

  * **Acesso:** Protegido (JWT)
  * **Descrição:** Consulta do saldo atualizado de insumos armazenados.
  * **Respostas:** `200 OK` | `401 Unauthorized`

* **`POST /api/v1/estoque/movimentacoes`**

  * **Acesso:** Protegido (JWT)
  * **Descrição:** Registro de baixa (uso em ações de rua) ou entrada de itens via leitura de código de barras ou manual.
  * **Body:** `{ "produto_id": "Integer", "tipo": "ENTRADA/SAIDA", "quantidade": "Integer" }`
  * **Respostas:** `201 Created` | `400 Bad Request` | `401 Unauthorized`

* **`GET /api/v1/estoque/alertas`**

  * **Acesso:** Protegido (JWT)
  * **Descrição:** Retorna dados para o painel de controle contendo itens com validade próxima (< 30 dias) ou com quantidade abaixo do estoque mínimo.
  * **Respostas:** `200 OK` | `401 Unauthorized`

#### 4. Módulo de Voluntários e Escalas

* **`POST /api/v1/voluntarios/cadastrar`**

  * **Acesso:** **Público**
  * **Descrição:** Portal de solicitação/autocadastro para novos voluntários e profissionais de saúde interessados em ajudar.
  * **Body:** `{ "nome": "String", "email": "String", "telefone": "String", "habilidades": "String" }`
  * **Respostas:** `201 Created` | `400 Bad Request`

* **`GET /api/v1/voluntarios`** | **`GET /api/v1/voluntarios/{id}`** | **`PUT /api/v1/voluntarios/{id}`**

  * **Acesso:** Protegido (JWT)
  * **Descrição:** Gestão administrativa de voluntários, aprovações de cadastro e atualização de perfis.
  * **Respostas:** `200 OK` | `400 Bad Request` | `401 Unauthorized` | `404 Not Found`

* **`GET /api/v1/voluntarios/escalas`** | **`POST /api/v1/voluntarios/escalas`**

  * **Acesso:** Protegido (JWT)
  * **Descrição:** Consulta e agendamento de turnos/atividades para as ações de campo do Projeto Social Saúde Campinas.
  * **Respostas:** `200 OK` | `201 Created` | `400 Bad Request` | `401 Unauthorized`


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