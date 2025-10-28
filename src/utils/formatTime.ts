/**
 * Formata tempo em ms para mm:ss.SSS
 */
export function formatTime(ms: number): string {
  if (ms === Infinity) return 'DNF';
  if (ms === 0) return '0.000';

  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = ms % 1000;

  if (minutes > 0) {
    return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
  }
  return `${seconds}.${milliseconds.toString().padStart(3, '0')}`;
}

/**
 * Formata tempo em ms para formato curto (sem milissegundos)
 */
export function formatTimeShort(ms: number): string {
  if (ms === Infinity) return 'DNF';
  if (ms === 0) return '0s';

  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes > 0) {
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${seconds}s`;
}
