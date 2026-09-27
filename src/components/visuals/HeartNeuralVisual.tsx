import React from 'react';
import { Activity, ShieldCheck, Heart, Cpu, Zap, Radio } from 'lucide-react';

export const HeartNeuralVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-lg aspect-square flex items-center justify-center select-none">
      {/* Background radial gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 via-cyan-400/15 to-emerald-400/5 rounded-full blur-3xl transform -scale-95 animate-pulse-glow" />

      {/* Outer Rotating Scanning Reticle Ring */}
      <div className="absolute w-[92%] h-[92%] rounded-full border border-teal-500/20 border-dashed animate-[spin_60s_linear_infinite]" />
      <div className="absolute w-[80%] h-[80%] rounded-full border border-cyan-500/25 animate-[spin_40s_linear_infinite_reverse]" />
      <div className="absolute w-[68%] h-[68%] rounded-full border border-slate-300/40" />

      {/* Circular Radar Scan Beam */}
      <div className="absolute inset-8 rounded-full overflow-hidden pointer-events-none opacity-40">
        <div className="w-full h-full bg-gradient-to-b from-teal-400/20 via-transparent to-transparent animate-scan" />
      </div>

      {/* Central SVG: Anatomical Stylized Heart + Neural Synapse Lattice */}
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full z-10 drop-shadow-[0_10px_25px_rgba(13,148,136,0.25)]"
      >
        <defs>
          <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0d9488" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>

          <linearGradient id="arteryRed" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#e11d48" />
          </linearGradient>

          <filter id="neonGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Neural Network Connection Strands (AI Synapses) */}
        <g stroke="#0891b2" strokeWidth="1" strokeOpacity="0.35" strokeDasharray="3 3">
          <line x1="200" y1="130" x2="110" y2="90" />
          <line x1="200" y1="130" x2="290" y2="85" />
          <line x1="160" y1="200" x2="70" y2="190" />
          <line x1="240" y1="200" x2="330" y2="195" />
          <line x1="180" y1="260" x2="95" y2="300" />
          <line x1="220" y1="260" x2="305" y2="295" />
          <line x1="200" y1="310" x2="200" y2="365" />
          
          {/* Inner mesh */}
          <line x1="160" y1="200" x2="200" y2="130" />
          <line x1="240" y1="200" x2="200" y2="130" />
          <line x1="160" y1="200" x2="200" y2="310" />
          <line x1="240" y1="200" x2="200" y2="310" />
        </g>

        {/* Neural Node Data Points (Glowing vertices) */}
        <g fill="#06b6d4" filter="url(#neonGlow)">
          <circle cx="110" cy="90" r="4" className="animate-ping" style={{ animationDuration: '3s' }} />
          <circle cx="110" cy="90" r="3" />
          <circle cx="290" cy="85" r="3" />
          <circle cx="70" cy="190" r="3.5" />
          <circle cx="330" cy="195" r="3.5" />
          <circle cx="95" cy="300" r="3" />
          <circle cx="305" cy="295" r="3" />
          <circle cx="200" cy="365" r="4" />
        </g>

        {/* Stylized Myocardial Geometric Heart Silhouette */}
        <path
          d="M 200,145 
             C 200,105 155,90 125,120 
             C 90,155 100,215 150,265 
             L 200,315 
             L 250,265 
             C 300,215 310,155 275,120 
             C 245,90 200,105 200,145 Z"
          fill="url(#heartGradient)"
          fillOpacity="0.14"
          stroke="url(#heartGradient)"
          strokeWidth="2.5"
          filter="url(#neonGlow)"
        />

        {/* Aorta & Pulmonary Arteries Accent */}
        <path
          d="M 175,115 C 175,70 195,55 220,55 C 235,55 245,65 245,85"
          fill="none"
          stroke="url(#arteryRed)"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* Core ECG trace running through ventricular apex */}
        <path
          d="M 120,205 L 155,205 L 165,190 L 175,225 L 190,155 L 205,245 L 215,195 L 225,215 L 235,205 L 280,205"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#neonGlow)"
        />

        {/* Central Pulsing Health Beacon */}
        <circle cx="200" cy="205" r="5" fill="#f43f5e" className="animate-ping" style={{ animationDuration: '2s' }} />
        <circle cx="200" cy="205" r="3.5" fill="#f43f5e" />
      </svg>

      {/* Floating Medical Data Cards with Micro-Metrics */}
      
      {/* Top Left: Cardiac Cadence */}
      <div className="absolute -top-2 left-0 sm:left-4 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-teal-100 flex items-center gap-2.5 z-20 transform hover:-translate-y-1 transition-transform">
        <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 border border-teal-200/50">
          <Activity className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Resting Rhythm</div>
          <div className="text-xs font-bold text-slate-800 flex items-baseline gap-1">
            <span>72</span>
            <span className="text-[9px] font-normal text-slate-500">BPM • Regular</span>
          </div>
        </div>
      </div>

      {/* Top Right: Explainable AI Confidence */}
      <div className="absolute top-6 right-0 sm:right-2 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-cyan-100 flex items-center gap-2.5 z-20 transform hover:-translate-y-1 transition-transform">
        <div className="w-8 h-8 rounded-lg bg-cyan-50 flex items-center justify-center text-cyan-600 border border-cyan-200/50">
          <Cpu className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">XAI Convergence</div>
          <div className="text-xs font-bold text-slate-800 flex items-baseline gap-1">
            <span>94.8%</span>
            <span className="text-[9px] font-semibold text-emerald-600">TreeExplainer</span>
          </div>
        </div>
      </div>

      {/* Bottom Left: Microvascular Stability */}
      <div className="absolute bottom-6 left-0 sm:left-2 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-emerald-100 flex items-center gap-2.5 z-20 transform hover:-translate-y-1 transition-transform">
        <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-200/50">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Arterial Compliance</div>
          <div className="text-xs font-bold text-slate-800 flex items-baseline gap-1">
            <span>Optimal</span>
            <span className="text-[9px] font-normal text-slate-500">hs-CRP 0.8 mg/L</span>
          </div>
        </div>
      </div>

      {/* Bottom Right: Real-time Telemetry Status */}
      <div className="absolute -bottom-2 right-4 bg-slate-900/90 text-white backdrop-blur-md px-3.5 py-2 rounded-xl shadow-xl border border-slate-700/60 flex items-center gap-2.5 z-20">
        <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-ping" />
        <div>
          <div className="text-[9px] font-mono text-teal-300 uppercase tracking-wider">Inference Node</div>
          <div className="text-xs font-mono font-medium text-slate-200">14ms Latency • Online</div>
        </div>
      </div>
    </div>
  );
};
