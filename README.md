# Klick

**Tagline:** gire, clique, evolua.

## 🎯 Características

- ⏱️ **Timer funcional** com suporte a inspeção de 15 segundos
- 🔄 **Scrambles 3×3 válidos** gerados automaticamente (25 movimentos)
- ⌨️ **Controle por teclado** com atalhos intuitivos
- 📊 **Estatísticas completas** (Single, ao5, ao12, best ao5, best ao12)
- 💾 **Persistência automática** em localStorage
- 📁 **Sistema de sessões** - Organize seus solves em múltiplas sessões
- 🎨 **Tema claro e escuro** - Alterne entre temas com um clique
- 🌐 **Suporte a 3 idiomas** - pt-BR, en-US, es-ES
- 🎵 **Sistema de sons** - Feedback sonoro para eventos do timer
- 📚 **Guia para iniciantes** - Aprenda a ler scrambles de cubo mágico
- 📤 **Exportar/Importar** - Backup e migração de dados em JSON
- 🎯 **Ícones modernos** com Lucide React
- ✨ **Animações fluidas** com Framer Motion
- 📱 **PWA** - Instalável e funciona offline
- � **Interface moderna** com alto contraste e acessibilidade

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

# Preview da build de produção
pnpm preview

# Executar testes
pnpm test
```

## 📱 PWA (Progressive Web App)

O Klick é um Progressive Web App completo, permitindo:

- **Instalação**: Clique em "Instalar" no navegador ou use o menu "Adicionar à tela inicial" no mobile
- **Offline**: Funciona mesmo sem conexão com internet após o primeiro acesso
- **Atualizações**: Notificação automática quando uma nova versão está disponível
- **Performance**: Assets em cache para carregamento instantâneo

### Como instalar no celular

1. Acesse o Klick pelo navegador (Chrome/Safari)
2. No **Android**: Toque no menu (⋮) → "Instalar app" ou "Adicionar à tela inicial"
3. No **iOS**: Toque no ícone de compartilhar → "Adicionar à Tela de Início"
4. O app abrirá em tela cheia, como um app nativo!

## 🎮 Como usar

### Controles básicos

- **ESPAÇO**: Segurar para armar → soltar inicia inspeção → pressionar inicia/para o timer
- **N**: Gerar novo scramble
- **P**: Alternar penalidade +2 no último solve
- **D**: Alternar DNF no último solve

### Sessões

- Organize seus solves em **múltiplas sessões** independentes
- Cada sessão mantém suas próprias estatísticas e histórico
- Use o dropdown no header para:
  - **Trocar entre sessões** com um clique
  - **Criar novas sessões** com nomes personalizados
  - **Renomear sessões** existentes
  - **Deletar sessões** (com proteção para última sessão)

### Configurações

Acesse o menu de **Configurações** (⚙️) no header para personalizar:

- **Duração da inspeção**: 5 a 30 segundos (padrão: 15s)
- **Sons**: Ativar/desativar feedback sonoro
- **Penalidade automática**: +2 entre 15-17s, DNF após 17s (regras WCA)
- **Tema**: Alternar entre claro ☀️ e escuro 🌙
- **Exportar/Importar**:
  - Exportar sessão atual ou todas as sessões em JSON
  - Importar sessões com opção de mesclar ou substituir dados

### Idiomas

Selecione seu idioma preferido no dropdown do header:
- 🇧🇷 Português (pt-BR)
- 🇺🇸 English (en-US)
- 🇪🇸 Español (es-ES)

### Guia de Embaralhamento

Novo no speedcubing? Clique no ícone **?** ao lado do scramble para aprender:
- O que significam as letras (R, L, U, D, F, B)
- Como funcionam os modificadores (', 2)
- Exemplos práticos de movimentos
- Dicas importantes para iniciantes

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
- **Vite** (build tool ultrarrápido)
- **Tailwind CSS v4** (estilização com CSS nativo e CSS variables)
- **Zustand** (gerenciamento de estado com persistência)
- **Lucide React** (biblioteca de ícones moderna)
- **Framer Motion** (animações fluidas e performáticas)
- **Web Audio API** (sistema de sons sintetizados)
- **Biome** (linter e formatter rápido)
- **Vitest** + **React Testing Library** (testes unitários)
- **Sistema de i18n** customizado com 3 idiomas
- **Vite PWA Plugin** (Progressive Web App completo)

## 📁 Estrutura do Projeto

```
src/
├── components/         # React components
│   ├── TimerDisplay.tsx
│   ├── ScrambleBox.tsx
│   ├── InspectionDisplay.tsx
│   ├── StatCard.tsx
│   ├── SolveTable.tsx
│   ├── Toast.tsx
│   ├── PWAUpdatePrompt.tsx
│   ├── LanguageSelector.tsx
│   ├── SessionSwitcher.tsx
│   ├── settingsModal/
│   │   ├── SettingsModal.tsx
│   │   └── index.ts
│   ├── sessionManagerModal/
│   │   ├── SessionManagerModal.tsx
│   │   ├── useSessionManager.ts
│   │   └── index.ts
│   ├── scrambleGuideModal/
│   │   ├── ScrambleGuideModal.tsx
│   │   ├── useScrambleGuideModal.ts
│   │   └── index.ts
│   └── statsInfoModal/
│       ├── StatsInfoModal.tsx
│       └── index.ts
├── features/           # Business logic
│   ├── timer/
│   │   └── useTimer.ts
│   ├── scramble/
│   │   ├── generate3x3.ts
│   │   └── generate3x3.test.ts
│   └── stats/
│       ├── averages.ts
│       └── averages.test.ts
├── stores/             # Zustand stores
│   ├── sessionsStore.ts
│   ├── settingsStore.ts
│   └── i18nStore.ts
├── i18n/              # Internationalization
│   └── locales/
│       ├── pt-BR.ts
│       ├── en-US.ts
│       └── es-ES.ts
├── hooks/             # Custom hooks
│   ├── useTranslation.ts
│   └── useTheme.ts
├── utils/             # Utility functions
│   ├── formatTime.ts
│   ├── formatStats.ts
│   ├── animations.ts
│   └── sounds.ts
├── types/             # TypeScript definitions
│   └── index.ts
└── test/              # Test configuration
    └── setup.ts
