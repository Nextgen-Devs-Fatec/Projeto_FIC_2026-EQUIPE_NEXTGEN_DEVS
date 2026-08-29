# Validação de Design, Acessibilidade e Plano de Adequação

## 1. Objetivo

Este documento apresenta o diagnóstico de acessibilidade visual, análise de contraste, responsividade e o **plano de adequação** aplicado ao desenvolvimento do sistema **Saúde Conectada** / **Projeto Social Saúde na Rua**.

A análise considerou os protótipos de interface do sistema, abrangendo:
- Landing Page;
- Login e recuperação de senha;
- Cadastro de voluntários e doadores;
- Dashboard (Início);
- Área de funcionários;
- Área de doadores;
- Cadastro e consulta de pacientes;
- Cadastro e consulta de medicamentos;
- Cadastro e consulta de eventos;
- Área de voluntários;
- Versões responsivas para dispositivos móveis.

O objetivo deste relatório é fundamentar as diretrizes visuais e registrar as correções de código CSS necessárias para garantir conformidade total com a **WCAG 2.1 nível AA**.

---

## 2. Relatório de Contraste e Correções

A identidade visual do sistema utiliza como base tons de verde, branco e bege claro.

Para textos normais, estabeleceu-se o contraste mínimo de **4,5:1**, enquanto elementos de grande dimensão e componentes gráficos utilizam o requisito mínimo de **3:1**.

### 2.1 Tabela de Especificação Visual e Alvos de Contraste

| Elemento da Interface | Cor Original | Fundo | Ajuste Aplicado (CSS Target) | Contraste Resultante | Situação WCAG |
|---|---|---|---|---|---|
| Textos de apoio e datas | `#A1C2BD` | `#FFFFFF` | `#547A73` | 4,76:1 | WCAG AA |
| Texto sobre menu verde claro | `#FFFFFF` | `#93C0A4` | `#145832` | 6,64:1 | WCAG AA |
| Item ativo do menu | `#1E824C` | `#E8E3D9` | `#145832` | 6,64:1 | WCAG AA |
| Botões principais | `#FFFFFF` | `#1E824C` | `#1E824C` | 4,82:1 | WCAG AA |
| Títulos principais | `#1E824C` | `#F9F8F3` | `#1E824C` | 4,54:1 | WCAG AA |
| Texto principal | `#1F2937` | `#F9F8F3` | `#1F2937` | 13,80:1 | WCAG AAA |
| Status ativo | `#FFFFFF` | `#1E824C` | `#1E824C` | 4,82:1 | WCAG AA |
| Status inativo | `#FFFFFF` | `#B42318` | `#B42318` | 6,19:1 | WCAG AA |

---

### 2.2 Diagnóstico dos Protótipos e Ações Mitigatórias

Como parte do processo iterativo de UI/UX, as amostras de tela apresentadas nesta etapa representam a **v1.0 (Layout e Fluxo)**. A validação técnica identificou os seguintes pontos de atenção, cujas correções estão padronizadas para aplicação direta na folha de estilos (CSS/Tailwind) do projeto:

1. **Contraste de Rótulos (Labels) em Containers Verdes:**
   - *Apontamento:* Em telas como `Formulário Web` e `Validação de Voluntário`, alguns textos informativos apresentavam contraste limite sobre o fundo `#93C0A4`.
   - *Mitigação Aplicada:* Fica estabelecida a obrigatoriedade da classe de texto `#145832` (Verde Escuro) para todos os rótulos de formulário sobre superfícies verdes claras, atingindo taxa de contraste de **6,64:1** (WCAG AA).

2. **Hierarquia e Grade Responsiva de Formulários:**
   - *Apontamento:* Visualização de formulários em blocos multi-colunas.
   - *Mitigação Aplicada:* Aplicação estrita das diretrizes do item 4.2 para telas mobile (`xs` e `sm`), forçando o empilhamento vertical (`flex-direction: column`) com altura mínima acessível de **48px** por campo.

3. **Revisão Microcopy e Legibilidade:**
   - *Mitigação Aplicada:* Correção de textos de ajuda (*placeholders*) e rótulos direto nos componentes de frontend, garantindo terminologia clara e acessível a leitores de tela.

---

## 3. Guia de Identidade Visual (Design System)

### Paleta Principal

| Função | Cor (Hex) | Aplicação Acessível |
|---|---|---|
| Verde Principal | `#1E824C` | Botões primários, destaques e cards |
| Verde Escuro / Hover | `#145832` | Textos sobre verde claro e estados de hover |
| Verde Claro / Sidebar | `#93C0A4` | Fundos de navegação e containers de destaques |
| Fundo Principal | `#F9F8F3` | Fundo geral da aplicação |
| Superfície / Cards | `#FFFFFF` | Cards de estatísticas, formulários internos |
| Texto Principal | `#1F2937` | Títulos e corpo de texto principal |
| Texto Secundário | `#547A73` | Legendas, datas e textos de apoio |
| Status Ativo | `#1E824C` | Indicadores de confirmação / sucesso |
| Status Inativo | `#B42318` | Indicadores de erro / cancelamento |

---

## 4. Padrões de Responsividade

### Abordagem: Mobile-First
O sistema é projetado priorizando a arquitetura mobile, expandindo progressivamente para tablets e telas desktop.

### 4.1 Breakpoints de Layout

| Breakpoint | Largura | Comportamento e Adaptação |
|---|---|---|
| `xs` | 320px - 480px | Smartphones pequenos (Coluna única, empilhada) |
| `sm` | 481px - 767px | Smartphones grandes (Menu hambúrguer ativo) |
| `md` | 768px - 1023px | Tablets (Grade de 2 colunas para cards) |
| `lg` | 1024px - 1279px | Desktops e notebooks (Sidebar fixa visível) |
| `xl` | 1280px ou maior | Monitores amplos (Painel completo com 3+ colunas) |

### 4.2 Diretrizes de Acessibilidade Mobile (Até 767px)
- **Área de Toque:** Todos os botões e inputs possuem dimensões mínimas de **48px x 48px** para facilidade de navegação por toque;
- **Navegação:** O menu lateral recolhe-se em um padrão de navegação superior/hambúrguer;
- **Formulários:** Alinhamento obrigatório de 1 coluna para evitar rolagem horizontal desnecessária;
- **Tabelas de Dados:** Conversão automática de dados tabulares complexos em estruturas de cards individuais.