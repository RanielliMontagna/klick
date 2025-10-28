
import LogoPng from '../assets/icon.png'

export function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: {
      container: 'w-6 h-8',
      text: 'text-lg',
    },
    md: {
      container: 'w-10 h-12',
      text: 'text-2xl',
    },
    lg: {
      container: 'w-14 h-16',
      text: 'text-3xl',
    },
  };

  const s = sizes[size];

  return (
    <div className="flex items-center gap-3">
      <img 
        src={LogoPng}
        alt="Klick Logo"
        className={`${s.container} shrink-0`}
      />
      <span className={`${s.text} font-bold text-primary tracking-tight`}>
        Klick
      </span>
    </div>
  );
}
