# Documentação Técnica: Backlog e Requisitos do Sistema

**Projeto:** Plataforma Digital Saúde Conectada
**ONG Atendida:** Projeto Social Saúde Campinas
**Equipe:** Nextgen_devs
**Responsável do Entregável:** Raphael (Agilista)

---

## 1. Visão Geral do Produto

O Saúde Conectada é uma aplicação web responsiva voltada à gestão operacional, controle de estoque farmacêutico, divulgação institucional e captação de doações para o Projeto Social Saúde Campinas. A solução busca substituir controles manuais (Google Forms e planilhas) por um fluxo integrado, intuitivo e acessível para voluntários em ações de campo.

---

## 2. Requisitos do Sistema

### 2.1 Requisitos Funcionais (RF)

| ID | Requisito Funcional | Descrição | Prioridade | Mapeamento Técnico |
|---|---|---|---|---|
| RF01 | Gestão e Cadastro de Insumos | Permitir o cadastro detalhado de medicamentos e insumos (nome, apresentação, quantidade, local de armazenamento, lote e data de validade). | Alta | Back-end (API Node.js) / Banco |
| RF02 | Movimentação de Estoque | Permitir o registro de entradas (doações/compras) e baixas (uso em ações de saúde), mantendo histórico de alteração. | Alta | Back-end (API Node.js) / Banco |
| RF03 | Leitura por Código de Barras/QR Code | Permitir o escaneamento de códigos de barras de medicamentos via câmera do dispositivo móvel para consulta e movimentação rápida. | Média | Front-end (React.js) |
| RF04 | Painel de Alertas de Validade e Estoque Mínimo | Exibir notificações e destaques visuais para medicamentos próximos da validade ou com quantidade abaixo do limite mínimo. | Alta | Front-end (React.js) / Back-end |
| RF05 | Lista Pública de Necessidades | Gerar e disponibilizar uma página pública com os itens farmacêuticos em falta para direcionamento de doações. | Alta | Front-end (React.js) / Back-end |
| RF06 | Autocadastro de Voluntários | Permitir que novos voluntários e profissionais de saúde se cadastrem na plataforma de forma autônoma. | Média | Front-end (React.js) / Back-end |
| RF07 | Divulgação Institucional e Contato | Apresentar a história da ONG, fotos de ações, missão e links de contato (WhatsApp, redes sociais, chave PIX). | Média | Front-end (React.js) |
| RF08 | Controle de Acesso e Perfis | Oferecer autenticação com diferenciação de permissões (Administrador/Coordenador da ONG vs. Voluntário). | Alta | Back-end (Node.js + JWT) |

### 2.2 Requisitos Não Funcionais (RNF) — Diretrizes do Anexo III

| ID | Requisito Não Funcional | Descrição Técnica | Norma / Padrão Aplicado |
|---|---|---|---|
| RNF01 | Arquitetura e Stack Obrigatória | O front-end deve ser desenvolvido em React.js e o back-end em Node.js com banco de dados relacional ou MongoDB. | Anexo III do Regulamento |
| RNF02 | Design Responsivo e Mobile-First | A interface deve ser totalmente adaptável para uso em smartphones e tablets em ações de rua. | RNF de UX / Usabilidade |
| RNF03 | Segurança de Dados e Autenticação | Implementar autenticação via JWT/OAuth2 e criptografia de senhas com algoritmo de hashing seguro (bcrypt). | RNF de Segurança |
| RNF04 | Criptografia em Trânsito (HTTPS) | Toda a comunicação entre o cliente e a API deve utilizar protocolo TLS/HTTPS. | RNF de Segurança |
| RNF05 | Gestão de Segredos e Variáveis | Nenhuma credencial ou chave de API pode constar hardcoded no código; uso obrigatório de arquivos .env. | RNF de Segurança |
| RNF06 | Acessibilidade Digital | O sistema deve seguir diretrizes de acessibilidade (WCAG 2.1 AA), garantindo contraste de cores e suporte a leitores de tela. | RNF de Acessibilidade |
| RNF07 | Disponibilidade e Hospedagem em Nuvem | A aplicação deve ser implantada em serviços gratuitos de nuvem (ex: Vercel, Render ou Supabase). | RNF de Infraestrutura |

---

## 3. Estrutura de Épicos e User Stories (Histórias de Usuário)

### ÉPICO 01: Gestão de Insumos e Estoque Farmacêutico

