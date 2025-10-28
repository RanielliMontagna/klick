# Klick

Tagline: gire, clique, evolua.

Essência: cronômetro de cubo mágico com IU limpa, explicando métricas (ao5/ao12) de forma visual e com feedback instantâneo.

Proposta de valor:

- Clareza primeiro: tempos, médias e PB sem poluição.
- Aprenda jogando: dicas curtas sobre ao5/ao12 e TPS após cada sessão.
- Aconchego visual: contraste alto, tipografia grande, zero distração.

# 0) Contexto & Objetivo

Você é um **engenheiro front-end sênior**. Gere uma aplicação web tipo **csTimer** com funções **básicas**, porém com **UI mais amigável e fácil de entender**.

**Stack desejada:** React + TypeScript + Vite + Tailwind CSS  
**Estado:** Zustand (ou Context + Reducer, preferir Zustand)  
**Persistência:** localStorage (ou IndexedDB se necessário)  
**Qualidade:** Biome + Vitest + React Testing Library (testes de médias e penalidades)

---

## ⚠️ REGRA IMPORTANTE DE DOCUMENTAÇÃO

**NUNCA crie arquivos `.md` adicionais para documentar fases, mudanças ou progresso.**

- ✅ **Use apenas**: `PROJECT.md` e `README.md`
- ❌ **NÃO crie**: `FASE1.md`, `FASE2.md`, `CHANGELOG.md`, `UPDATES.md`, etc.
- Toda documentação de progresso deve estar na seção **"Status do Projeto"** deste arquivo
- Atualizações devem ser refletidas no **README.md** conforme necessário

---

# 1) Escopo do Produto

Implemente um timer de cubo mágico para iniciantes que atenda:

1. Scrambles 3×3 (25 movimentos, sem repetir face consecutiva).
2. **Inspeção de 15s** com aviso visual/sonoro.
3. Cronômetro com **barra de espaço** (armar → iniciar/parar).
4. Registro de solves com **+2** e **DNF** por solve.
5. Cálculo de **Single, ao5 e ao12** (descarta melhor e pior, regras DNF/+2).
6. Histórico com filtros e **exportar/importar JSON**.
7. **Onboarding** curto (tooltips/coach-marks).
8. **pt-BR** como idioma padrão.

---

# 2) Diretrizes de UI/UX

- **Tema dark-first (Soft Slate):**
  - Fundo `#0D1117`, cinzas neutros, primário `#7C4DFF`, acento opcional `#39FF88`.
- Cards com **rounded-2xl**, sombras suaves, tipografia legível, espaçamento generoso.
- Responsivo (desktop e mobile).
- Acessibilidade: foco visível, ARIA onde necessário, contraste AA.
- **Onboarding iniciante:** tooltips que explicam Space, Scramble e Estatísticas.
- **Modo iniciante:** inspeção automática + avisos grandes.

---

# 3) Páginas & Seções

## / (Home/Timer)

- Header com título e menu: **Configurações**, **Sessões**, **Exportar/Importar**.
- **Scramble atual** grande e legível (copiável).
- **Timer** grande + contador de inspeção (barra/anel).
- Botões: **Novo scramble**, **Marcar +2**, **Marcar DNF**, **Desfazer último**.
- **Atalhos:**
  - `Space` iniciar/parar
  - `N` novo scramble
  - `P` togglar +2 último
  - `D` togglar DNF último
  - `U` desfazer
- Mini-cards: **Single**, **ao5**, **ao12**, **Best ao5**, **Best ao12**.
- **Tabela de solves** (tempo, data, scramble, +2/DNF), filtro por últimos 5/12/50.

## /settings (Configurações)

- Duração da inspeção (default 15s).
- Sons (on/off).
- Colunas visíveis na tabela.
- Tema (dark padrão).
- **Regra automática de inspeção** (ON/OFF): +2 entre 15–17s, DNF >17s.

## /sessions (Sessões)

- Criar/renomear/deletar sessão.
- Trocar sessão ativa (cada sessão tem solves e stats próprios).

## Exportar/Importar

- Exportar **JSON** da sessão/geral.
- Importar **JSON** (merge ou substituir).

---

# 4) Modelo de Dados

