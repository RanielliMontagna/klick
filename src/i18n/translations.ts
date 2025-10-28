export const translations = {
  'pt-BR': {
    app: {
      title: 'Klick',
      tagline: 'gire, clique, evolua.',
    },
    scramble: {
      title: 'Embaralhamento',
      copy: 'Copiar',
      new: 'Novo',
      generating: 'Gerando embaralhamento...',
      copySuccess: 'Copiado!',
    },
    timer: {
      inspection: 'Inspeção',
      ready: 'Pronto',
      running: 'Correndo',
      stopped: 'Parado',
      pressSpace: 'Pressione ESPAÇO',
      holdSpace: 'Segure ESPAÇO para começar a inspeção',
    },
    shortcuts: {
      title: 'Atalhos',
      space: 'Iniciar/Parar',
      newScramble: 'Novo embaralhamento',
      togglePlus2: 'Alternar +2',
      toggleDNF: 'Alternar DNF',
      undo: 'Desfazer',
    },
    penalties: {
      none: 'Sem penalidade',
      plus2: '+2 segundos',
      dnf: 'DNF (Did Not Finish)',
      warning: 'Atenção',
      critical: 'Crítico',
    },
    stats: {
      single: 'Melhor Tempo',
      ao5: 'Média de 5',
      ao12: 'Média de 12',
      bestAo5: 'Melhor ao5',
      bestAo12: 'Melhor ao12',
      current: 'Atual',
      best: 'Melhor',
      average: 'Média',
      clear: 'Limpar Estatísticas',
      clearConfirmTitle: 'Limpar todos os solves?',
      clearConfirmMessage: 'Esta ação irá deletar permanentemente todos os solves da sessão atual. Esta ação não pode ser desfeita.',
      clearSuccess: 'Estatísticas limpas com sucesso!',
      help: 'Ajuda',
      learnMore: 'Saiba mais',
      info: {
        title: 'Entendendo as Estatísticas',
        single: {
          title: 'Single (Melhor Tempo)',
          description: 'É o seu tempo mais rápido em um único solve. Mostra o melhor que você já conseguiu fazer.',
          example: 'Se você fez solves de 15s, 12s e 18s, seu single é 12s.',
        },
        ao5: {
          title: 'ao5 (Average of 5)',
          description: 'Média dos seus últimos 5 solves, descartando o melhor e o pior tempo. Isso dá uma visão mais precisa do seu desempenho consistente.',
          example: 'Tempos: 15s, 12s, 18s, 14s, 16s\nDescarta: 12s (melhor) e 18s (pior)\nMédia: (15 + 14 + 16) ÷ 3 = 15s',
          rule: 'Se houver 2 ou mais DNFs nos últimos 5 solves, a média é DNF.',
        },
        ao12: {
          title: 'ao12 (Average of 12)',
          description: 'Funciona igual ao ao5, mas com os últimos 12 solves. É ainda mais precisa para medir consistência.',
          example: 'Pega os últimos 12 tempos, remove o melhor e o pior, e calcula a média dos 10 restantes.',
          rule: 'Se houver 2 ou mais DNFs nos últimos 12 solves, a média é DNF.',
        },
        bestAo5: {
          title: 'Best ao5 (Melhor ao5)',
          description: 'A melhor média de 5 consecutivos que você já fez. É o seu recorde pessoal de ao5.',
          example: 'Entre todas as sequências de 5 solves consecutivos, esta é a que teve a melhor média.',
        },
        bestAo12: {
          title: 'Best ao12 (Melhor ao12)',
          description: 'A melhor média de 12 consecutivos que você já fez. É o seu recorde pessoal de ao12.',
          example: 'Entre todas as sequências de 12 solves consecutivos, esta é a que teve a melhor média.',
        },
        penalties: {
          title: 'Penalidades',
          plus2: '+2: Adiciona 2 segundos ao tempo (ajuste incorreto do cubo ao final)',
          dnf: 'DNF (Did Not Finish): Solve inválido (não resolveu, violou regras de inspeção, etc.)',
        },
      },
    },
    actions: {
      save: 'Salvar',
      cancel: 'Cancelar',
      delete: 'Deletar',
      export: 'Exportar',
      import: 'Importar',
      edit: 'Editar',
      create: 'Criar',
      confirm: 'Confirmar',
      close: 'Fechar',
      viewDetails: 'Ver Detalhes',
      back: 'Voltar',
    },
    solveTable: {
      title: 'Histórico de Solves',
      empty: 'Nenhum solve registrado ainda',
      columns: {
        number: '#',
        time: 'Tempo',
        scramble: 'Scramble',
        date: 'Data',
        penalty: 'Penalidade',
        actions: 'Ações',
      },
      filter: {
        label: 'Mostrar',
        all: 'Todos',
        last5: 'Últimos 5',
        last12: 'Últimos 12',
        last50: 'Últimos 50',
        last100: 'Últimos 100',
      },
      deleteConfirm: {
        title: 'Deletar solve?',
        message: 'Esta ação não pode ser desfeita.',
      },
      details: {
        title: 'Detalhes do Solve',
        solveNumber: 'Solve',
        time: 'Tempo',
        penalty: 'Penalidade',
        scramble: 'Scramble',
        date: 'Data',
      },
    },
    inspection: {
      warningTime: 'Tempo de atenção!',
      penaltyPlus2: '+2 será aplicado',
      penaltyDNF: 'DNF será aplicado',
    },
  },
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = typeof translations['pt-BR'];

export function getTranslation(lang: Language = 'pt-BR'): TranslationKey {
  return translations[lang];
}
