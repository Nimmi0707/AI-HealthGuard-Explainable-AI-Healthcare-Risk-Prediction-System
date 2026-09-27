import React, { useState } from 'react';
import {
  Brain,
  Binary,
  Cpu,
  Sparkles,
  Sliders,
  RotateCcw,
  ArrowRight,
  TrendingDown,
  Info,
  ShieldCheck,
  CheckCircle2,
  Activity,
  Layers,
} from 'lucide-react';
import { ShapWaterfallPlot } from '../components/visuals/ShapWaterfallPlot';
import { PatientVitals, PredictionResult } from '../types/health';
import { calculateClinicalRisk } from '../utils/riskEngine';
import { EcgWaveform } from '../components/visuals/EcgWaveform';

interface ExplainableAiViewProps {
  currentVitals: PatientVitals;
  currentPrediction: PredictionResult;
  onUpdateVitals: (vitals: PatientVitals) => void;
}

export const ExplainableAiView: React.FC<ExplainableAiViewProps> = ({
  currentVitals,
  currentPrediction,
  onUpdateVitals,
}) => {
  // Counterfactual What-If local state initialized with current patient vitals
  const [whatIfVitals, setWhatIfVitals] = useState<PatientVitals>(currentVitals);

  // Computed counterfactual prediction in real time
  const counterfactualPrediction = calculateClinicalRisk(whatIfVitals);
  const riskDelta = counterfactualPrediction.riskScore - currentPrediction.riskScore;

  const handleResetWhatIf = () => {
    setWhatIfVitals(currentVitals);
  };

  const handleUpdateWhatIf = (field: keyof PatientVitals, val: any) => {
    setWhatIfVitals((prev) => ({ ...prev, [field]: val }));
  };

  const applyWhatIfToMainPatient = () => {
    onUpdateVitals(whatIfVitals);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-teal-50 text-teal-700 border border-teal-200">
              <Brain className="w-4 h-4" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Inside the AI Decision — Explainable AI (XAI)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Mathematical game-theoretic feature attribution powered by SHAP (SHapley Additive exPlanations) & TreeExplainer.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1.5 rounded-xl">
          <Binary className="w-3.5 h-3.5 text-teal-600" />
          <span>Patient: {currentVitals.name} ({currentVitals.id})</span>
        </div>
      </div>

      {/* Top Section: Abstract AI Brain / Circuit Architecture & Model Concept Card */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl">
        {/* Subtle dot matrix grid */}
        <div className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-300 text-xs font-semibold">
              <Cpu className="w-3.5 h-3.5" />
              <span>Axiomatic Interpretability Guarantee</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Shapley Value Formulation for Clinical Safety
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Unlike black-box neural networks, AI HealthGuard decomposes each patient’s risk into unique additive contributions satisfying the four core axioms of cooperative game theory: <strong>Efficiency</strong>, <strong>Symmetry</strong>, <strong>Dummy Player</strong>, and <strong>Additivity</strong>.
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2 font-mono text-xs">
              <div className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                <span className="text-slate-400">Base Population Prior: </span>
                <span className="text-teal-300 font-bold">24.8%</span>
              </div>
              <div className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                <span className="text-slate-400">Tree Explainer Trees: </span>
                <span className="text-cyan-300 font-bold">500 Estimators</span>
              </div>
              <div className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                <span className="text-slate-400">Exact Convergence: </span>
                <span className="text-emerald-300 font-bold">&Delta; = 0.00%</span>
              </div>
            </div>
          </div>

          {/* Right Column: Abstract Brain & Synapse Circuit Illustration */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-48 h-48 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-teal-500/30 animate-[spin_30s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border border-cyan-400/20 animate-[spin_20s_linear_infinite_reverse]" />
              <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-teal-500/20 to-cyan-500/10 backdrop-blur-md border border-teal-400/40 flex items-center justify-center shadow-lg shadow-teal-500/20">
                <Brain className="w-16 h-16 text-cyan-300 animate-pulse" />
              </div>

              {/* Glowing Synapse Nodes */}
              <div className="absolute top-2 left-6 w-2.5 h-2.5 rounded-full bg-teal-400 animate-ping" />
              <div className="absolute bottom-4 right-8 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Primary Component: SHAP Waterfall Plot */}
      <ShapWaterfallPlot
        baseValue={currentPrediction.baseValueShap}
        predictedRisk={currentPrediction.riskScore}
        contributions={currentPrediction.shapContributions}
      />

      {/* Interactive Counterfactual "What-If" Sensitivity Simulator */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-teal-50 text-teal-700 border border-teal-200">
                <Sliders className="w-4 h-4" />
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                Counterfactual "What-If" Sensitivity Simulator
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Simulate clinical interventions in real time to observe exact risk reduction trajectories.
            </p>
          </div>

          <button
            onClick={handleResetWhatIf}
            className="self-start sm:self-auto px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-600 flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Current Vitals</span>
          </button>
        </div>

        {/* Live Simulator Comparison Header Banner */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-50 via-cyan-50 to-slate-50 border border-teal-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Baseline Patient Risk</div>
              <div className="text-2xl font-extrabold text-slate-800 font-mono">
                {currentPrediction.riskScore.toFixed(1)}%
              </div>
              <div className="text-[11px] font-semibold text-slate-500">{currentPrediction.riskLevel}</div>
            </div>

            <ArrowRight className="w-5 h-5 text-slate-400" />

            <div>
              <div className="text-[10px] uppercase font-bold text-teal-700">Counterfactual Outcome</div>
              <div className="text-2xl font-extrabold text-teal-900 font-mono">
                {counterfactualPrediction.riskScore.toFixed(1)}%
              </div>
              <div className="text-[11px] font-bold text-teal-700">{counterfactualPrediction.riskLevel}</div>
            </div>
          </div>

          {/* Delta Pill */}
          <div className="flex items-center gap-3">
            <div
              className={`px-4 py-2 rounded-xl text-xs font-bold border flex items-center gap-2 ${
                riskDelta < 0
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  : riskDelta > 0
                  ? 'bg-rose-100 text-rose-800 border-rose-300'
                  : 'bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              {riskDelta < 0 && <TrendingDown className="w-4 h-4 text-emerald-600" />}
              <span>
                Net Simulated Delta: {riskDelta > 0 ? '+' : ''}
                {riskDelta.toFixed(1)}%
              </span>
            </div>

            <button
              onClick={applyWhatIfToMainPatient}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
            >
              Commit Interventions
            </button>
          </div>
        </div>

        {/* Sliders Grid for Quick Intervention Testing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          {/* 1. Systolic BP Slider */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-700">Systolic Blood Pressure</span>
              <span className="font-mono text-xs font-bold text-teal-800">{whatIfVitals.systolicBp} mmHg</span>
            </div>
            <input
              type="range"
              min="100"
              max="180"
              value={whatIfVitals.systolicBp}
              onChange={(e) => handleUpdateWhatIf('systolicBp', Number(e.target.value))}
              className="w-full accent-teal-600 cursor-pointer"
            />
            <div className="text-[10px] text-slate-400">Target normotensive: &lt; 120 mmHg</div>
          </div>

          {/* 2. HbA1c Slider */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-700">Glycated HbA1c</span>
              <span className="font-mono text-xs font-bold text-teal-800">{whatIfVitals.hba1c.toFixed(1)}%</span>
            </div>
            <input
              type="range"
              min="4.5"
              max="9.5"
              step="0.1"
              value={whatIfVitals.hba1c}
              onChange={(e) => handleUpdateWhatIf('hba1c', Number(e.target.value))}
              className="w-full accent-teal-600 cursor-pointer"
            />
            <div className="text-[10px] text-slate-400">Euglycemic target: &lt; 5.7%</div>
          </div>

          {/* 3. hs-CRP Slider */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-700">Inflammatory hs-CRP</span>
              <span className="font-mono text-xs font-bold text-teal-800">{whatIfVitals.hsCrp.toFixed(2)} mg/L</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="6.0"
              step="0.1"
              value={whatIfVitals.hsCrp}
              onChange={(e) => handleUpdateWhatIf('hsCrp', Number(e.target.value))}
              className="w-full accent-teal-600 cursor-pointer"
            />
            <div className="text-[10px] text-slate-400">Anti-inflammatory target: &lt; 1.0</div>
          </div>

          {/* 4. Smoking Status Toggle */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-700">Smoking Cessation</span>
              <span className="font-mono text-xs font-bold text-teal-800">{whatIfVitals.smokingStatus}</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              <button
                type="button"
                onClick={() => handleUpdateWhatIf('smokingStatus', 'Never')}
                className={`py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                  whatIfVitals.smokingStatus === 'Never'
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                Quit / Never
              </button>
              <button
                type="button"
                onClick={() => handleUpdateWhatIf('smokingStatus', 'Current')}
                className={`py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                  whatIfVitals.smokingStatus === 'Current'
                    ? 'bg-rose-600 text-white border-rose-600'
                    : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                Current
              </button>
            </div>
            <div className="text-[10px] text-slate-400">Immediate endothelial recovery</div>
          </div>
        </div>
      </div>

      {/* Global vs. Local Feature Importance Matrix */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-teal-600" />
            <h3 className="text-base font-bold text-slate-900">
              Global Cohort Feature Importance (Mean |SHAP|)
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Average absolute impact on model output across the entire 1,500 patient multi-center dataset.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {[
            { name: 'Systolic Blood Pressure (mmHg)', meanShap: 8.84, pct: 92 },
            { name: 'Tobacco Smoking Exposure', meanShap: 7.92, pct: 84 },
            { name: 'Glycated Hemoglobin HbA1c (%)', meanShap: 7.45, pct: 79 },
            { name: 'hs-CRP Vascular Inflammation', meanShap: 6.82, pct: 72 },
            { name: 'LDL-C / HDL-C Atherogenic Ratio', meanShap: 6.10, pct: 65 },
            { name: 'Chronological Age Modifier', meanShap: 5.75, pct: 61 },
          ].map((item, idx) => (
            <div key={item.name} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 flex items-center justify-between gap-4">
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">
                    #{idx + 1}. {item.name}
                  </span>
                  <span className="font-mono font-bold text-teal-800">
                    &plusmn;{item.meanShap}%
                  </span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${item.pct}%` }}
                    className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