```ts
type Penalty = "NONE" | "+2" | "DNF";

type Solve = {
  id: string; // uuid
  timeMs: number; // tempo bruto em ms
  penalty: Penalty; // penalidade aplicada
  effectiveMs: number; // timeMs ajustado (+2) ou Infinity se DNF
  scramble: string; // notação 3x3
  createdAt: string; // ISO
};

type Session = {
  id: string;
  name: string;
  solves: Solve[];
};
```

---

# 5) Lógica de Negócio

## Inspeção

- 0–15s: válido.
- 15–17s: **+2** automático (se regra estiver ON).
- > 17s: **DNF** automático (se regra estiver ON).
- Permitir desligar essa regra em Configurações.

## Cálculo de ao5/ao12

- Dado array de `effectiveMs`:
  - **≥2 DNFs** (Infinity) na janela → média = **DNF**.
  - Caso contrário, **descarte 1 melhor** e **1 pior** e tire a média do restante.
- `+2` já embutido em `effectiveMs` (timeMs + 2000).

## Interações

- **Space**: segurar para “armar”, soltar inicia; apertar novamente para parar.
- Ignorar atalhos quando foco estiver em inputs/modais.

---

# 6) Gerador de Scramble 3×3

Requisitos mínimos:

- 25 movimentos dentre `R L U D F B` com sufixos `'', 2, '`.
- **Não repetir a mesma face consecutiva**.
- Evitar padrões degenerados simples (priorize a regra de não repetir face).

Implementação atual:

- `generate3x3.ts` mantém listas imutáveis (`FACES`, `MODIFIERS`) e sorteia cada passo.
- `getRandomFace(lastFace)` filtra a face anterior, garantindo que nenhuma face se repita em sequência.
- O modificador (`'', 2, '`) é escolhido de forma uniforme e concatenado antes de inserir no array final.
- Ao final, os 25 movimentos são unidos por espaço, mantendo compatibilidade com leitores de scramble da WCA.
- Regras adicionais (ex.: bloqueio de padrões inversos) podem ser adicionadas sem alterar a API exposta ao restante da aplicação.
- **Explicação para iniciantes (implementado):** tooltip no `ScrambleBox` descrevendo faces (`R/L/U/D/F/B`), modificadores (`'`, `2`) e orientações para executar o embaralhamento antes do solve.

---

# 7) Arquitetura & Pastas

```
/src
  /components
    TimerDisplay.tsx
    ScrambleBox.tsx
    StatCard.tsx
    SolveTable.tsx
    SessionSwitcher.tsx
    Toast.tsx
  /features
    timer/
      useTimer.ts     // máquina de estados: idle → inspection → running → stopped
    scramble/
      generate3x3.ts
    stats/
      averages.ts     // single/ao5/ao12; regras de DNF/+2
    storage/
      sessions.ts     // persistência local
  /stores
    sessionsStore.ts  // Zustand
    settingsStore.ts
  /pages
    index.tsx
    settings.tsx
    sessions.tsx
  /hooks
  /utils
  /styles
```

---

# 8) Testes (Vitest)

- `averages.test.ts`:

  - (a) sem penalidade
  - (b) 1 DNF
  - (c) 2 DNFs
  - (d) um `+2`
  - (e) múltiplos `+2`
  - Validar descarte min/max.

- `generate3x3.test.ts`:

  - Tamanho 25
  - Não repetir face consecutiva

- `useTimer.test.ts`:
  - Transições de estado
  - Aplicação da penalidade por inspeção

---

# 9) Entregáveis

- Projeto completo com `README.md` explicando:
  - `pnpm i && pnpm dev`
  - `pnpm build`
- `design.md` com decisões de UX e acessibilidade.
- **PWA (opcional):** manifest + service worker simples.

---

# 10) Aceite / Checklist

- [x] Timer funcional com Space (idle/inspection/running/stop).
- [x] Scramble 3×3 válido a cada solve.
- [x] **+2** e **DNF** por botão/atalho e regra de inspeção (opcional).
- [x] Cálculo correto de **ao5/ao12** (com regras de DNF).
- [x] Sessões separadas e persistentes.
- [x] Exportar/Importar JSON.
- [x] UI clara, responsiva e acessível (dark-first).
- [x] Testes principais passando.
- [x] **PWA:** manifest + service worker para instalação e uso offline.

