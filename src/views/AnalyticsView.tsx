import React from 'react';
import {
  BarChart3,
  Cpu,
  Binary,
  Layers,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Award,
  Zap,
} from 'lucide-react';
import {
  MODEL_BENCHMARKS,
  CONFUSION_MATRIX,
  FEATURE_CORRELATIONS,
  MONTHLY_ACTIVITY,
} from '../data/clinicalDatasets';
import { EcgWaveform } from '../components/visuals/EcgWaveform';

export const AnalyticsView: React.FC = () => {
  const cm = CONFUSION_MATRIX;
  const total = cm.totalSample;
  const accuracy = (((cm.truePositive + cm.trueNegative) / total) * 100).toFixed(1);
  const precision = ((cm.truePositive / (cm.truePositive + cm.falsePositive)) * 100).toFixed(1);
  const recall = ((cm.truePositive / (cm.truePositive + cm.falseNegative)) * 100).toFixed(1);
  const f1 = (
    (2 * ((Number(precision) * Number(recall)) / (Number(precision) + Number(recall))))
  ).toFixed(1);

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-teal-50 text-teal-700 border border-teal-200">
              <BarChart3 className="w-4 h-4" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Machine Learning Model Analytics & Cross-Validation
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Empirical validation benchmarks on 1,500 clinical cohort records with 10-fold cross-validation.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-teal-800 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-200">
          <Award className="w-3.5 h-3.5 text-teal-600" />
          <span>Champion: XGBoost v2.1 (94.8% Acc)</span>
        </div>
      </div>

      {/* Top 4 Performance Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Overall Accuracy</span>
            <span className="text-teal-600 font-bold">&plusmn;0.8%</span>
          </div>
          <div className="mt-2 text-3xl font-extrabold text-slate-900 font-mono">
            {accuracy}%
          </div>
          <div className="text-[11px] text-slate-400 mt-1">10-Fold Stratified CV</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Precision (PPV)</span>
            <span className="text-cyan-600 font-bold">Low FP</span>
          </div>
          <div className="mt-2 text-3xl font-extrabold text-slate-900 font-mono">
            {precision}%
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Positive Predictive Value</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Recall (Sensitivity)</span>
            <span className="text-emerald-600 font-bold">Low FN</span>
          </div>
          <div className="mt-2 text-3xl font-extrabold text-slate-900 font-mono">
            {recall}%
          </div>
          <div className="text-[11px] text-slate-400 mt-1">True Positive Capture Rate</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>F1 Harmonic Mean</span>
            <span className="text-teal-600 font-bold">Optimal</span>
          </div>
          <div className="mt-2 text-3xl font-extrabold text-slate-900 font-mono">
            {f1}%
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Balanced Metric</div>
        </div>
      </div>

      {/* Model Benchmark Comparison Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-teal-600" />
            <h3 className="text-base font-bold text-slate-900">
              Multi-Model Empirical Comparison & Latency Evaluation
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Hardware: Tesla T4 In-Memory Micro-Kernel
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 pl-3">Model Architecture</th>
                <th className="py-3">Type</th>
                <th className="py-3 font-mono">Accuracy</th>
                <th className="py-3 font-mono">Precision</th>
                <th className="py-3 font-mono">Recall</th>
                <th className="py-3 font-mono">F1-Score</th>
                <th className="py-3 font-mono">ROC-AUC</th>
                <th className="py-3 font-mono">Latency</th>
                <th className="py-3 text-right pr-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MODEL_BENCHMARKS.map((m) => (
                <tr
                  key={m.name}
                  className={`transition-colors ${
                    m.highlight ? 'bg-teal-50/50 font-medium' : 'hover:bg-slate-50'
                  }`}
                >
                  <td className="py-3.5 pl-3">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      {m.highlight && <Zap className="w-3.5 h-3.5 text-teal-600 fill-teal-600" />}
                      <span>{m.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 text-slate-500">{m.type}</td>
                  <td className="py-3.5 font-mono font-bold text-slate-800">{m.accuracy}%</td>
                  <td className="py-3.5 font-mono text-slate-600">{m.precision}%</td>
                  <td className="py-3.5 font-mono text-slate-600">{m.recall}%</td>
                  <td className="py-3.5 font-mono text-slate-600">{m.f1Score}%</td>
                  <td className="py-3.5 font-mono font-bold text-teal-700">{m.rocAuc.toFixed(3)}</td>
                  <td className="py-3.5 font-mono text-slate-500">{m.inferenceLatencyMs} ms</td>
                  <td className="py-3.5 text-right pr-3">
                    {m.highlight ? (
                      <span className="bg-teal-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Production Primary
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[10px] font-medium">Evaluated</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Middle Grid: Confusion Matrix & ROC Visual Representation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Confusion Matrix Card */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Binary className="w-4 h-4 text-teal-600" />
              <h3 className="text-base font-bold text-slate-900">
                Confusion Matrix (Holdout Test Cohort)
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-500">N = {cm.totalSample}</span>
          </div>

          <p className="text-xs text-slate-500">
            Evaluating true vs. predicted classifications to ensure low false negative rates for cardiovascular emergencies.
          </p>

          {/* Matrix Grid */}
          <div className="pt-2 max-w-sm mx-auto space-y-3">
            <div className="grid grid-cols-2 gap-3 text-center">
              {/* True Positive */}
              <div className="bg-emerald-50 border-2 border-emerald-300 p-4 rounded-xl">
                <div className="text-[10px] uppercase font-bold text-emerald-800">
                  True Positive (TP)
                </div>
                <div className="text-3xl font-extrabold text-emerald-900 font-mono mt-1">
                  {cm.truePositive}
                </div>
                <div className="text-[10px] text-emerald-700 mt-1">Correct High Risk Identified</div>
              </div>

              {/* False Positive */}
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl">
                <div className="text-[10px] uppercase font-bold text-amber-800">
                  False Positive (FP)
                </div>
                <div className="text-3xl font-extrabold text-amber-900 font-mono mt-1">
                  {cm.falsePositive}
                </div>
                <div className="text-[10px] text-amber-700 mt-1">Type I False Alarm</div>
              </div>

              {/* False Negative */}
              <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl">
                <div className="text-[10px] uppercase font-bold text-rose-800">
                  False Negative (FN)
                </div>
                <div className="text-3xl font-extrabold text-rose-900 font-mono mt-1">
                  {cm.falseNegative}
                </div>
                <div className="text-[10px] text-rose-700 mt-1">Type II Missed Critical (2.8%)</div>
              </div>

              {/* True Negative */}
              <div className="bg-teal-50 border-2 border-teal-300 p-4 rounded-xl">
                <div className="text-[10px] uppercase font-bold text-teal-800">
                  True Negative (TN)
                </div>
                <div className="text-3xl font-extrabold text-teal-900 font-mono mt-1">
                  {cm.trueNegative}
                </div>
                <div className="text-[10px] text-teal-700 mt-1">Correct Low Risk Cleared</div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Correlation Matrix */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-teal-600" />
              <h3 className="text-base font-bold text-slate-900">
                Biomarker & Hemodynamic Feature Correlations
              </h3>
            </div>
            <span className="text-xs font-mono text-teal-700 font-semibold">Pearson Matrix</span>
          </div>

          <p className="text-xs text-slate-500">
            Pairwise correlation coefficients highlighting multi-collinear associations with adverse cardiovascular events.
          </p>

          <div className="space-y-2.5 pt-2">
            {FEATURE_CORRELATIONS.map((c) => (
              <div
                key={c.feature1 + c.feature2}
                className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-slate-800">
                    {c.feature1} &harr; {c.feature2}
                  </div>
                  <div className="text-[10px] text-slate-400">Clinical Impact: {c.riskEffect}</div>
                </div>

                <div className="flex items-center gap-2 font-mono">
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded ${
                      c.corr > 0.7
                        ? 'bg-rose-100 text-rose-800'
                        : c.corr > 0
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    r = {c.corr > 0 ? '+' : ''}
                    {c.corr.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
