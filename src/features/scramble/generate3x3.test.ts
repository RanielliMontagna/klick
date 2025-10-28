import { describe, it, expect } from 'vitest';
import { generate3x3Scramble } from './generate3x3';

describe('generate3x3Scramble', () => {
  it('deve gerar um scramble com 25 movimentos', () => {
    const scramble = generate3x3Scramble();
    const moves = scramble.split(' ');
    expect(moves).toHaveLength(25);
  });

  it('não deve repetir a mesma face consecutivamente', () => {
    const scramble = generate3x3Scramble();
    const moves = scramble.split(' ');
    
    for (let i = 1; i < moves.length; i++) {
      const currentFace = moves[i][0];
      const previousFace = moves[i - 1][0];
      expect(currentFace).not.toBe(previousFace);
    }
  });

  it('deve usar apenas faces válidas (R, L, U, D, F, B)', () => {
    const scramble = generate3x3Scramble();
    const moves = scramble.split(' ');
    const validFaces = ['R', 'L', 'U', 'D', 'F', 'B'];
    
    for (const move of moves) {
      const face = move[0];
      expect(validFaces).toContain(face);
    }
  });

  it('deve usar apenas modificadores válidos (\'\', 2, \')', () => {
    const scramble = generate3x3Scramble();
    const moves = scramble.split(' ');
    const validModifiers = ['', '2', "'"];
    
    for (const move of moves) {
      const modifier = move.slice(1);
      expect(validModifiers).toContain(modifier);
    }
  });

  it('deve gerar scrambles diferentes em múltiplas execuções', () => {
    const scramble1 = generate3x3Scramble();
    const scramble2 = generate3x3Scramble();
    const scramble3 = generate3x3Scramble();
    
    // É extremamente improvável que 3 scrambles sejam iguais
    const allSame = scramble1 === scramble2 && scramble2 === scramble3;
    expect(allSame).toBe(false);
  });
});