---

## Status do Projeto - Fase 2 Concluída ✅

### Implementado

1. **Base tecnológica completa:**

   - Vite + React 19 + TypeScript
   - Tailwind CSS v4 configurado (tema dark-first com CSS nativo)
   - Zustand com persistência em localStorage
   - Biome para linting
   - Vitest + React Testing Library
   - Lucide React para ícones
   - Framer Motion para animações fluidas
   - Sistema de i18n customizado

2. **Timer funcional:**

   - Estados: idle → inspection → running → stopped
   - Controle via Space bar (segurar/soltar/pressionar)
   - Contador de inspeção de 15s com avisos visuais
   - Aplicação automática de penalidades por tempo de inspeção
   - Ícones e animações para feedback visual
   - Animações suaves entre estados

3. **Gerador de scrambles:**

   - Scrambles 3×3 válidos (25 movimentos)
   - Sem repetição de faces consecutivas
   - Testes completos passando
   - Animação ao gerar novo scramble
   - Tooltip educativo explicando notação e execução do embaralhamento para iniciantes

4. **Componentes UI (Mobile-First):**

   - TimerDisplay (responsivo, animado, com ícones)
   - ScrambleBox (adaptativo mobile/desktop, feedback ao copiar)
   - InspectionDisplay (animações de pulse, avisos visuais)
   - StatCard (hover effects, animações scale)
   - Toast (responsivo, animação slide-in)

5. **Sistema de animações:**

   - Variantes reutilizáveis (fadeIn, slideUp, slideDown, scale, etc.)
   - AnimatePresence para transições suaves
   - Micro-interações (whileHover, whileTap)
   - Animações baseadas em estado

6. **Design Mobile-First:**

   - Breakpoints responsivos (sm, md, lg)
   - Touch-friendly (botões maiores em mobile)
   - Tipografia escalável
   - Layout adaptativo
   - Performance otimizada para mobile

7. **Sistema de penalidades:**

   - Atalhos P e D para alternar +2 e DNF
   - Salvamento automático de solves
   - Cálculo de effectiveMs considerando penalidades

8. **Internacionalização:**

   - Sistema i18n completo
   - Traduções em pt-BR
   - Hook useTranslation para fácil acesso
   - Store dedicada para gerenciar idioma

9. **Atalhos de teclado:**

   - Space: iniciar/parar timer
   - N: novo scramble
   - P: toggle +2
   - D: toggle DNF

10. **PWA (Progressive Web App):**

    - Instalável em dispositivos móveis
    - Funciona offline com Service Worker
    - Cache de assets para performance
    - Notificação de atualizações disponíveis
    - Ícones e manifest configurados

11. **Sistema de Estatísticas (Fase 2):**
    - Cálculo de **Single** (melhor tempo)
    - Cálculo de **ao5** (average of 5)
    - Cálculo de **ao12** (average of 12)
    - Cálculo de **Best ao5** (melhor ao5 entre todas janelas)
    - Cálculo de **Best ao12** (melhor ao12 entre todas janelas)
    - Regras de DNF: 2+ DNFs na janela → média DNF
    - Descarte de melhor e pior tempo na janela
    - Penalidades +2 consideradas no cálculo
    - 20 testes abrangentes cobrindo todos os cenários
    - Interface com 5 cards de estatísticas animados

### Antes da Fase 3 - Melhorias necessárias:

- **Fase 2.5: Gerenciamento e Educação** ✅
  - [x] Botão para limpar todos os solves da sessão atual (com confirmação)
  - [x] Modal/tooltip explicativo sobre as estatísticas para iniciantes:
    - O que é **Single** (melhor tempo individual)
    - O que é **ao5** (média de 5, descarta melhor e pior)
    - O que é **ao12** (média de 12, descarta melhor e pior)
    - Como funcionam as regras de DNF (2+ DNFs = média DNF)
    - Como funcionam as penalidades +2
    - Botão de ajuda "?" na seção de estatísticas
  - [x] Confirmação antes de limpar dados (modal danger)
  - [x] Feedback visual após limpar (toast de sucesso)
  - [x] Componentes reutilizáveis (ConfirmDialog, StatsInfoModal)

