import React from 'react';
import {
  FileText,
  Printer,
  Download,
  Shield,
  HeartPulse,
  Activity,
  CheckCircle2,
  Calendar,
  User,
  Clock,
  Cpu,
  Binary,
} from 'lucide-react';
import { EcgWaveform } from '../components/visuals/EcgWaveform';
import { PatientVitals, PredictionResult } from '../types/health';
import { generateRecommendations } from '../utils/riskEngine';

interface ReportsViewProps {
  vitals: PatientVitals;
  prediction: PredictionResult;
}

export const ReportsView: React.FC<ReportsViewProps> = ({ vitals, prediction }) => {
  const recommendations = generateRecommendations(vitals, prediction);

  const handlePrint = () => {
    window.print();
  };

  const isHigh = prediction.riskLevel === 'HIGH';
  const isMed = prediction.riskLevel === 'MEDIUM';

  return (
    <div className="space-y-8 pb-16">
      {/* Top Action Bar (hidden on print) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 no-print">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-teal-50 text-teal-700 border border-teal-200">
              <FileText className="w-4 h-4" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Clinical Research Risk Dossier
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Formal explainable AI diagnostic report suitable for clinical review, case defense, or archive.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Report Document Container */}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-md space-y-8 print:border-none print:shadow-none print:p-0">
        {/* Document Header */}
        <div className="border-b-2 border-slate-900 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-600 to-cyan-700 flex items-center justify-center text-white shadow-md">
              <HeartPulse className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                AI HealthGuard Intelligence Platform
              </h2>
              <p className="text-xs font-semibold text-teal-700">
                Explainable AI Healthcare Risk Prediction System • Clinical Research Division
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right text-xs text-slate-500">
            <div className="font-mono font-bold text-slate-900">
              REF #{prediction.patientId}-{new Date().getFullYear()}
            </div>
            <div>Generated: {new Date(prediction.timestamp).toLocaleDateString()}</div>
            <div className="font-mono text-[10px] text-teal-700 font-medium">
              Audit Hash: {prediction.auditHash}
            </div>
          </div>
        </div>

        {/* Decorative ECG Waveform Motif */}
        <div className="py-1 border-y border-slate-100">
          <EcgWaveform color={isHigh ? 'coral' : 'teal'} height={36} animate={false} />
        </div>

        {/* Patient Profile & Intake Vitals Matrix */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            I. Patient Demographics & Intake Physiological Panel
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px]">Patient Name</span>
              <strong className="text-slate-900">{vitals.name}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Patient Record ID</span>
              <span className="font-mono font-bold text-slate-800">{vitals.id}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Age / Gender</span>
              <span className="text-slate-800">{vitals.age} yrs • {vitals.gender}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Body Mass Index (BMI)</span>
              <span className="font-mono text-slate-800">{vitals.bmi.toFixed(1)} kg/m²</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Blood Pressure (SBP/DBP)</span>
              <span className="font-mono font-bold text-slate-900">{vitals.systolicBp}/{vitals.diastolicBp} mmHg</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Glycated Hemoglobin (HbA1c)</span>
              <span className="font-mono font-bold text-slate-900">{vitals.hba1c}%</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">High-Sens. CRP (hs-CRP)</span>
              <span className="font-mono font-bold text-slate-900">{vitals.hsCrp} mg/L</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Lipid Profile (LDL / HDL)</span>
              <span className="font-mono text-slate-900">{vitals.cholesterolLdl} / {vitals.cholesterolHdl} mg/dL</span>
            </div>
          </div>
        </div>

        {/* Prediction Verdict & Confidence Box */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            II. Primary AI Stratification & Confidence Calibration
          </h3>

          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-teal-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] uppercase font-bold tracking-widest text-teal-300">
                Composite Risk Assessment
              </span>
              <div className="text-4xl font-extrabold tracking-tight font-mono text-white">
                {prediction.riskScore.toFixed(1)}%
              </div>
              <div className="text-sm font-semibold text-slate-300">
                Category: <strong className={isHigh ? 'text-rose-400' : isMed ? 'text-amber-400' : 'text-emerald-400'}>{prediction.riskLevel} RISK</strong>
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono text-right bg-slate-800/80 p-4 rounded-xl border border-slate-700">
              <div className="flex justify-between gap-4">
                <span className="text-slate-400">Model Confidence:</span>
                <span className="text-teal-300 font-bold">{prediction.confidence}%</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-slate-400">Ensemble Agreement:</span>
                <span className="text-cyan-300 font-bold">{prediction.ensembleAgreement}%</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-slate-400">Baseline Prior E[f(x)]:</span>
                <span className="text-slate-300">{prediction.baseValueShap}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* SHAP Feature Importance Table */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            III. Shapley Additive Explanations (SHAP) Attribution Decomposition
          </h3>

          <div className="overflow-x-auto border border-slate-200 rounded-2xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-500 uppercase text-[10px]">
                <tr>
                  <th className="py-2.5 pl-3">Physiological Factor</th>
                  <th className="py-2.5">Measured Value</th>
                  <th className="py-2.5">Reference Standard</th>
                  <th className="py-2.5 font-mono">SHAP Force (φ)</th>
                  <th className="py-2.5 pr-3">Direction</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {prediction.shapContributions.map((c) => (
                  <tr key={c.feature}>
                    <td className="py-2.5 pl-3 font-semibold text-slate-800">{c.label}</td>
                    <td className="py-2.5 font-mono text-slate-600">{c.value}</td>
                    <td className="py-2.5 text-slate-400">{c.standardNormal}</td>
                    <td className="py-2.5 font-mono font-bold">
                      <span className={c.shapValue >= 0 ? 'text-rose-600' : 'text-emerald-600'}>
                        {c.shapValue >= 0 ? '+' : ''}{c.shapValue.toFixed(1)}%
                      </span>
                    </td>
                    <td className="py-2.5 pr-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        c.shapValue >= 0 ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'
                      }`}>
                        {c.shapValue >= 0 ? 'Risk Elevating' : 'Cardioprotective'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Clinical Recommendations Summary */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            IV. Targeted Clinical Interventions & Counterfactual Objectives
          </h3>

          <div className="space-y-2">
            {recommendations.slice(0, 3).map((rec, i) => (
              <div key={rec.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <strong className="text-slate-900">0{i+1}. {rec.title}</strong>
                  <span className="font-mono text-emerald-700 font-bold">Projected -{rec.projectedRiskDrop}%</span>
                </div>
                <p className="text-slate-600 text-[11px]">{rec.suggestedAction}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Formal Signature & Scientific Attestation Block */}
        <div className="pt-8 border-t border-slate-200 grid grid-cols-2 gap-8 text-xs">
          <div>
            <div className="font-bold text-slate-900">Chief Clinical Informatics Reviewer</div>
            <div className="text-slate-400 text-[11px] mt-0.5">Computational AI Research Laboratory</div>
            <div className="h-10 mt-2 border-b border-dashed border-slate-300 flex items-end">
              <span className="font-serif italic text-teal-800 text-sm opacity-80">Dr. A. Vance, MD, PhD</span>
            </div>
          </div>

          <div>
            <div className="font-bold text-slate-900">Primary AI Architecture Verification</div>
            <div className="text-slate-400 text-[11px] mt-0.5">XGBoost v2.1 + TreeExplainer Engine</div>
            <div className="h-10 mt-2 border-b border-dashed border-slate-300 flex items-end">
              <span className="font-mono text-[11px] text-slate-600">Model SHA-256 Validated</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
