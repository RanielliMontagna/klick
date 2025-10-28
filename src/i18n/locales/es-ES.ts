export const esES = {
  app: {
    title: 'Klick',
    tagline: 'gira, haz clic, evoluciona.',
  },
  language: {
    title: 'Idioma',
    'pt-BR': 'Português (BR)',
    'en-US': 'English (US)',
    'es-ES': 'Español (ES)',
  },
  scramble: {
    title: 'Mezcla',
    copy: 'Copiar',
    new: 'Nueva',
    generating: 'Generando mezcla...',
    copySuccess: '¡Copiado!',
  },
  timer: {
    inspection: 'Inspección',
    ready: 'Listo',
    running: 'Ejecutando',
    stopped: 'Detenido',
    pressSpace: 'Presiona ESPACIO',
    holdSpace: 'Mantén ESPACIO para comenzar inspección',
  },
  shortcuts: {
    title: 'Atajos',
    space: 'Iniciar/Detener',
    newScramble: 'Nueva mezcla',
    togglePlus2: 'Alternar +2',
    toggleDNF: 'Alternar DNF',
    undo: 'Deshacer',
  },
  penalties: {
    none: 'Sin penalización',
    plus2: '+2 segundos',
    dnf: 'DNF (Did Not Finish)',
    warning: 'Advertencia',
    critical: 'Crítico',
  },
  stats: {
    single: 'Mejor Tiempo',
    ao5: 'Promedio de 5',
    ao12: 'Promedio de 12',
    bestAo5: 'Mejor ao5',
    bestAo12: 'Mejor ao12',
    current: 'Actual',
    best: 'Mejor',
    average: 'Promedio',
    clear: 'Limpiar Estadísticas',
    clearConfirmTitle: '¿Limpiar todos los solves?',
    clearConfirmMessage:
      'Esta acción eliminará permanentemente todos los solves de la sesión actual. Esta acción no se puede deshacer.',
    clearSuccess: '¡Estadísticas limpiadas con éxito!',
    help: 'Ayuda',
    learnMore: 'Aprende más',
    info: {
      title: 'Entendiendo las Estadísticas',
      single: {
        title: 'Single (Mejor Tiempo)',
        description: 'Tu tiempo más rápido en un solo solve. Muestra lo mejor que has logrado.',
        example: 'Si hiciste solves de 15s, 12s y 18s, tu single es 12s.',
      },
      ao5: {
        title: 'ao5 (Promedio de 5)',
        description:
          'Promedio de tus últimos 5 solves, descartando el mejor y el peor tiempo. Esto da una visión más precisa de tu rendimiento consistente.',
        example:
          'Tiempos: 15s, 12s, 18s, 14s, 16s\nDescarta: 12s (mejor) y 18s (peor)\nPromedio: (15 + 14 + 16) ÷ 3 = 15s',
        rule: 'Si hay 2 o más DNFs en los últimos 5 solves, el promedio es DNF.',
      },
      ao12: {
        title: 'ao12 (Promedio de 12)',
        description:
          'Funciona igual que ao5, pero con los últimos 12 solves. Aún más preciso para medir consistencia.',
        example:
          'Toma los últimos 12 tiempos, elimina el mejor y el peor, y calcula el promedio de los 10 restantes.',
        rule: 'Si hay 2 o más DNFs en los últimos 12 solves, el promedio es DNF.',
      },
      bestAo5: {
        title: 'Best ao5 (Mejor ao5)',
        description:
          'El mejor promedio de 5 consecutivos que has hecho. Es tu récord personal de ao5.',
        example:
          'Entre todas las secuencias de 5 solves consecutivos, esta es la que tuvo el mejor promedio.',
      },
      bestAo12: {
        title: 'Best ao12 (Mejor ao12)',
        description:
          'El mejor promedio de 12 consecutivos que has hecho. Es tu récord personal de ao12.',
        example:
          'Entre todas las secuencias de 12 solves consecutivos, esta es la que tuvo el mejor promedio.',
      },
      penalties: {
        title: 'Penalizaciones',
        plus2: '+2: Añade 2 segundos al tiempo (ajuste incorrecto del cubo al final)',
        dnf: 'DNF (Did Not Finish): Solve inválido (no resuelto, violó reglas de inspección, etc.)',
      },
    },
  },
  actions: {
    save: 'Guardar',
    cancel: 'Cancelar',
    delete: 'Eliminar',
    export: 'Exportar',
    import: 'Importar',
    edit: 'Editar',
    create: 'Crear',
    confirm: 'Confirmar',
    close: 'Cerrar',
    viewDetails: 'Ver Detalles',
    back: 'Volver',
  },
  sessions: {
    title: 'Sesiones',
    current: 'Sesión Actual',
    create: 'Nueva Sesión',
    rename: 'Renombrar Sesión',
    delete: 'Eliminar Sesión',
    switch: 'Cambiar Sesión',
    manage: 'Gestionar Sesiones',
    name: 'Nombre de la Sesión',
    namePlaceholder: 'Ingresa el nombre de la sesión',
    createSuccess: '¡Sesión creada con éxito!',
    renameSuccess: '¡Sesión renombrada con éxito!',
    deleteSuccess: '¡Sesión eliminada con éxito!',
    deleteConfirm: {
      title: '¿Eliminar sesión?',
      message:
        'Todos los solves de esta sesión se perderán permanentemente. Esta acción no se puede deshacer.',
    },
    cannotDeleteLast: 'No se puede eliminar la última sesión',
    solveCount: 'solves',
    solveCountSingular: 'solve',
  },
  solveTable: {
    title: 'Historial de Solves',
    empty: 'Aún no hay solves registrados',
    columns: {
      number: '#',
      time: 'Tiempo',
      scramble: 'Mezcla',
      date: 'Fecha',
      penalty: 'Penalización',
      actions: 'Acciones',
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
      title: '¿Eliminar solve?',
      message: 'Esta acción no se puede deshacer.',
    },
    details: {
      title: 'Detalles del Solve',
      solveNumber: 'Solve',
      time: 'Tiempo',
      penalty: 'Penalización',
      scramble: 'Mezcla',
      date: 'Fecha',
    },
  },
  inspection: {
    warningTime: '¡Tiempo de advertencia!',
    penaltyPlus2: '+2 será aplicado',
    penaltyDNF: 'DNF será aplicado',
  },
  settings: {
    title: 'Configuración',
    inspectionDuration: {
      label: 'Duración de Inspección',
      description: 'Tiempo disponible para inspeccionar el cubo antes de comenzar',
      seconds: 'segundos',
    },
    soundsEnabled: {
      label: 'Sonidos Habilitados',
      description: 'Activar sonidos de retroalimentación durante el cronómetro',
    },
    autoInspectionPenalty: {
      label: 'Penalización Automática de Inspección',
      description: '+2 entre 15-17s, DNF después de 17s (siguiendo reglas oficiales de la WCA)',
    },
    theme: {
      label: 'Tema',
      description: 'Apariencia visual de la aplicación',
      dark: 'Oscuro',
      light: 'Claro',
    },
    exportImport: {
      title: 'Exportar/Importar Datos',
      exportCurrent: 'Exportar Sesión Actual',
      exportAll: 'Exportar Todas las Sesiones',
      import: 'Importar Sesiones',
      importMode: 'Modo de Importación',
      merge: 'Combinar con sesiones existentes',
      replace: 'Reemplazar todas las sesiones',
      exportSuccess: '¡Datos exportados con éxito!',
      importSuccess: '¡Datos importados con éxito!',
      importError: 'Error al importar datos. Por favor verifica el formato del archivo.',
    },
  },
} as const;