```

## 💻 Code Standards

- **Comments**: Minimal, only when necessary to explain complex/non-obvious logic. Always in **English**.
- **Clean Code**: Self-documenting code preferred over excessive comments
- **TypeScript**: Strict mode enabled for type safety
- **Testing**: Comprehensive tests for business logic

## ✅ Status de Implementação

### ✨ Concluído

#### Core Features
- [x] Configuração base do projeto (Vite + React + TypeScript + Tailwind v4)
- [x] Gerador de scrambles 3×3 válidos (25 movimentos, sem repetição de faces)
- [x] Hook useTimer com máquina de estados (idle → inspection → running → stopped)
- [x] Sistema de penalidades (+2, DNF) com atalhos de teclado
- [x] Persistência automática em localStorage
- [x] Atalhos de teclado (Space, N, P, D)

#### UI/UX
- [x] Componentes responsivos (TimerDisplay, ScrambleBox, InspectionDisplay, StatCard, Toast)
- [x] Animações fluidas com Framer Motion
- [x] Design mobile-first com breakpoints responsivos
- [x] Feedback visual aprimorado (toasts, animações, transições)
- [x] **Tema claro e escuro** com toggle no Settings
- [x] Ícones modernos com Lucide React

#### Estatísticas
- [x] Cálculo de Single, ao5, ao12, best ao5, best ao12
- [x] Cards de estatísticas animados com regras de DNF/+2
- [x] 20+ testes abrangentes para cálculo de médias
- [x] Modal educativo explicando estatísticas para iniciantes
- [x] Botão para limpar estatísticas com confirmação

#### Histórico & Sessões
- [x] Tabela de histórico de solves com filtros (últimos 5/12/50/100 ou todos)
- [x] Modal de detalhes do solve com scramble copiável
- [x] Deletar solves individuais com confirmação
- [x] **Sistema de sessões** - criar, renomear, deletar e trocar entre sessões
- [x] Gerenciador de sessões com modal completo
- [x] Cada sessão com estatísticas e histórico independentes

#### Internacionalização
- [x] Sistema i18n customizado com 3 idiomas
- [x] 🇧🇷 Português (pt-BR) - padrão
- [x] 🇺🇸 English (en-US)
- [x] 🇪🇸 Español (es-ES)
- [x] Seletor de idioma no header com persistência

#### Configurações
- [x] Modal de configurações completo
- [x] Duração da inspeção ajustável (5-30s)
- [x] Toggle de sons (on/off)
- [x] Penalidade automática de inspeção (regras WCA)
- [x] **Exportar/Importar JSON** (sessão atual ou todas)
- [x] Modos de importação (merge/replace) com validação

#### Sistema de Sons
- [x] Web Audio API com beeps sintetizados
- [x] 7 eventos sonoros (ready, start, stop, warnings, success, error)
- [x] Compatibilidade cross-browser (AudioContext + webkitAudioContext)
- [x] Lazy initialization para performance

#### Guia para Iniciantes
- [x] **Modal de guia de embaralhamento** com 4 seções
- [x] Explicação de faces (R/L/U/D/F/B) com cores visuais
- [x] Explicação de modificadores (', 2)
- [x] Exemplos práticos e dicas
- [x] Botão de ajuda (?) no ScrambleBox
- [x] Traduzido para os 3 idiomas

#### PWA (Progressive Web App)
- [x] Service Worker configurado
- [x] Manifest com ícones e metadados
- [x] Funciona offline após primeiro acesso
- [x] Instalável em dispositivos móveis
- [x] Notificação de atualizações disponíveis

#### Testes
- [x] Testes do gerador de scramble
- [x] Testes de cálculo de estatísticas (20+ cenários)
- [x] Configuração Vitest + React Testing Library

### 🚧 Próximos passos

- [ ] Onboarding interativo para novos usuários
- [ ] Gráficos de evolução de desempenho
- [ ] Estatísticas avançadas (desvio padrão, TPS médio)
- [ ] Modo de treino por casos (PLL, OLL, F2L)
- [ ] Sincronização opcional na nuvem
- [ ] Tutorial de resolução para iniciantes

## 🧪 Testes

```bash
# Executar todos os testes
pnpm test