12. **Tabela de Histórico (Fase 3):** ✅

    - Componente **SolveTable** responsivo
    - Colunas: #, Tempo, Scramble, Data, Penalidade, Ações
    - **Filtros**: Todos, Últimos 5/12/50/100
    - Botão de deletar por solve individual
    - **Modal de detalhes** (SolveDetailsModal):
      - Tempo completo com penalidade
      - Scramble copiável
      - Data completa formatada
      - Informações de penalidade com cores
    - Design responsivo (mobile hide scramble, tablet hide date)
    - Animações com Framer Motion
    - Estado vazio tratado

13. **Sistema de Sessões (Fase 4):** ✅
    - Componente **SessionSwitcher** no header
    - Dropdown com lista de todas as sessões
    - Indicador visual da sessão ativa
    - Contagem de solves por sessão
    - **Modal SessionManager** completo:
      - Criar novas sessões com nome personalizado
      - Renomear sessões existentes (modo inline edit)
      - Deletar sessões com confirmação
      - Proteção contra deletar a última sessão
      - Trocar sessão ativa com um clique
    - **Persistência no Zustand Store:**
      - Múltiplas sessões em localStorage
      - Cada sessão independente (solves e stats)
      - Sessão ativa preservada entre reloads
    - **Feedback visual:**
      - Toasts de sucesso para criar/renomear/deletar
      - Toast de erro ao tentar deletar última sessão
      - Animações suaves em modais e transições
    - **Integração completa:**
      - Estatísticas atualizam ao trocar sessão
      - Tabela de solves reflete sessão ativa
      - Atalhos bloqueados quando modal aberto

14. **Internacionalização (Fase 4.5):** ✅
    - **Sistema i18n completo** com 3 idiomas:
      - Português (pt-BR) - padrão
      - English (en-US)
      - Español (es-ES)
    - **Arquivos de tradução organizados:**
      - `/src/i18n/locales/pt-BR.ts`
      - `/src/i18n/locales/en-US.ts`
      - `/src/i18n/locales/es-ES.ts`
      - Barrel export em `/src/i18n/locales/index.ts`
    - **LanguageSelector** no header:
      - Dropdown com bandeiras e nomes dos idiomas
      - Indicador visual do idioma ativo (✓)
      - Responsivo (flag apenas em mobile, flag + nome em desktop)
    - **Traduções completas** para todas as seções:
      - App (título, tagline)
      - Timer e inspeção
      - Scramble
      - Estatísticas (incluindo modal de ajuda)
      - Sessões
      - Tabela de solves
      - Atalhos de teclado
      - Penalidades
      - Ações genéricas
    - **Componentes compartilhados para dropdowns:**
      - `HeaderDropdownButton` - botão padrão para dropdowns
      - `HeaderDropdownMenu` - menu dropdown com backdrop e animações
      - Usado por `LanguageSelector` e `SessionSwitcher`
    - **Mobile-first design:**
      - Header responsivo (stack em mobile, 3 colunas em desktop)
      - Dropdowns adaptados para touch
      - Animações suaves (slideDown, chevron rotation)
    - **Persistência:** Idioma salvo em `localStorage` via `i18nStore`

15. **Configurações e Export/Import (Fase 5):** ✅
    - **Modal de Configurações** (SettingsModal):
      - Duração da inspeção (slider 5-30s, padrão 15s)
      - Sons habilitados (toggle on/off)
      - Penalidade automática de inspeção (toggle on/off)
        - +2 entre 15-17s
        - DNF após 17s
        - Segue regras oficiais da WCA
      - Tema (dark padrão, light coming soon)
    - **Botão Settings no header:**
      - Ícone de engrenagem
      - Integrado ao lado do LanguageSelector
      - Responsivo (ícone em mobile, ícone + texto em desktop)
    - **Export/Import JSON:**
      - **Exportar Sessão Atual:** baixa JSON com sessão ativa
      - **Exportar Todas as Sessões:** baixa JSON com todas as sessões
      - **Importar Sessões:** upload de arquivo JSON
        - Modo **Merge:** adiciona às sessões existentes
        - Modo **Replace:** substitui todas as sessões
      - **Validação completa:**
        - Verifica estrutura do JSON
        - Valida campos obrigatórios (id, name, solves)
        - Retorna erro descritivo se inválido
      - **Feedback visual:**
        - Mensagens de sucesso (verde) e erro (vermelho)
        - Animação de entrada/saída
        - Auto-dismiss após 3-5s
    - **Traduções completas** para settings e export/import
    - **Integração com settingsStore:**
      - Persistência automática em localStorage
      - Atualizações em tempo real
      - Controles responsivos e acessíveis

