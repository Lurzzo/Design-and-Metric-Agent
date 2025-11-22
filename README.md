# PoC Design & Metrics Agent

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15-black)

Uma aplicação web IA para acelerar a ideação e prototipagem de Provas de Conceito (PoCs) de inovação. Este agente inteligente ajuda a estruturar o escopo técnico e definir frameworks de mensuração de sucesso.

## 🚀 Funcionalidades

### 1. PoC Design Agent
Transforma ideias abstratas em planos de execução tangíveis:
- **Definição de Escopo MVP**: Delimita o que é essencial para validar a ideia.
- **Roadmap Técnico**: Sugere sprints e milestones para o desenvolvimento.
- **Arquitetura Simplificada**: Propõe uma stack tecnológica e diagrama de alto nível.
- **Requisitos de Dados**: Identifica dados necessários e fontes potenciais.

### 2. Metrics & KPI Generator Agent
Estabelece como medir o sucesso da sua inovação:
- **Árvore de Métricas**: Define indicadores *Leading* (antecedentes) e *Lagging* (resultantes).
- **Baselines & Targets**: Sugere metas realistas para o estágio inicial.
- **Ferramentas de Tracking**: Recomenda a stack de analytics ideal.
- **Conceito de Dashboard**: Descreve visualmente como acompanhar os resultados.

## 🛠️ Tech Stack

- **Frontend**: [Next.js 15](https://nextjs.org/) (React)
- **Estilização**: CSS Modules / Global CSS com estética Premium (Dark Mode)
- **IA**: [OpenAI API](https://openai.com/) (GPT-4o)
- **Ícones**: [Lucide React](https://lucide.dev/)

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:
- [Node.js](https://nodejs.org/) (v18 ou superior)
- Uma chave de API da [OpenAI](https://platform.openai.com/)

## 🔧 Instalação e Configuração



1. **Instale as dependências**
   ```bash
   npm install
   ```

2. **Configure as Variáveis de Ambiente**
   Renomeie o arquivo `.env.local.example` para `.env.local` e adicione sua chave da OpenAI:
   ```bash
   cp .env.local.example .env.local
   ```
   No arquivo `.env.local`:
   ```env
   OPENAI_API_KEY=sk-sua-chave-aqui...
   ```

3. **Inicie o Servidor de Desenvolvimento**
   ```bash
   npm run dev
   ```

4. **Acesse a Aplicação**
   Abra seu navegador em [http://localhost:3000](http://localhost:3000).

## 📖 Como Usar

1. Na tela inicial, você verá um campo de texto para **Contexto**.
2. Descreva sua ideia de inovação com o máximo de detalhes possível.
   - *Exemplo: "Quero criar um marketplace B2B para excedentes de estoque de restaurantes focando em sustentabilidade."*
3. Clique no botão **"Gerar Plano de PoC e Métricas"**.
4. Aguarde alguns segundos enquanto os agentes de IA processam sua solicitação.
5. O sistema gerará dois cards detalhados:
   - **PoC Design**: Com o roadmap e arquitetura.
   - **Metrics & KPIs**: Com os indicadores de sucesso e plano de mensuração.

## 📂 Estrutura do Projeto

```
/src
  /app
    /api           # Rotas da API (Backend)
      /poc-design       # Endpoint do Agente de Design
      /metrics-generator # Endpoint do Agente de Métricas
    page.js        # Página Principal (Frontend)
    layout.js      # Layout Global
    globals.css    # Estilos Globais (Tema Premium)
```

<img width="1338" height="889" alt="image" src="https://github.com/user-attachments/assets/bb9f5f2e-0036-44db-aad1-f4454be8e06f" />


