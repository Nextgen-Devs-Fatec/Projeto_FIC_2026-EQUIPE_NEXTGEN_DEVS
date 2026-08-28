
# Diagrama de Entidades/Relacionamentos (DER)


```mermaid
erDiagram
    USUARIO ||--o{ MEDICAMENTO : "cadastra"
    USUARIO ||--o{ DOACAO : "realiza"
    USUARIO ||--o{ EVENTO : "organiza"
    
    PACIENTE ||--o{ PACIENTE_MEDICAMENTO : "recebe"
    MEDICAMENTO ||--o{ PACIENTE_MEDICAMENTO : "e fornecido em"

    USUARIO {
        int id PK
        string nome
        string email
        string senha_hash "Hash Bcrypt varchar(255)"
        string cpf
        int idade
        string sexo
        date data_nascimento
        string cidade
        string estado
        string perfil_tipo "admin, voluntario, doador"
    }

    PACIENTE {
        int id PK
        string nome
        int idade
        string sexo
        date data_nascimento
        decimal peso
        decimal altura
        string tipo_sanguineo
        string pressao
        text alergia_medicamentos
        int frequencia_cardiaca
        decimal glicose
        text descricao
    }

    MEDICAMENTO {
        int id PK
        string nome
        string tarja
        int quantidade
        string unidade
        string principio_ativo
        string dosagem_concentracao
        date data_validade
        string codigo_medicamento
        string tipo_medicamento
        string categoria
        int cadastrado_por FK
        date data_cadastro
        text descricao
    }

    PACIENTE_MEDICAMENTO {
        int id PK
        int paciente_id FK
        int medicamento_id FK
        int quantidade_dispensada
        date data_prescricao
        text orientacoes_uso
    }

    DOACAO {
        int id PK
        int usuario_id FK
        decimal valor
        date data
        string chave_pix
    }

    EVENTO {
        int id PK
        string titulo
        date data
        string local_evento
        string tipo_evento
        text descricao
        string imagem
        int organizado_por FK
    }
```
---

# Arquitetura do Banco de Dados

## Visão Geral do Banco de Dados

O ecossistema de dados da plataforma **Saúde Conectada** adota o sistema gerenciador de banco de dados relacional **PostgreSQL** (hospedado via **Supabase**). O modelo foi desenvolvido com foco na integridade referencial, conformidade com a LGPD e rastreabilidade das operações de estoque e atendimento em campo.

A persistência é gerenciada na camada Back-end pelo **Sequelize ORM**, garantindo sanitização automática de consultas SQL para prevenção de ataques como *SQL Injection*.

## Estrutura do Diagrama Entidade-Relacionamento (DER)

O modelo relacional é composto por 6 entidades principais, estruturadas para suportar a gestão de voluntários, controle farmacêutico, registros clínicos e doações:

### Entidades e Responsabilidades

- **`USUARIO`****:** Centraliza o controle de acesso e autenticação dos atores do sistema (*Administradores*, *Voluntários* e *Doadores*). A coluna `senha_hash` armazena exclusivamente o resultado da criptografia unidirecional via **Bcrypt**, impedindo o armazenamento de senhas em texto puro.
- **`PACIENTE`****:** Mantém os dados cadastrais, históricos de saúde e medições vitais (glicose, pressão, frequência cardíaca) dos assistidos pelas ações sociais da ONG.
- **`MEDICAMENTO`****:** Gerencia o inventário farmacêutico e de insumos, contendo dados críticos para controle de validade e lote. Possui chave estrangeira (`cadastrado_por`) vinculada a `USUARIO` para auditoria das entradas.
- **`PACIENTE_MEDICAMENTO`** **(Tabela Associativa):** Resolve a relação N\:N entre pacientes e medicamentos. Registra o histórico de saídas de estoque e prescrições médicas, indicando a quantidade dispensada, data e orientações de uso.
- **`DOACAO`****:** Registra a entrada de recursos financeiros destinados à ONG, vinculando cada transação ao seu doador via `usuario_id`.
- **`EVENTO`****:** Mapeia ações de saúde, feiras e mutirões organizados em campo. A chave estrangeira `organizado_por` vincula o evento ao coordenador/administrador responsável.