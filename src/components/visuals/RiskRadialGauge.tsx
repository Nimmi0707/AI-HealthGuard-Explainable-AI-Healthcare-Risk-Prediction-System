import React from 'react';
import { RiskLevel } from '../../types/health';
import { Heart, Activity, AlertTriangle, CheckCircle2, AlertCircle } from 'lucide-react';

interface RiskRadialGaugeProps {
  score: number; // 0 - 100
  riskLevel: RiskLevel;
  confidence: number;
  size?: number;
  showLabels?: boolean;
}

export const RiskRadialGauge: React.FC<RiskRadialGaugeProps> = ({
  score,
  riskLevel,
  confidence,
  size = 280,
  showLabels = true,
}) => {
  // SVG calculation for circular arc
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Use a 270-degree sweep arc (open at bottom)
  const arcLength = circumference * 0.75;
  const strokeDashoffset = arcLength - (score / 100) * arcLength;

  const getRiskStyles = () => {
    switch (riskLevel) {
      case 'HIGH':
        return {
          textColor: 'text-rose-600',
          badgeBg: 'bg-rose-50 border-rose-200 text-rose-700',
          ringColor: '#e11d48',
          gradientId: 'gaugeRose',
          icon: <AlertTriangle className="w-5 h-5 text-rose-600" />,
          label: 'HIGH RISK',
          subtext: 'High Probability of Cardiovascular Event',
        };
      case 'MEDIUM':
        return {
          textColor: 'text-amber-600',
          badgeBg: 'bg-amber-50 border-amber-200 text-amber-700',
          ringColor: '#d97706',
          gradientId: 'gaugeAmber',
          icon: <AlertCircle className="w-5 h-5 text-amber-600" />,
          label: 'ELEVATED RISK',
          subtext: 'Moderate Vascular Stress Detected',
        };
      case 'LOW':
      default:
        return {
          textColor: 'text-emerald-600',
          badgeBg: 'bg-emerald-50 border-emerald-200 text-emerald-700',
          ringColor: '#059669',
          gradientId: 'gaugeEmerald',
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
          label: 'LOW RISK',
          subtext: 'Cardioprotective Baseline Maintained',
        };
    }
  };

  const style = getRiskStyles();

  return (
    <div className="flex flex-col items-center justify-center select-none">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        {/* Ambient background glow */}
        <div
          className="absolute inset-4 rounded-full opacity-20 blur-2xl"
          style={{ backgroundColor: style.ringColor }}
        />

        <svg width={size} height={size} className="transform -rotate-[135deg]">
          <defs>
            <linearGradient id="gaugeEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="gaugeAmber" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <linearGradient id="gaugeRose" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#be123c" />
            </linearGradient>
          </defs>

          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
          />

          {/* Active Value Progress Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={`url(#${style.gradientId})`}
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
          {/* Subtle pulse heart indicator */}
          <div className="flex items-center gap-1.5 mb-1">
            <Heart className={`w-4 h-4 ${riskLevel === 'HIGH' ? 'text-rose-500 fill-rose-500 animate-pulse' : 'text-teal-600'}`} />
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
              AI Projected Risk
            </span>
          </div>

          {/* Score percentage */}
          <div className="flex items-baseline">
            <span className="text-5xl font-extrabold tracking-tight text-slate-900">
              {score.toFixed(1)}
            </span>
            <span className="text-2xl font-bold text-slate-500 ml-0.5">%</span>
          </div>

          {/* Risk Level Badge */}
          <div className={`mt-2 px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider flex items-center gap-1.5 ${style.badgeBg}`}>
            {style.icon}
            <span>{style.label}</span>
          </div>

          {/* Model Confidence pill */}
          <div className="mt-3 flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
            <Activity className="w-3 h-3 text-teal-600" />
            <span>Confidence: <strong className="text-slate-800">{confidence}%</strong></span>
          </div>
        </div>
      </div>

      {showLabels && (
        <p className="text-xs text-slate-500 text-center mt-2 max-w-[240px]">
          {style.subtext}
        </p>
      )}
    </div>
  );
};