16. **Sistema de Sons (Fase 5.1):** ✅
    - **Utilitário de sons** (`/src/utils/sounds.ts`):
      - Geração de beeps via Web Audio API
      - Sons sintetizados (sem arquivos externos)
      - Compatibilidade com navegadores (AudioContext + webkitAudioContext)
    - **Eventos sonoros implementados:**
      - **Timer Ready:** som suave ao segurar espaço (pronto para começar)
      - **Timer Start:** beep baixo ao iniciar cronômetro
      - **Timer Stop:** beep de confirmação ao parar
      - **Inspection Warning:** beep suave aos 15s (fim do tempo de inspeção)
      - **Inspection Critical:** beep duplo urgente aos 17s (penalidade DNF iminente)
      - **Success:** beep duplo ascendente (copiar scramble, ações bem-sucedidas)
      - **Error:** beep grave (feedback de erro)
    - **Integração com settings:**
      - Toggle de sons em SettingsModal
      - Verificação `shouldPlaySound()` antes de reproduzir
      - Sons só tocam se `soundsEnabled === true`
    - **Locais de reprodução:**
      - `useTimer`: ready, start, stop, inspection warnings
      - `useScrambleBox`: success ao copiar scramble
      - Preparado para futuras ações (delete, save, etc.)
    - **Performance:**
      - Sons sintetizados (leves, sem download)
      - Lazy initialization do AudioContext
      - Tratamento de erros silencioso (console.warn)

### Próximas fases

- **Lançar tema claro:** definir tokens de cor equivalentes ao dark, adaptar os componentes Tailwind e garantir persistência da escolha de tema.
- **Onboarding interativo:** implementar tooltips contextuais para explicar Space, Scramble e Estatísticas, com opção de revisitar no menu de ajuda.
- **Estatísticas avançadas:** adicionar gráficos simples de evolução (média móvel, distribuição por sessão) e métricas de consistência (desvio padrão, TPS médio).
- **Sincronização opcional:** investigar integração com armazenamento na nuvem (ex.: Supabase) mantendo local-first, incluindo merge de sessões e autenticação leve.
- **Modo de treino por casos:** habilitar coleções focadas (PLL, OLL, F2L) com contadores de repetição, checkpoints e notas rápidas, ajudando o iniciante a praticar algoritmos específicos.
- **Tutorial principiante:** oferecer um passo a passo visual/textual de resolução no método para iniciantes (cruz branca → camadas → OLL/PLL simplificados) acessível pelo onboarding ou modal dedicado.

---

# 11) Notas de Implementação

- Priorize rótulos e mensagens **em pt-BR**.
- **Comentários**: mínimo possível, apenas quando absolutamente necessário para explicar lógica complexa ou não-óbvia. Sempre em **inglês**.
- Trate key repeat da barra de espaço.
- Bloqueie atalhos enquanto um modal/entrada de texto estiver focado.

---

# 12) Regras de Código e Arquitetura

## Separação de Responsabilidades

### Componentes vs Hooks Customizados

**SEMPRE separe lógica de apresentação:**

- ✅ **Componentes (.tsx)**: Foco exclusivo em renderização e UI
  - Estrutura JSX/TSX
  - Estilização (classes Tailwind)
  - Animações (Framer Motion)
  - Event handlers simples (onClick, onChange)
- ✅ **Hooks customizados (.ts)**: Toda a lógica de negócio
  - Estado local (useState, useReducer)
  - Efeitos colaterais (useEffect)
  - Cálculos e transformações de dados
  - Integrações com APIs/stores
  - Callbacks complexos

**Exemplo prático:**

