# Klick

**Tagline:** gire, clique, evolua.

## 🎯 Características

- ⏱️ **Timer funcional** com suporte a inspeção de 15 segundos
- 🔄 **Scrambles 3×3 válidos** gerados automaticamente (25 movimentos)
- ⌨️ **Controle por teclado** com atalhos intuitivos
- 📊 **Penalidades** (+2 e DNF) com suporte a atalhos
- 💾 **Persistência automática** em localStorage
- 🎨 **Interface dark-first** com alto contraste
- 🌐 **Internacionalização** (i18n) com suporte a múltiplos idiomas
- 🎯 **Ícones modernos** com Lucide React
- ✨ **Feedback visual** aprimorado (toasts, animações)
- 🇧🇷 **Interface em pt-BR**

## 🚀 Como executar

### Pré-requisitos

- Node.js 18+
- pnpm 8+

### Instalação e execução

```bash
# Instalar dependências
pnpm i

# Iniciar servidor de desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Executar testes
pnpm test
```

## 🎮 Como usar

### Controles básicos

- **ESPAÇO**: Segurar para armar → soltar inicia inspeção → pressionar inicia/para o timer
- **N**: Gerar novo scramble
- **P**: Alternar penalidade +2 no último solve
- **D**: Alternar DNF no último solve

### Fluxo de uso

1. Ao abrir a aplicação, um scramble 3×3 é gerado automaticamente
2. Pressione e segure **ESPAÇO** para começar
3. Solte **ESPAÇO** para iniciar a **inspeção de 15 segundos**
4. Durante a inspeção, pressione **ESPAÇO** para iniciar o cronômetro
5. Resolva o cubo
6. Pressione **ESPAÇO** novamente para parar o timer
7. O solve é salvo automaticamente e um novo scramble é gerado

### Inspeção

- **0-15s**: Válido
- **15-17s**: +2 automático (se habilitado nas configurações)
- **>17s**: DNF automático (se habilitado nas configurações)

## 🏗️ Stack Tecnológica

- **React** 19 + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS v4** (estilização com CSS nativo)
- **Zustand** (gerenciamento de estado)
- **Lucide React** (biblioteca de ícones)
- **Framer Motion** (animações fluidas)
- **Biome** (linter e formatter)
- **Vitest** + **React Testing Library** (testes)
- **Sistema de i18n** customizado

## 📁 Estrutura do Projeto

```
src/
├── components/         # Componentes React
│   ├── TimerDisplay.tsx
│   ├── ScrambleBox.tsx
│   ├── InspectionDisplay.tsx
│   ├── StatCard.tsx
│   └── Toast.tsx
├── features/           # Lógica de negócio
│   ├── timer/
│   │   └── useTimer.ts
│   └── scramble/
│       ├── generate3x3.ts
│       └── generate3x3.test.ts
├── stores/             # Stores Zustand
│   ├── sessionsStore.ts
│   ├── settingsStore.ts
│   └── i18nStore.ts
├── i18n/              # Internacionalização
│   └── translations.ts
├── hooks/             # Custom hooks
│   └── useTranslation.ts
├── utils/             # Funções utilitárias
│   ├── formatTime.ts
│   └── animations.ts
├── types/             # Definições TypeScript
│   └── index.ts
└── test/              # Configuração de testes
    └── setup.ts
```

## ✅ Status de Implementação

### Concluído

- [x] Configuração base do projeto (Vite + React + TypeScript + Tailwind v4)
- [x] Gerador de scrambles 3×3 válidos
- [x] Hook useTimer com máquina de estados (idle → inspection → running → stopped)
- [x] Componentes TimerDisplay, ScrambleBox, InspectionDisplay, StatCard e Toast
- [x] Stores Zustand com persistência
- [x] Atalhos de teclado (Space, N, P, D)
- [x] Sistema de penalidades (+2, DNF)
- [x] Testes do gerador de scramble
- [x] Sistema de internacionalização (i18n)
- [x] Biblioteca de ícones (Lucide React)
- [x] Feedback visual aprimorado
- [x] Utilitários de formatação de tempo
- [x] **Animações com Framer Motion**
- [x] **Design mobile-first responsivo**
- [x] **Variantes de animação reutilizáveis**

### Próximos passos

- [ ] Cálculo de médias (ao5, ao12, best ao5, best ao12)
- [ ] Tabela de histórico de solves
- [ ] Sistema de sessões (criar, renomear, deletar, trocar)
- [ ] Página de configurações
- [ ] Exportar/Importar dados (JSON)
- [ ] Onboarding para iniciantes
- [ ] Testes de médias e penalidades
- [ ] PWA (opcional)

## 🧪 Testes

```bash
# Executar todos os testes
pnpm test

# Executar testes em modo watch
pnpm test

# Executar testes com UI
pnpm test:ui
```

## 📝 Licença

MIT

---

**Desenvolvido com ❤️ para a comunidade de speedcubing**