**Objetivo:** Garantir a rastreabilidade, o controle de validade e o manejo eficiente dos medicamentos doados.

#### US01 - Cadastro de Medicamentos [RF01]

**História:** Como coordenador da ONG, quero cadastrar os medicamentos recebidos informando nome, lote, quantidade e validade, para manter o estoque organizado.

**Critérios de Aceite:**
- O sistema deve validar se a data de validade é posterior à data atual.
- Deve ser possível informar o local exato onde o item está guardado.
- Retornar mensagem de sucesso após o salvamento.

#### US02 - Baixa e Entrada Rápida de Estoque [RF02 / RF03]

**História:** Como voluntário de campo, quero registrar a saída de um remédio (ou escanear o código via câmera) durante a ação de saúde, para manter os saldos atualizados em tempo real.

**Critérios de Aceite:**
- Permitir a leitura de código de barras ou a seleção manual do insumo.
- Registrar a quantidade retirada e o nome do voluntário responsável.
- O saldo em estoque deve ser reduzido imediatamente após a confirmação.

#### US03 - Alertas de Validade Próxima e Estoque Mínimo [RF04]

**História:** Como responsável pelo estoque, quero visualizar um painel com itens próximos da validade ou em quantidade crítica, para priorizar seu uso e evitar desperdício.

**Critérios de Aceite:**
- Exibir destaque em cor amarela/vermelha para produtos com vencimento inferior a 30 dias.
- Notificar quando um insumo atingir o limite mínimo cadastrado.

### ÉPICO 02: Transparência e Captação de Doações

**Objetivo:** Automatizar a comunicação com a comunidade e direcionar as doações para as reais necessidades da ONG.

#### US04 - Lista Pública de Necessidades [RF05]

**História:** Como doador ou parceiro, quero consultar a lista atualizada de insumos em falta no site, para realizar doações assertivas.

**Critérios de Aceite:**
- A página deve ser pública (não exige login).
- Atualização automática com base no estoque abaixo do limite mínimo.
- Disponibilizar botão de compartilhamento via WhatsApp ou cópia de link.

### ÉPICO 03: Gestão de Voluntários e Institucional

**Objetivo:** Facilitar a atração de novos colaboradores de saúde e fortalecer a marca da ONG.

#### US05 - Autocadastro de Voluntários [RF06]

**História:** Como estudante de medicina ou profissional de saúde, quero preencher um formulário de cadastro, para me voluntariar nas ações da ONG.

**Critérios de Aceite:**
- Solicitar dados básicos (Nome, E-mail, Telefone/WhatsApp, Profissão/Curso).
- Enviar os dados cadastrados para aprovação da coordenação da ONG.

#### US06 - Portal Institucional e Transparência [RF07]

**História:** Como visitante, quero conhecer a história da ONG e acessar os contatos oficiais, para entender o impacto social da organização.

**Critérios de Aceite:**
- Exibir seções institucionais (Quem Somos, Galeria de Fotos de Ações, Redes Sociais e Chave PIX).
- Interface totalmente adaptada para dispositivos móveis.

### ÉPICO 04: Segurança, Acesso e Infraestrutura

**Objetivo:** Assegurar a proteção dos dados e o cumprimento das normas do regulamento técnico.

#### US07 - Autenticação Segura de Usuários [RF08 / RNF03]

**História:** Como usuário da plataforma, quero realizar login com e-mail e senha, para acessar as funcionalidades restritas ao meu perfil de acesso.

**Critérios de Aceite:**
- A senha deve ser criptografada via bcrypt antes de ser armazenada.
- O sistema deve emitir um token JWT seguro com tempo de expiração definido.
- Bloquear acesso a páginas restritas sem autenticação válida.

---

## 5. Matriz de Rastreabilidade de Requisitos (RTM)

