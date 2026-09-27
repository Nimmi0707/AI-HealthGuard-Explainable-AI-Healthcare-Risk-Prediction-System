import React from 'react';
import {
  Heart,
  Activity,
  Cpu,
  ArrowRight,
  ShieldCheck,
  Binary,
  RotateCcw,
  Sparkles,
  FileText,
  Clock,
  Hash,
  AlertTriangle,
  CheckCircle2,
  Sliders,
} from 'lucide-react';
import { RiskRadialGauge } from '../components/visuals/RiskRadialGauge';
import { EcgWaveform } from '../components/visuals/EcgWaveform';
import { PatientVitals, PredictionResult } from '../types/health';
import { NavigationPage } from '../components/layout/Sidebar';

interface PredictionResultViewProps {
  prediction: PredictionResult;
  vitals: PatientVitals;
  onNavigate: (page: NavigationPage) => void;
}

export const PredictionResultView: React.FC<PredictionResultViewProps> = ({
  prediction,
  vitals,
  onNavigate,
}) => {
  const isHigh = prediction.riskLevel === 'HIGH';
  const isMed = prediction.riskLevel === 'MEDIUM';

  return (
    <div className="space-y-8 pb-16">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-teal-50 text-teal-700 border border-teal-200">
              <Cpu className="w-4 h-4" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              AI Risk Prediction & Clinical Stratification
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Subject: <strong className="text-slate-800">{prediction.patientName}</strong> ({prediction.patientId}) • Evaluated with {prediction.primaryModel}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('xai')}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-xs"
          >
            <Binary className="w-3.5 h-3.5" />
            <span>Explain AI Model</span>
          </button>

          <button
            onClick={() => onNavigate('reports')}
            className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all flex items-center gap-2"
          >
            <FileText className="w-3.5 h-3.5 text-slate-600" />
            <span>Clinical Report</span>
          </button>
        </div>
      </div>

      {/* Hero Visual Card: Center Circular AI Prediction Gauge */}
      <div className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50/80 rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm text-center">
        {/* Subtle background heartbeat line */}
        <div className="absolute top-0 left-0 right-0 opacity-15 pointer-events-none">
          <EcgWaveform color={isHigh ? 'coral' : 'teal'} height={48} animate={true} />
        </div>

        <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
          {/* Top Heart Pulse Motif */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 mb-4">
            <Heart className={`w-3.5 h-3.5 ${isHigh ? 'text-rose-500 fill-rose-500 animate-pulse' : 'text-teal-600'}`} />
            <span>Cardiovascular Event Probability Index</span>
          </div>

          {/* Large Center Circular Gauge */}
          <RiskRadialGauge
            score={prediction.riskScore}
            riskLevel={prediction.riskLevel}
            confidence={prediction.confidence}
            size={280}
            showLabels={true}
          />

          {/* Metadata Row: Timestamp, Model, Audit Hash */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full text-left">
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-400">
                <Cpu className="w-3.5 h-3.5 text-teal-600" />
                <span>Inference Model</span>
              </div>
              <div className="text-xs font-bold text-slate-800 mt-1 truncate">
                {prediction.primaryModel}
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-400">
                <Clock className="w-3.5 h-3.5 text-teal-600" />
                <span>Prediction Timestamp</span>
              </div>
              <div className="text-xs font-bold text-slate-800 mt-1 font-mono">
                {new Date(prediction.timestamp).toLocaleString()}
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-400">
                <Hash className="w-3.5 h-3.5 text-teal-600" />
                <span>Deterministic Audit Hash</span>
              </div>
              <div className="text-xs font-bold text-teal-700 mt-1 font-mono">
                {prediction.auditHash}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* "Why did the AI make this prediction?" Horizontal Bars Section */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-teal-50 text-teal-700 border border-teal-200">
                <Sparkles className="w-4 h-4" />
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                Why Did the AI Make This Prediction?
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Individual feature contributions extracted via Shapley additive explanations (SHAP).
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-medium">
            <span className="flex items-center gap-1 text-rose-600">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              Risk Elevating
            </span>
            <span className="flex items-center gap-1 text-emerald-600">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              Cardioprotective
            </span>
          </div>
        </div>

        {/* Feature Contribution Bars */}
        <div className="space-y-4">
          {prediction.shapContributions.map((c) => {
            const isPos = c.shapValue >= 0;
            const absVal = Math.min(100, Math.abs(c.shapValue) * 6); // visual scaling factor

            return (
              <div key={c.feature} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-800">{c.label}</span>
                    <span className="font-mono text-[11px] text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200 font-semibold">
                      {c.value}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Normal: {c.standardNormal}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-xs font-bold">
                    <span className={isPos ? 'text-rose-600' : 'text-emerald-600'}>
                      {isPos ? `+${c.shapValue.toFixed(1)}%` : `${c.shapValue.toFixed(1)}%`}
                    </span>
                    <span className="text-[10px] font-sans font-normal text-slate-400">
                      {isPos ? 'Risk Contribution' : 'Protective Force'}
                    </span>
                  </div>
                </div>

                {/* Contribution Progress Bar */}
                <div className="h-3 w-full bg-slate-200/80 rounded-full overflow-hidden flex">
                  {isPos ? (
                    <div
                      style={{ width: `${absVal}%` }}
                      className="h-full bg-gradient-to-r from-rose-400 to-rose-600 rounded-full transition-all duration-700"
                    />
                  ) : (
                    <div
                      style={{ width: `${absVal}%` }}
                      className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-700"
                    />
                  )}
                </div>

                {/* Clinical Context */}
                <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                  {c.clinicalContext}
                </p>
              </div>
            );
          })}
        </div>

        {/* Action Bar */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Want to test what happens if this patient lowers their blood pressure or quits smoking?
          </div>

          <button
            onClick={() => onNavigate('xai')}
            className="px-4 py-2 bg-teal-50 hover:bg-teal-100 text-teal-800 rounded-xl text-xs font-bold border border-teal-200 transition-colors flex items-center gap-1.5"
          >
            <Sliders className="w-3.5 h-3.5 text-teal-600" />
            <span>Open Counterfactual What-If Simulator</span>
            <ArrowRight className="w-3.5 h-3.5 text-teal-600" />
          </button>
        </div>
      </div>
    </div>
  );
};
