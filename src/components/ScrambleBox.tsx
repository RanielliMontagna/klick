interface ScrambleBoxProps {
  scramble: string;
  onNewScramble: () => void;
}

export function ScrambleBox({ scramble, onNewScramble }: ScrambleBoxProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(scramble);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-300">Scramble</h2>
          <div className="flex gap-2">
            <button
              onClick={copyToClipboard}
              className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              title="Copiar scramble"
            >
              📋 Copiar
            </button>
            <button
              onClick={onNewScramble}
              className="px-3 py-1 text-sm bg-primary hover:bg-purple-600 rounded-lg transition-colors font-medium"
              title="Novo scramble (N)"
            >
              🔄 Novo
            </button>
          </div>
        </div>
        
        <div className="font-mono text-2xl text-white break-words leading-relaxed">
          {scramble || 'Gerando scramble...'}
        </div>
      </div>
    </div>
  );
}
