import React from 'react';
import {
  HeartPulse,
  Brain,
  BarChart3,
  Lightbulb,
  ArrowRight,
  ShieldCheck,
  Activity,
  Cpu,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import { HeartNeuralVisual } from '../components/visuals/HeartNeuralVisual';
import { EcgWaveform } from '../components/visuals/EcgWaveform';
import { NavigationPage } from '../components/layout/Sidebar';
import { BENCHMARK_CASES } from '../data/clinicalDatasets';
import { PatientVitals } from '../types/health';

interface HomeViewProps {
  onNavigate: (page: NavigationPage) => void;
  onSelectPreset: (vitals: PatientVitals) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onSelectPreset }) => {
  const featureCards = [
    {
      icon: HeartPulse,
      title: 'AI Risk Prediction',
      tagline: 'Multi-Factor Stratification',
      desc: 'Gradient boosted ensemble model evaluating 12 key cardiovascular, metabolic, and hemodynamic biomarkers.',
      color: 'teal',
      page: 'predictions' as NavigationPage,
    },
    {
      icon: Brain,
      title: 'Explainable AI',
      tagline: 'SHAP Feature Attribution',
      desc: 'Transparent waterfall decomposition showing exact positive and negative force contributions for every clinical verdict.',
      color: 'cyan',
      page: 'xai' as NavigationPage,
    },
    {
      icon: BarChart3,
      title: 'Predictive Analytics',
      tagline: 'Model Benchmarking & ROC',
      desc: 'Rigorous cross-validation across XGBoost, LightGBM, Random Forest, and Deep Tabular Neural Networks.',
      color: 'emerald',
      page: 'analytics' as NavigationPage,
    },
    {
      icon: Lightbulb,
      title: 'Intelligent Recommendations',
      tagline: 'Counterfactual Guidance',
      desc: 'Actionable clinical intervention strategies with projected percentage risk reductions derived from sensitivity analysis.',
      color: 'indigo',
      page: 'recommendations' as NavigationPage,
    },
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950 text-white p-6 sm:p-10 lg:p-14 shadow-2xl border border-slate-800">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none" />

        {/* Ambient background glow spheres */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Hero Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
              <span>AI-Powered Healthcare Risk Intelligence</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                Understand Health Risks.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-300 to-emerald-300">
                  Explain Every AI Prediction.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
                An explainable AI research prototype for intelligent healthcare risk analysis. Combines high-accuracy ensemble learning with game-theoretic SHAP interpretability to eliminate the diagnostic black box.
              </p>
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('assessment')}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-teal-500/25 flex items-center gap-2 transform active:scale-95 transition-all"
              >
                <HeartPulse className="w-4 h-4 text-slate-950" />
                <span>Start Risk Assessment</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <button
                onClick={() => onNavigate('dashboard')}
                className="px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-white font-semibold text-sm border border-slate-700 flex items-center gap-2 backdrop-blur-sm transition-colors"
              >
                <span>Explore AI Dashboard</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-800/80">
              <div>
                <div className="text-2xl font-extrabold text-teal-300 font-mono">94.8%</div>
                <div className="text-xs text-slate-400">Model Accuracy</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-cyan-300 font-mono">0.972</div>
                <div className="text-xs text-slate-400">ROC-AUC Score</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-emerald-300 font-mono">100%</div>
                <div className="text-xs text-slate-400">SHAP Additive Proof</div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Component */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <HeartNeuralVisual />
          </div>
        </div>

        {/* Ambient ECG line flowing subtly across bottom of hero */}
        <div className="mt-8 pt-4 border-t border-slate-800/60 opacity-60">
          <EcgWaveform color="cyan" height={36} animate={true} />
        </div>
      </section>

      {/* 4 Premium Feature Cards */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Intelligent Clinical Risk Engine Architecture
          </h2>
          <p className="text-sm text-slate-500">
            Engineered to deliver clinically grounded, explainable, and reproducible risk assessments.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                onClick={() => onNavigate(card.page)}
                className="group relative bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-teal-300 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 border border-teal-100 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300 shadow-2xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-teal-700">
                    {card.tagline}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-1 mb-2 group-hover:text-teal-700 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-teal-700 group-hover:text-teal-800">
                  <span>Explore Module</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Benchmark Presets Quick-Demonstration Tray */}
      <section className="bg-gradient-to-br from-slate-50 to-teal-50/40 rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-teal-600 text-white">
                <Sparkles className="w-4 h-4" />
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                Benchmark Clinical Validation Scenarios
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Select a benchmark clinical profile to load full vitals and examine explainable attributions instantly.
            </p>
          </div>
          <button
            onClick={() => onNavigate('assessment')}
            className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Custom Patient Assessment</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {BENCHMARK_CASES.map((preset) => {
            const isHigh = preset.expectedRisk === 'HIGH';
            const isMed = preset.expectedRisk === 'MEDIUM';

            return (
              <div
                key={preset.id}
                onClick={() => {
                  onSelectPreset(preset.vitals);
                  onNavigate('predictions');
                }}
                className="bg-white rounded-xl p-4 border border-slate-200 hover:border-teal-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                        isHigh
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : isMed
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      {preset.tag}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">{preset.vitals.id}</span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-teal-700 line-clamp-1">
                    {preset.vitals.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                    {preset.description}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-600">
                  <span>SBP {preset.vitals.systolicBp} • HbA1c {preset.vitals.hba1c}%</span>
                  <span className="text-teal-700 font-bold group-hover:translate-x-0.5 transition-transform">Run →</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Academic Research Disclaimer & Ethics Standards */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-teal-50 text-teal-700 border border-teal-200 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">
              Computational Clinical Research Prototype
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
              This system is engineered for explainable risk intelligence research and academic demonstration. All patient records shown represent synthetic validation cohorts derived from clinical reference ranges.
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('reports')}
          className="shrink-0 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center gap-1.5"
        >
          <FileText className="w-4 h-4 text-slate-600" />
          <span>View Research Audit Report</span>
        </button>
      </section>
    </div>
  );
};
