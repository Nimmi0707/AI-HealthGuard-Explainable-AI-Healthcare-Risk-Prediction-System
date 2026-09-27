import React, { useState } from 'react';
import {
  Heart,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Search,
  ChevronRight,
  Filter,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { EcgWaveform } from '../components/visuals/EcgWaveform';
import { INITIAL_PATIENT_HISTORY, MONTHLY_ACTIVITY } from '../data/clinicalDatasets';
import { calculateClinicalRisk } from '../utils/riskEngine';
import { PatientVitals } from '../types/health';
import { NavigationPage } from '../components/layout/Sidebar';

interface DashboardViewProps {
  patients?: PatientVitals[];
  onNavigate: (page: NavigationPage) => void;
  onSelectPatient: (vitals: PatientVitals) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  patients = INITIAL_PATIENT_HISTORY,
  onNavigate,
  onSelectPatient,
}) => {
  const [filterRisk, setFilterRisk] = useState<string>('ALL');

  // Pre-calculate risk stats from current patient history
  const scoredPatients = patients.map((p) => ({
    ...p,
    prediction: calculateClinicalRisk(p),
  }));

  const totalCount = scoredPatients.length * 125; // Scaled for cohort perspective
  const highRiskCount = scoredPatients.filter((p) => p.prediction.riskLevel === 'HIGH').length * 125;
  const medRiskCount = scoredPatients.filter((p) => p.prediction.riskLevel === 'MEDIUM').length * 125;
  const lowRiskCount = scoredPatients.filter((p) => p.prediction.riskLevel === 'LOW').length * 125;

  const filteredPatients = scoredPatients.filter((p) => {
    if (filterRisk === 'ALL') return true;
    return p.prediction.riskLevel === filterRisk;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner / Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-teal-50 text-teal-700 border border-teal-200">
              <Activity className="w-4 h-4" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Clinical Telemetry & Risk Surveillance
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time cohort monitoring, demographic risk distributions, and explainable inference activity.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('assessment')}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
          >
            <Heart className="w-3.5 h-3.5" />
            <span>New Assessment</span>
          </button>
        </div>
      </div>

      {/* 4 Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Assessments */}
        <div className="relative bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 border border-teal-200/60 flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <span className="flex items-center gap-0.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <TrendingUp className="w-3 h-3" />
              +14.8%
            </span>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-slate-900 font-mono tracking-tight">
              {totalCount.toLocaleString()}
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-0.5">Total Assessments</div>
          </div>
          {/* Micro Trend Line Graphic */}
          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Monthly Velocity</span>
            <span className="font-mono text-slate-600 font-medium">412 cases / mo</span>
          </div>
        </div>

        {/* High Risk */}
        <div className="relative bg-white rounded-2xl p-5 border border-rose-200/90 shadow-xs hover:shadow-md transition-shadow overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 border border-rose-200/60 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span className="flex items-center gap-0.5 text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
              <ArrowUpRight className="w-3 h-3" />
              +4.2%
            </span>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-rose-700 font-mono tracking-tight">
              {highRiskCount.toLocaleString()}
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-0.5">High Risk Stratified</div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Critical Interventions</span>
            <span className="font-mono text-rose-600 font-semibold">Priority 1</span>
          </div>
        </div>

        {/* Medium Risk */}
        <div className="relative bg-white rounded-2xl p-5 border border-amber-200/90 shadow-xs hover:shadow-md transition-shadow overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-200/60 flex items-center justify-center">
              <AlertCircle className="w-5 h-5" />
            </div>
            <span className="flex items-center gap-0.5 text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Active
            </span>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-amber-700 font-mono tracking-tight">
              {medRiskCount.toLocaleString()}
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-0.5">Moderate Risk Cohort</div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Early Intervention Target</span>
            <span className="font-mono text-amber-600 font-semibold">Lifestyle / Rx</span>
          </div>
        </div>

        {/* Low Risk */}
        <div className="relative bg-white rounded-2xl p-5 border border-emerald-200/90 shadow-xs hover:shadow-md transition-shadow overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/60 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className="flex items-center gap-0.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <TrendingUp className="w-3 h-3" />
              +8.5%
            </span>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-emerald-700 font-mono tracking-tight">
              {lowRiskCount.toLocaleString()}
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-0.5">Low Risk Baseline</div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Cardioprotective</span>
            <span className="font-mono text-emerald-600 font-semibold">Normative</span>
          </div>
        </div>
      </div>

      {/* Decorative ECG Waveform Divider */}
      <div className="py-2 opacity-75">
        <EcgWaveform color="teal" height={32} animate={true} />
      </div>

      {/* Middle Grid: Large Health Risk Overview Chart & Donut Risk Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Large Health Risk Overview Bar/Trend Visualization */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>Health Risk Overview & Monthly Assessment Activity</span>
              </h3>
              <p className="text-xs text-slate-500">
                Temporal distribution of multi-center validation cohorts across risk categories.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-rose-500" />
                <span className="text-slate-600">High</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-amber-500" />
                <span className="text-slate-600">Medium</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
                <span className="text-slate-600">Low</span>
              </div>
            </div>
          </div>

          {/* Bar Chart Container */}
          <div className="h-64 flex items-end justify-between gap-4 pt-6 px-2">
            {MONTHLY_ACTIVITY.map((item) => {
              const maxVal = 450;
              const highHeight = (item.high / maxVal) * 100;
              const medHeight = (item.med / maxVal) * 100;
              const lowHeight = (item.low / maxVal) * 100;

              return (
                <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  <div className="w-full max-w-[48px] flex flex-col justify-end h-full">
                    {/* High Risk Segment */}
                    <div
                      style={{ height: `${highHeight}%` }}
                      className="w-full bg-rose-500 hover:bg-rose-600 rounded-t transition-all relative group/bar"
                    >
                      <div className="opacity-0 group-hover/bar:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-1.5 py-0.5 rounded shadow pointer-events-none z-10 whitespace-nowrap">
                        High: {item.high}
                      </div>
                    </div>
                    {/* Medium Risk Segment */}
                    <div
                      style={{ height: `${medHeight}%` }}
                      className="w-full bg-amber-400 hover:bg-amber-500 transition-all relative group/bar"
                    >
                      <div className="opacity-0 group-hover/bar:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-1.5 py-0.5 rounded shadow pointer-events-none z-10 whitespace-nowrap">
                        Med: {item.med}
                      </div>
                    </div>
                    {/* Low Risk Segment */}
                    <div
                      style={{ height: `${lowHeight}%` }}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 rounded-b transition-all relative group/bar"
                    >
                      <div className="opacity-0 group-hover/bar:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-1.5 py-0.5 rounded shadow pointer-events-none z-10 whitespace-nowrap">
                        Low: {item.low}
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <span className="text-xs font-bold text-slate-700 block">{item.month}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{item.total}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
            <span>Ensemble Model: Gradient Boosted Trees + SHAP</span>
            <span className="font-mono text-teal-600 font-semibold">Temporal Stability: 99.4%</span>
          </div>
        </div>

        {/* Donut Chart: Risk Distribution */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Risk Stratification Distribution
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Population-level risk segmentation
            </p>

            {/* Donut graphic representation using circular SVG */}
            <div className="relative w-48 h-48 mx-auto my-6 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                {/* Low risk: 42% (circumference ~ 314 * 0.42 = 132) */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#10b981"
                  strokeWidth="14"
                  strokeDasharray="105 133"
                  strokeDashoffset="0"
                />
                {/* Medium risk: 36% (circumference ~ 314 * 0.36 = 113) */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#f59e0b"
                  strokeWidth="14"
                  strokeDasharray="90 148"
                  strokeDashoffset="-105"
                />
                {/* High risk: 22% (circumference ~ 314 * 0.22 = 69) */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#f43f5e"
                  strokeWidth="14"
                  strokeDasharray="55 183"
                  strokeDashoffset="-195"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-bold text-slate-400 uppercase">Sample</span>
                <span className="text-xl font-extrabold text-slate-900 font-mono">1,500</span>
                <span className="text-[10px] text-teal-600 font-medium">Patients</span>
              </div>
            </div>

            {/* Donut Legend */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500" />
                  <span className="font-medium text-slate-700">High Risk (Severe)</span>
                </div>
                <span className="font-mono font-bold text-slate-900">22.4%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="font-medium text-slate-700">Medium Risk (Elevated)</span>
                </div>
                <span className="font-mono font-bold text-slate-900">38.6%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="font-medium text-slate-700">Low Risk (Cardioprotective)</span>
                </div>
                <span className="font-mono font-bold text-slate-900">39.0%</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('analytics')}
            className="w-full mt-4 py-2 bg-slate-50 hover:bg-slate-100 text-teal-700 rounded-xl text-xs font-bold border border-slate-200 transition-colors flex items-center justify-center gap-1"
          >
            <span>Examine Detailed Metrics</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Recent Patient Assessments Table with Risk Badges */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-teal-600" />
              <span>Recent Risk Stratifications</span>
            </h3>
            <p className="text-xs text-slate-500">
              Interactive clinical cohort log with instant explainability drilldown.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2">
            {['ALL', 'HIGH', 'MEDIUM', 'LOW'].map((risk) => (
              <button
                key={risk}
                onClick={() => setFilterRisk(risk)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                  filterRisk === risk
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {risk}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                <th className="pb-3 pl-2">Patient</th>
                <th className="pb-3">Age / Sex</th>
                <th className="pb-3">Hemodynamics (BP)</th>
                <th className="pb-3">Biomarkers (HbA1c / hs-CRP)</th>
                <th className="pb-3">Risk Assessment</th>
                <th className="pb-3">Confidence</th>
                <th className="pb-3 text-right pr-2">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPatients.slice(0, 6).map((patient) => {
                const isHigh = patient.prediction.riskLevel === 'HIGH';
                const isMed = patient.prediction.riskLevel === 'MEDIUM';

                return (
                  <tr key={patient.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 pl-2 font-medium">
                      <div className="font-bold text-slate-800">{patient.name}</div>
                      <div className="text-[10px] font-mono text-slate-400">{patient.id}</div>
                    </td>
                    <td className="py-3.5 text-slate-600">
                      {patient.age} yrs • {patient.gender}
                    </td>
                    <td className="py-3.5">
                      <span className="font-mono font-medium text-slate-700">
                        {patient.systolicBp}/{patient.diastolicBp} mmHg
                      </span>
                    </td>
                    <td className="py-3.5">
                      <span className="font-mono text-slate-600">
                        {patient.hba1c}% • {patient.hsCrp} mg/L
                      </span>
                    </td>
                    <td className="py-3.5">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          isHigh
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : isMed
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isHigh ? 'bg-rose-500' : isMed ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}
                        />
                        {patient.prediction.riskLevel} ({patient.prediction.riskScore}%)
                      </span>
                    </td>
                    <td className="py-3.5 font-mono text-slate-500">
                      {patient.prediction.confidence}%
                    </td>
                    <td className="py-3.5 text-right pr-2">
                      <button
                        onClick={() => {
                          onSelectPatient(patient);
                          onNavigate('xai');
                        }}
                        className="px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-[11px] transition-colors border border-teal-200"
                      >
                        Explain AI
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Showing latest stratified cohorts</span>
          <button
            onClick={() => onNavigate('history')}
            className="text-teal-700 hover:text-teal-900 font-bold flex items-center gap-1"
          >
            <span>View All Patients</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
