export const enUS = {
  app: {
    title: 'Klick',
    tagline: 'spin, click, evolve.',
  },
  language: {
    title: 'Language',
    'pt-BR': 'Português (BR)',
    'en-US': 'English (US)',
    'es-ES': 'Español (ES)',
  },
  scramble: {
    title: 'Scramble',
    copy: 'Copy',
    new: 'New',
    generating: 'Generating scramble...',
    copySuccess: 'Copied!',
  },
  timer: {
    inspection: 'Inspection',
    ready: 'Ready',
    running: 'Running',
    stopped: 'Stopped',
    pressSpace: 'Press SPACE',
    holdSpace: 'Hold SPACE to start inspection',
  },
  shortcuts: {
    title: 'Shortcuts',
    space: 'Start/Stop',
    newScramble: 'New scramble',
    togglePlus2: 'Toggle +2',
    toggleDNF: 'Toggle DNF',
    undo: 'Undo',
  },
  penalties: {
    none: 'No penalty',
    plus2: '+2 seconds',
    dnf: 'DNF (Did Not Finish)',
    warning: 'Warning',
    critical: 'Critical',
  },
  stats: {
    single: 'Best Time',
    ao5: 'Average of 5',
    ao12: 'Average of 12',
    bestAo5: 'Best ao5',
    bestAo12: 'Best ao12',
    current: 'Current',
    best: 'Best',
    average: 'Average',
    clear: 'Clear Statistics',
    clearConfirmTitle: 'Clear all solves?',
    clearConfirmMessage:
      'This action will permanently delete all solves from the current session. This cannot be undone.',
    clearSuccess: 'Statistics cleared successfully!',
    help: 'Help',
    learnMore: 'Learn more',
    info: {
      title: 'Understanding Statistics',
      single: {
        title: 'Single (Best Time)',
        description: 'Your fastest time in a single solve. Shows the best you have ever achieved.',
        example: 'If you did solves of 15s, 12s and 18s, your single is 12s.',
      },
      ao5: {
        title: 'ao5 (Average of 5)',
        description:
          'Average of your last 5 solves, discarding the best and worst times. This gives a more accurate view of your consistent performance.',
        example:
          'Times: 15s, 12s, 18s, 14s, 16s\nDiscard: 12s (best) and 18s (worst)\nAverage: (15 + 14 + 16) ÷ 3 = 15s',
        rule: 'If there are 2 or more DNFs in the last 5 solves, the average is DNF.',
      },
      ao12: {
        title: 'ao12 (Average of 12)',
        description:
          'Works the same as ao5, but with the last 12 solves. Even more accurate for measuring consistency.',
        example:
          'Takes the last 12 times, removes the best and worst, and calculates the average of the remaining 10.',
        rule: 'If there are 2 or more DNFs in the last 12 solves, the average is DNF.',
      },
      bestAo5: {
        title: 'Best ao5',
        description:
          'The best average of 5 consecutive solves you have ever done. This is your personal ao5 record.',
        example:
          'Among all sequences of 5 consecutive solves, this is the one that had the best average.',
      },
      bestAo12: {
        title: 'Best ao12',
        description:
          'The best average of 12 consecutive solves you have ever done. This is your personal ao12 record.',
        example:
          'Among all sequences of 12 consecutive solves, this is the one that had the best average.',
      },
      penalties: {
        title: 'Penalties',
        plus2: '+2: Adds 2 seconds to the time (incorrect cube adjustment at the end)',
        dnf: "DNF (Did Not Finish): Invalid solve (didn't solve, violated inspection rules, etc.)",
      },
    },
  },
  actions: {
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    export: 'Export',
    import: 'Import',
    edit: 'Edit',
    create: 'Create',
    confirm: 'Confirm',
    close: 'Close',
    viewDetails: 'View Details',
    back: 'Back',
  },
  sessions: {
    title: 'Sessions',
    current: 'Current Session',
    create: 'New Session',
    rename: 'Rename Session',
    delete: 'Delete Session',
    switch: 'Switch Session',
    manage: 'Manage Sessions',
    name: 'Session Name',
    namePlaceholder: 'Enter session name',
    createSuccess: 'Session created successfully!',
    renameSuccess: 'Session renamed successfully!',
    deleteSuccess: 'Session deleted successfully!',
    deleteConfirm: {
      title: 'Delete session?',
      message:
        'All solves from this session will be permanently lost. This action cannot be undone.',
    },
    cannotDeleteLast: 'Cannot delete the last session',
    solveCount: 'solves',
    solveCountSingular: 'solve',
  },
  solveTable: {
    title: 'Solve History',
    empty: 'No solves recorded yet',
    columns: {
      number: '#',
      time: 'Time',
      scramble: 'Scramble',
      date: 'Date',
      penalty: 'Penalty',
      actions: 'Actions',
    },
    filter: {
      label: 'Show',
      all: 'All',
      last5: 'Last 5',
      last12: 'Last 12',
      last50: 'Last 50',
      last100: 'Last 100',
    },
    deleteConfirm: {
      title: 'Delete solve?',
      message: 'This action cannot be undone.',
    },
    details: {
      title: 'Solve Details',
      solveNumber: 'Solve',
      time: 'Time',
      penalty: 'Penalty',
      scramble: 'Scramble',
      date: 'Date',
    },
  },
  inspection: {
    warningTime: 'Warning time!',
    penaltyPlus2: '+2 will be applied',
    penaltyDNF: 'DNF will be applied',
  },
} as const;
