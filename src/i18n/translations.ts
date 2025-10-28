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