```tsx
// ❌ ERRADO: Lógica misturada no componente
export function MyModal({ data }) {
  const [copied, setCopied] = useState(false);

  const formatDate = (iso) => {
    /* ... */
  };
  const getPenalty = () => {
    /* ... */
  };
  const copyText = () => {
    /* ... */
  };

  return <div>{/* JSX */}</div>;
}

// ✅ CORRETO: Lógica extraída para hook
// hooks/useMyModal.ts
export function useMyModal(data) {
  const [copied, setCopied] = useState(false);

  const formatDate = useCallback((iso) => {
    /* ... */
  }, []);
  const getPenalty = useCallback(() => {
    /* ... */
  }, [data]);
  const copyText = useCallback(() => {
    /* ... */
  }, [data]);

  return { copied, formatDate, getPenalty, copyText };
}

// components/MyModal.tsx
export function MyModal({ data }) {
  const { copied, formatDate, getPenalty, copyText } = useMyModal(data);

  return <div>{/* JSX limpo */}</div>;
}
```

## Nomenclatura de Hooks

- **Padrão**: `use[ComponentName][Responsibility].ts`
- Exemplos:
  - `useSolveDetailsModal.ts` - Lógica do SolveDetailsModal
  - `useSessionManager.ts` - Lógica do SessionManager
  - `useTimerControls.ts` - Controles do timer

## Organização de Pastas

### Estrutura de Componentes com Collocation

**SEMPRE organize componentes complexos em pastas próprias:**

```
/src
  /components
    /solveDetailsModal          # Componente com pasta própria
      ├── SolveDetailsModal.tsx # Componente de UI
      ├── useSolveDetailsModal.ts # Lógica/hook
      └── index.ts              # Export barrel
    /sessionManager
      ├── SessionManager.tsx
      ├── useSessionManager.ts
      └── index.ts
    TimerDisplay.tsx            # Componentes simples ficam na raiz
    ScrambleBox.tsx
    Logo.tsx
  /hooks                        # Apenas hooks genéricos/compartilhados
  /features                     # Lógica de domínio específica
  /stores                       # Estado global (Zustand)
  /utils                        # Funções utilitárias puras
```

### Critérios para Criar Pasta de Componente

Crie uma pasta quando o componente tiver:

1. **Hook customizado associado** (lógica complexa)
2. **Múltiplos arquivos relacionados** (types, utils, hooks)
3. **Sub-componentes** usados apenas por ele
4. **Testes específicos** do componente

### Estrutura de Pasta de Componente

```
/componentName
  ├── ComponentName.tsx       # Componente principal
  ├── useComponentName.ts     # Hook customizado (se necessário)
  ├── ComponentName.types.ts  # Types específicos (opcional)
  ├── ComponentName.utils.ts  # Utilitários (opcional)
  ├── SubComponent.tsx        # Sub-componentes (opcional)
  └── index.ts                # Export barrel (sempre)
```

### Export Barrel Pattern

**SEMPRE crie um `index.ts` para facilitar imports:**

```typescript
// index.ts
export { ComponentName } from "./ComponentName";
export { useComponentName } from "./useComponentName";
export type { ComponentNameProps } from "./ComponentName.types";
```

**Benefícios:**

- Imports limpos: `import { Component } from './components/component'`
- Flexibilidade: Trocar implementação sem mudar imports
- Encapsulamento: Controle sobre o que é exportado

## Quando Criar um Hook Customizado

Crie um hook customizado quando o componente tiver:

1. **Múltiplas funções auxiliares** (formatters, calculators, validators)
2. **Estado local complexo** (mais de 2-3 useState)
3. **Lógica de efeitos colaterais** (useEffect, timers, subscriptions)
4. **Cálculos derivados** que dependem de props/state
5. **Integrações com stores/APIs** além de simples leitura

## Benefícios

- ✅ **Testabilidade**: Hooks podem ser testados isoladamente
- ✅ **Reutilização**: Lógica pode ser compartilhada entre componentes
- ✅ **Legibilidade**: Componentes focam em estrutura visual
- ✅ **Manutenibilidade**: Mudanças de lógica não afetam UI
- ✅ **Performance**: Memoização adequada com useCallback/useMemo

---

# 13) Comandos (esperado no README)

```
pnpm i
pnpm dev
pnpm test
pnpm build
```
