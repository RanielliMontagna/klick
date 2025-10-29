export const cls = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(' ');
