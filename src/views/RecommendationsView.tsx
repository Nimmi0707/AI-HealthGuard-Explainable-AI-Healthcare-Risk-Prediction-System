import React from 'react';
import {
  Lightbulb,
  Heart,
  Activity,
  AlertTriangle,
  ShieldCheck,
  TrendingDown,
  Sparkles,
  ArrowRight,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { PatientVitals, PredictionResult, RecommendationItem } from '../types/health';
import { generateRecommendations } from '../utils/riskEngine';
import { NavigationPage } from '../components/layout/Sidebar';

interface RecommendationsViewProps {
  vitals: PatientVitals;
  prediction: PredictionResult;
  onNavigate: (page: NavigationPage) => void;
}

export const RecommendationsView: React.FC<RecommendationsViewProps> = ({
  vitals,
  prediction,
  onNavigate,
}) => {
  const recommendations: RecommendationItem[] = generateRecommendations(vitals, prediction);

  const getPriorityStyle = (priority: RecommendationItem['priority']) => {
    switch (priority) {
      case 'CRITICAL':
        return 'bg-rose-50 text-rose-700 border-rose-300';
      case 'HIGH':
        return 'bg-amber-50 text-amber-700 border-amber-300';
      case 'MODERATE':
        return 'bg-cyan-50 text-cyan-800 border-cyan-300';
      case 'LOW':
      default:
        return 'bg-emerald-50 text-emerald-700 border-emerald-300';
    }
  };

  const totalProjectedReduction = recommendations.reduce(
    (acc, item) => acc + (item.projectedRiskDrop || 0),
    0
  );

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-teal-50 text-teal-700 border border-teal-200">
              <Lightbulb className="w-4 h-4" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Intelligent Clinical Recommendations
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Personalized interventions derived from SHAP force attributions and counterfactual optimization for{' '}
            <strong className="text-slate-800">{prediction.patientName}</strong>.
          </p>
        </div>

        {/* Projected Impact Pill */}
        <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-2 rounded-2xl border border-emerald-200">
          <TrendingDown className="w-4 h-4 text-emerald-600" />
          <div className="text-xs">
            <span className="text-slate-500">Cumulative Risk Reduction: </span>
            <strong className="text-emerald-800 font-mono">
              -{Math.min(prediction.riskScore - 5, totalProjectedReduction).toFixed(1)}%
            </strong>
          </div>
        </div>
      </div>

      {/* Research Prototype Alert Banner */}
      <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 flex items-start gap-3">
        <Info className="w-4 h-4 text-teal-700 mt-0.5 shrink-0" />
        <div className="text-xs text-slate-600 leading-relaxed">
          <strong className="text-teal-900">Academic Decision-Support Prototype:</strong> The interventions below are synthesized algorithmically by cross-referencing model feature attributions with clinical practice guidelines (ACC/AHA & ADA). They are intended for demonstration and scholarly research.
        </div>
      </div>

      {/* Recommendation Cards List */}
      <div className="space-y-5">
        {recommendations.map((rec, idx) => (
          <div
            key={rec.id}
            className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center font-bold text-xs">
                  0{idx + 1}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{rec.title}</h3>
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Category: {rec.category}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border ${getPriorityStyle(
                    rec.priority
                  )}`}
                >
                  Priority: {rec.priority}
                </span>

                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  -{rec.projectedRiskDrop}% Risk
                </span>
              </div>
            </div>

            {/* Grid of Reasoning, Suggested Action, and AI Explanation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {/* Reason */}
              <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-200/70 space-y-1">
                <div className="font-bold text-slate-700 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Clinical Indication</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">{rec.reason}</p>
              </div>

              {/* Suggested Action */}
              <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-200/70 space-y-1">
                <div className="font-bold text-slate-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Suggested Clinical Action</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">{rec.suggestedAction}</p>
              </div>

              {/* AI Explanation */}
              <div className="bg-teal-50/40 p-3.5 rounded-xl border border-teal-200/60 space-y-1">
                <div className="font-bold text-teal-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                  <span>XAI Attribution Rationale</span>
                </div>
                <p className="text-teal-950/80 leading-relaxed text-[11px]">{rec.aiExplanation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Footer */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900">
            Export Formal Clinical Audit Dossier
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Compile these recommendations and SHAP feature attributions into a structured PDF document.
          </p>
        </div>

        <button
          onClick={() => onNavigate('reports')}
          className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2"
        >
          <span>Compile Clinical Report</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