# Executar testes em modo watch
pnpm test:watch

# Executar testes com UI
pnpm test:ui

# Executar testes com coverage
pnpm test:coverage
```

### Cobertura de testes

- ✅ Gerador de scrambles (validação de 25 movimentos, sem repetição)
- ✅ Cálculo de estatísticas (20+ cenários incluindo DNF/+2)
- ✅ Regras de descarte (melhor e pior tempo)
- ✅ Edge cases (arrays vazios, múltiplos DNFs, etc.)

## 🎨 Temas

O Klick suporta **tema claro** e **tema escuro** com:

- 🌙 **Tema Escuro** (padrão): Fundo `#0D1117`, cores suaves para os olhos
- ☀️ **Tema Claro**: Fundo branco, contraste otimizado para ambientes claros
- 🎨 **CSS Variables**: Sistema baseado em variáveis CSS para fácil customização
- ⚡ **Transições suaves**: Animações de 0.2s ao alternar temas
- 💾 **Persistência**: Preferência salva em localStorage

Alterne entre temas no menu **Configurações** (⚙️).

## 🔊 Sistema de Sons

Feedback sonoro para eventos importantes:

- 🎵 **Timer Ready**: Som suave ao segurar espaço
- ▶️ **Timer Start**: Beep ao iniciar cronômetro
- ⏹️ **Timer Stop**: Beep de confirmação ao parar
- ⚠️ **Inspection Warning**: Aviso aos 15s
- 🚨 **Inspection Critical**: Beep duplo urgente aos 17s
- ✅ **Success**: Feedback para ações bem-sucedidas
- ❌ **Error**: Feedback para erros

Ative/desative sons no menu **Configurações**.

## 📊 Sistema de Estatísticas

### Métricas calculadas

- **Single**: Melhor tempo individual
- **ao5** (Average of 5): Média dos últimos 5 solves, descartando melhor e pior
- **ao12** (Average of 12): Média dos últimos 12 solves, descartando melhor e pior
- **Best ao5**: Melhor ao5 de todas as janelas
- **Best ao12**: Melhor ao12 de todas as janelas

### Regras especiais

- **2+ DNFs** na janela → média = DNF
- **+2** já incluído no tempo efetivo
- **Descarte** automático de melhor e pior tempo (exceto DNFs)

Clique no ícone **?** ao lado de "Estatísticas" para ver o guia completo!

## 📝 Licença

MIT

---

**Desenvolvido com ❤️ para a comunidade de speedcubing**
