import React from 'react';

interface EcgWaveformProps {
  color?: 'teal' | 'cyan' | 'coral' | 'navy';
  height?: number;
  className?: string;
  animate?: boolean;
}

export const EcgWaveform: React.FC<EcgWaveformProps> = ({
  color = 'teal',
  height = 48,
  className = '',
  animate = true,
}) => {
  const colorMap = {
    teal: {
      stroke: '#0d9488', // teal-600
      glow: 'rgba(13, 148, 136, 0.45)',
      fill: 'rgba(13, 148, 136, 0.06)',
    },
    cyan: {
      stroke: '#0891b2', // cyan-600
      glow: 'rgba(8, 145, 178, 0.45)',
      fill: 'rgba(8, 145, 178, 0.06)',
    },
    coral: {
      stroke: '#e11d48', // rose-600
      glow: 'rgba(225, 29, 72, 0.45)',
      fill: 'rgba(225, 29, 72, 0.06)',
    },
    navy: {
      stroke: '#0f172a', // slate-900
      glow: 'rgba(15, 23, 42, 0.25)',
      fill: 'rgba(15, 23, 42, 0.04)',
    },
  };

  const selected = colorMap[color];

  // Realistic P-Q-R-S-T cardiac cycle path replicated over 3 beats
  const ecgPath =
    'M 0 24 ' +
    'L 30 24 L 38 21 L 46 27 L 52 24 ' + // P-wave
    'L 70 24 L 75 28 L 84 4 L 92 42 L 98 24 ' + // QRS complex
    'L 115 24 L 128 17 L 140 24 ' + // T-wave
    'L 175 24 L 183 21 L 191 27 L 197 24 ' + // beat 2 P-wave
    'L 215 24 L 220 28 L 229 4 L 237 42 L 243 24 ' + // beat 2 QRS
    'L 260 24 L 273 17 L 285 24 ' + // beat 2 T-wave
    'L 320 24 L 328 21 L 336 27 L 342 24 ' + // beat 3 P-wave
    'L 360 24 L 365 28 L 374 4 L 382 42 L 388 24 ' + // beat 3 QRS
    'L 405 24 L 418 17 L 430 24 L 500 24';

  return (
    <div className={`relative overflow-hidden w-full ${className}`} style={{ height }}>
      <svg
        viewBox="0 0 500 48"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <defs>
          <filter id={`glow-${color}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={selected.stroke} stopOpacity="0.1" />
            <stop offset="35%" stopColor={selected.stroke} stopOpacity="0.8" />
            <stop offset="70%" stopColor={selected.stroke} stopOpacity="1" />
            <stop offset="100%" stopColor={selected.stroke} stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Ambient Grid Reference Lines */}
        <line x1="0" y1="24" x2="500" y2="24" stroke="rgba(148, 163, 184, 0.15)" strokeDasharray="3 3" strokeWidth="1" />
        <line x1="0" y1="12" x2="500" y2="12" stroke="rgba(148, 163, 184, 0.08)" strokeDasharray="3 3" strokeWidth="1" />
        <line x1="0" y1="36" x2="500" y2="36" stroke="rgba(148, 163, 184, 0.08)" strokeDasharray="3 3" strokeWidth="1" />

        {/* Trace Waveform */}
        <path
          d={ecgPath}
          fill="none"
          stroke={`url(#gradient-${color})`}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#glow-${color})`}
          className={animate ? 'animate-ecg-line' : ''}
        />

        {/* Active glowing pulse node */}
        {animate && (
          <circle cx="229" cy="4" r="3.5" fill={selected.stroke} className="animate-pulse">
            <animate attributeName="r" values="3;6;3" dur="1.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;1;0.8" dur="1.8s" repeatCount="indefinite" />
          </circle>
        )}
      </svg>
    </div>
  );
};
