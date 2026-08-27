 # ARQUITETURA DA SOLUÇÃO E INFRAESTRUTURA EM NUVEM

**Projeto:** Saúde Conectada
**Equipe:** Nextgen_devs
**Responsável:** Apolo (DevOps)

---

## 1. Diagrama de Arquitetura do Sistema 
```mermaid
graph TD

    %% =========================
    %% CAMADA DE CLIENTES
    %% =========================
    subgraph ClientLayer["Usuarios e Dispositivos - Clientes"]
        Voluntario["Voluntario em Campo / Mobile"]
        Doador["Doador / Comunidade"]
        Admin["Administrador / Coordenador"]
    end

    %% =========================
    %% CAMADA FRONT-END
    %% =========================
    subgraph FrontLayer["Camada Front-end - Vercel / Netlify"]
        ReactApp["React.js Web App"]
        QRReader["Leitor de QR Code / Barcode"]
        PublicPage["Pagina Publica / Painel de Doacoes"]
    end

    %% =========================
    %% CAMADA BACK-END
    %% =========================
    subgraph BackLayer["Camada Back-end - Render Cloud"]
        ExpressAPI["Node.js + Express REST API"]
        JWTMiddleware["Middleware de Autenticacao JWT"]
        Controllers["Controladores de Rotas"]
        BcryptModule["Criptografia de Senhas - Bcrypt"]
        EnvVars["Variaveis de Ambiente - .env / Secrets"]
    end

    %% =========================
    %% CAMADA DE DADOS
    %% =========================
    subgraph DBLayer["Camada de Banco de Dados - Supabase"]
        PostgresDB[("PostgreSQL")]
    end

    %% =========================
    %% FLUXO DOS CLIENTES
    %% =========================
    Voluntario -->|HTTPS / SSL| ReactApp
    Doador -->|HTTPS / SSL| ReactApp
    Admin -->|HTTPS / SSL| ReactApp

    %% =========================
    %% FLUXO DO FRONT-END
    %% =========================
    ReactApp --> QRReader
    ReactApp --> PublicPage

    ReactApp -->|REST / JSON| ExpressAPI

    %% =========================
    %% FLUXO DO BACK-END
    %% =========================
    ExpressAPI --> JWTMiddleware

    JWTMiddleware -->|Token valido| Controllers

    Controllers --> BcryptModule

    EnvVars -.->|JWT Secret| JWTMiddleware
    EnvVars -.->|Credenciais| ExpressAPI

    %% =========================
    %% FLUXO DO BANCO
    %% =========================
    Controllers -->|Sequelize / SQL| PostgresDB
```
---

# Mapeamento da Arquitetura em Nuvem e Fluxo de Dados

## Descrição do Fluxo da Arquitetura

O sistema adota uma arquitetura em camadas totalmente desacoplada, utilizando o modelo **PaaS (Platform as a Service)** para hospedagem em nuvem, garantindo escalabilidade, segurança e baixo custo operacional.

* **Camada de Clientes (Usuários e Dispositivos):** Os acessos são realizados por voluntários em campo, doadores da comunidade e administradores do projeto social. Todas as interações ocorrem via navegação web/mobile protegida por criptografia **HTTPS/SSL**.

* **Camada Front-end (Vercel / Netlify):** Aplicação Single Page Application (SPA) desenvolvida em **React.js**. Ela integra o leitor de QR Code/Código de Barras via câmera para movimentação de estoque em campo e disponibiliza as páginas públicas de transparência e doações.

* **Camada Back-end (Render Cloud):** API RESTful construída em **Node.js com Express**.

  * **Middleware JWT:** Intercepta as requisições para verificar a validade do token de autenticação antes de liberar o acesso às rotas protegidas (`/estoque`, `/voluntarios`, `/doacoes`).
  * **Variáveis de Ambiente (`.env`):** Mantêm as chaves de assinatura do JWT (`JWT_SECRET`) e as credenciais de banco isoladas na nuvem.
  * **Bcrypt:** Módulo responsável por gerar o hash e comparar senhas no processo de autenticação.

* **Camada de Banco de Dados (Supabase / PostgreSQL):** Banco de dados relacional gerenciado na nuvem. O acesso é feito de forma segura e exclusiva a partir da camada Back-end via ORM (Sequelize), garantindo a integridade e persistência de todas as entidades do sistema.
