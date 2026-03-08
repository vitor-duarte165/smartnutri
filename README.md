# SmartNutri - Nutrição Inteligente

Aplicação web React para formulação de ração de custo mínimo utilizando algoritmo Simplex simplificado.

## 🚀 Funcionalidades

- **Dashboard Interativo**: Visão geral com estatísticas e ações rápidas
- **Gerenciamento de Insumos**: Tabela dinâmica para editar preços, % PB e ED
- **Perfis de Animais**: Suporte para Bovinos e Suínos em diferentes fases
- **Otimização de Custo**: Algoritmo Simplex simplificado para minimizar custos
- **Visualizações**: Gráfico de pizza (Pie Chart) da composição da ração
- **Validação Nutricional**: Checklist que verifica se as metas de PB e ED foram atingidas
- **Histórico**: Armazenamento local de fórmulas criadas

## 🛠️ Tecnologias

- **React 18** com Vite
- **Tailwind CSS** com paleta Eco-Tech
- **Lucide React** para ícones
- **Recharts** para gráficos
- **Algoritmo Simplex** simplificado para otimização

## 📦 Instalação

```bash
npm install
```

## 🏃 Executar

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## 🎨 Paleta de Cores Eco-Tech

- Verde Escuro: `#1B4332`
- Verde Médio: `#2D6A4F`
- Verde Claro: `#52B788`
- Verde Mais Claro: `#95D5B2`
- Verde Accent: `#40916C`
- Cinza Claro: `#F5F5F5`

## 📋 Estrutura do Projeto

```
smartnutri/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── Dashboard.jsx
│   │   ├── IngredientsTable.jsx
│   │   ├── AnimalProfile.jsx
│   │   ├── FormulateRation.jsx
│   │   ├── FormulaResults.jsx
│   │   └── History.jsx
│   ├── data/
│   │   └── animalProfiles.js
│   ├── utils/
│   │   └── simplex.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🔧 Como Usar

1. **Gerenciar Insumos**: Acesse a seção "Insumos" para editar preços e valores nutricionais
2. **Selecionar Perfil**: Na seção "Formular Ração", escolha o tipo de animal e fase
3. **Calcular**: Clique em "Calcular Otimização" para obter a fórmula de custo mínimo
4. **Visualizar**: Veja o custo por tonelada, gráfico de composição e validação nutricional
5. **Salvar**: Salve fórmulas bem-sucedidas no histórico

## 📝 Notas Técnicas

- O algoritmo Simplex implementado é uma versão simplificada usando método de gradiente descendente
- Os dados são armazenados no localStorage do navegador
- A aplicação é totalmente responsiva e acessível
- Todos os componentes seguem as melhores práticas de React

## 📄 Licença

Este projeto é de código aberto e está disponível para uso livre.
# smartnutri-beta