| ID do Requisito | Problema / Dor Mapeada na ONG | Épico Relacionado | User Story (US) | Tipo | Componente Técnico / Módulo da Arquitetura | RNF / Norma Associada | Responsável Técnico |
|---|---|---|---|---|---|---|---|
| RF01 | Controle manual de estoque e falta de visibilidade sobre localização dos remédios. | Épico 01: Gestão de Insumos e Estoque Farmacêutico | US01 - Cadastro de Medicamentos | Funcional | Back-end (`/api/v1/estoque/cadastrar`) & Database (Tabela Produto) | RNF01, RNF05 | Lucas / Vitor (Back-end) |
| RF02 | Risco de desabastecimento em ações de rua e ausência de histórico de retiradas. | Épico 01: Gestão de Insumos e Estoque Farmacêutico | US02 - Baixa e Entrada Rápida | Funcional | Back-end (`PUT /api/v1/estoque/movimentar`) & Database (Tabela Arrecadacao) | RNF01, RNF03 | Lucas / Vitor (Back-end) |
| RF03 | Lentidão no registro manual de itens durante os atendimentos de campo. | Épico 01: Gestão de Insumos e Estoque Farmacêutico | US02 - Baixa e Entrada Rápida | Funcional | Front-end (React + API Câmera `@zxing/library`) | RNF02 (Mobile-First) | Rafaela (Front-end) |
| RF04 | Perda involuntária de medicamentos por vencimento da data de validade. | Épico 01: Gestão de Insumos e Estoque Farmacêutico | US03 - Alertas de Validade e Mínimos | Funcional | Front-end (Dashboard de Alertas) & Back-end (`GET /api/v1/estoque/alertas`) | RNF02, RNF06 (Acessibilidade) | Rafaela (Front) / Lucas (Back) |
| RF05 | Dificuldade em divulgar para doadores e parceiros os insumos em falta. | Épico 02: Transparência e Captação de Doações | US04 - Lista Pública de Necessidades | Funcional | Front-end (Portal Público) & Back-end (`GET /api/v1/doacoes/necessidades`) | RNF02, RNF04 (HTTPS) | Rafaela (Front) / Vitor (Back) |
| RF06 | Sobrecarga na triagem e no cadastro manual de voluntários via WhatsApp. | Épico 03: Gestão de Voluntários e Institucional | US05 - Autocadastro de Voluntários | Funcional | Front-end (Formulário) & Back-end (`POST /api/v1/voluntarios/cadastrar`) | RNF03 (JWT), RNF06 | Rafaela (Front) / Lucas (Back) |
| RF07 | Falta de sede própria e pouca visibilidade do trabalho social em Campinas. | Épico 03: Gestão de Voluntários e Institucional | US06 - Portal Institucional | Funcional | Front-end (Landing Page React) | RNF02, RNF06 (WCAG 2.1) | Rafaela (Front-end) |
| RF08 | Inexistência de níveis de acesso e segurança nos registros da ONG. | Épico 04: Segurança, Acesso e Infraestrutura | US07 - Autenticação Segura | Funcional | Back-end Middleware JWT (`/api/v1/auth/login`) & Bcrypt Hashing | RNF03, RNF04, RNF05 | Lucas / Vitor (Back-end) |
| RNF01 | Necessidade de alinhamento estrito à stack obrigatória do Anexo III. | Todos os Épicos | Todas as Stories | Não Funcional | Repositório do Projeto (React + Node + DB) | Anexo III - Regulamento | Apolo (DevOps) |
| RNF02 | Uso de dispositivos móveis pelos voluntários durante ações de rua. | Todos os Épicos | US02, US03, US06 | Não Funcional | Interface Responsiva React.js (Tailwind CSS) | WCAG / Mobile-First | Rafaela (Front-end) |
| RNF03 | Proteção de dados cadastrais de voluntários e assistidos. | Épico 04: Segurança | US05, US07 | Não Funcional | Express Security Middlewares (Bcrypt + JWT) | RNF de Segurança | Lucas / Vitor (Back-end) |
| RNF04 | Tráfego de dados na rede sem risco de interceptação. | Todos os Épicos | Todas as Stories | Não Funcional | Certificado TLS/SSL na Hospedagem | RNF de Criptografia | Apolo (DevOps) |
| RNF05 | Proteção contra vazamento de credenciais e chaves de API. | Épico 04: Segurança | US07 | Não Funcional | Configuração de .env em Vercel/Render | RNF de Segurança | Apolo (DevOps) |
| RNF06 | Inclusão digital e usabilidade para diferentes perfis de voluntários. | Épico 02, 03 | US03, US04, US06 | Não Funcional | Componentes React com alto contraste e tags alt | WCAG 2.1 AA | Rafaela (Front-end) |
| RNF07 | Ausência de orçamento para pagamento de servidores/hospedagem. | Todos os Épicos | Todas as Stories | Não Funcional | Deploy em nuvem gratuita (Vercel + Render + Supabase) | RNF de Infraestrutura | Apolo (DevOps) |
