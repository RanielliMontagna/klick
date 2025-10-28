/**
 * Gerador de scrambles 3x3 válidos
 * Gera 25 movimentos sem repetir a mesma face consecutivamente
 */

const FACES = ['R', 'L', 'U', 'D', 'F', 'B'] as const;
const MODIFIERS = ['', '2', "'"] as const;

type Face = (typeof FACES)[number];

/**
 * Gera um scramble 3x3 válido de 25 movimentos
 * Regras:
 * - Não repete a mesma face consecutivamente (ex: R U R é inválido)
 * - Usa faces: R, L, U, D, F, B
 * - Usa modificadores: '', 2, '
 */
export function generate3x3Scramble(): string {
  const moves: string[] = [];
  let lastFace: Face | null = null;

  for (let i = 0; i < 25; i++) {
    let face: Face;
    
    // Garante que não repete a mesma face consecutivamente
    do {
      face = FACES[Math.floor(Math.random() * FACES.length)];
    } while (face === lastFace);

    const modifier = MODIFIERS[Math.floor(Math.random() * MODIFIERS.length)];
    moves.push(`${face}${modifier}`);
    lastFace = face;
  }

  return moves.join(' ');
}
