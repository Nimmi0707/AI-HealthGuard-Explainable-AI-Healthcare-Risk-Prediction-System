import React, { useState, useEffect } from 'react';
import {
  Heart,
  Activity,
  User,
  Sliders,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  AlertCircle,
  Cpu,
  Binary,
  Layers,
  FileText,
  RotateCcw,
  UserPlus,
} from 'lucide-react';
import { EcgWaveform } from '../components/visuals/EcgWaveform';
import { RiskRadialGauge } from '../components/visuals/RiskRadialGauge';
import { PatientVitals, PredictionResult } from '../types/health';
import { calculateClinicalRisk } from '../utils/riskEngine';
import { BENCHMARK_CASES } from '../data/clinicalDatasets';
import { NavigationPage } from '../components/layout/Sidebar';

interface AssessmentViewProps {
  currentVitals: PatientVitals;
  onUpdateVitals: (vitals: PatientVitals) => void;
  onAssessmentComplete: (prediction: PredictionResult) => void;
  onSaveToRegistry?: (patient: PatientVitals) => void;
  onNavigate: (page: NavigationPage) => void;
}

export const AssessmentView: React.FC<AssessmentViewProps> = ({
  currentVitals,
  onUpdateVitals,
  onAssessmentComplete,
  onSaveToRegistry,
  onNavigate,
}) => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<PatientVitals>(currentVitals);
  const [analyzingStep, setAnalyzingStep] = useState<number>(0);
  const [completedPrediction, setCompletedPrediction] = useState<PredictionResult | null>(null);
  const [savedToast, setSavedToast] = useState(false);

  // Sync formData if currentVitals changes externally
  useEffect(() => {
    setFormData(currentVitals);
  }, [currentVitals]);

  const stepsList = [
    { num: '01', title: 'Basic Info', desc: 'Demographics' },
    { num: '02', title: 'Health Attributes', desc: 'Biomarkers & BP' },
    { num: '03', title: 'Lifestyle', desc: 'Habits & Genetic' },
    { num: '04', title: 'AI Analysis', desc: 'Inference Engine' },
    { num: '05', title: 'Result', desc: 'Stratification' },
  ];

  // AI Analysis sequence simulation
  useEffect(() => {
    if (step === 4) {
      setAnalyzingStep(1);
      const timer1 = setTimeout(() => setAnalyzingStep(2), 700);
      const timer2 = setTimeout(() => setAnalyzingStep(3), 1500);
      const timer3 = setTimeout(() => {
        setAnalyzingStep(4);
        const result = calculateClinicalRisk(formData);
        setCompletedPrediction(result);
        onAssessmentComplete(result);
        onUpdateVitals(formData);
        setTimeout(() => setStep(5), 600);
      }, 2300);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [step, formData]);

  const handleChange = (field: keyof PatientVitals, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleApplyPreset = (presetVitals: PatientVitals) => {
    setFormData(presetVitals);
    onUpdateVitals(presetVitals);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header & Viva Presets Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-teal-50 text-teal-700 border border-teal-200">
              <Activity className="w-4 h-4" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Clinical Risk Intake & Assessment
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            5-step calibrated multi-factorial cardiovascular and metabolic risk intake.
          </p>
        </div>

        {/* Quick Viva Benchmark Loaders */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-semibold text-slate-400">Load Test Case:</span>
          {BENCHMARK_CASES.map((b) => (
            <button
              key={b.id}
              onClick={() => handleApplyPreset(b.vitals)}
              className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-[11px] font-medium text-slate-700 shadow-2xs hover:border-teal-400 transition-colors"
            >
              {b.vitals.name.split(' ')[0]} ({b.expectedRisk})
            </button>
          ))}
        </div>
      </div>

      {/* 5-Step Progress Stepper Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/90 shadow-xs">
        <div className="grid grid-cols-5 gap-2 sm:gap-4">
          {stepsList.map((s, idx) => {
            const stepNum = idx + 1;
            const isCompleted = step > stepNum;
            const isCurrent = step === stepNum;

            return (
              <div
                key={s.num}
                onClick={() => {
                  // Allow jumping to completed steps or current
                  if (stepNum <= step || completedPrediction) {
                    setStep(stepNum);
                  }
                }}
                className={`relative flex flex-col items-center text-center cursor-pointer transition-all ${
                  isCurrent
                    ? 'text-teal-900 font-bold'
                    : isCompleted
                    ? 'text-slate-700'
                    : 'text-slate-400 opacity-60'
                }`}
              >
                {/* Progress pill / circle */}
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-mono text-xs font-bold transition-all mb-2 shadow-xs ${
                    isCurrent
                      ? 'bg-teal-600 text-white ring-4 ring-teal-100 scale-105'
                      : isCompleted
                      ? 'bg-teal-100 text-teal-800'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : s.num}
                </div>

                <div className="text-[11px] sm:text-xs font-bold line-clamp-1">{s.title}</div>
                <div className="hidden sm:block text-[10px] text-slate-400">{s.desc}</div>

                {/* Progress bar line connecting */}
                {idx < 4 && (
                  <div
                    className={`hidden lg:block absolute top-5 -right-1/2 w-full h-0.5 pointer-events-none ${
                      isCompleted ? 'bg-teal-500' : 'bg-slate-200'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Form Steps (Left) + AI Assessment Live Preview Card (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form Card Area */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
          {/* STEP 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-teal-600" />
                  <h3 className="text-lg font-bold text-slate-900">01. Basic Demographics & Identifiers</h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Standard demographic parameters utilized for population age-adjusted cardiovascular baseline.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Patient Name / Alias
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 text-sm font-medium outline-hidden"
                    placeholder="e.g. Arthur Pendelton"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Patient ID
                  </label>
                  <input
                    type="text"
                    value={formData.id}
                    onChange={(e) => handleChange('id', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono text-sm outline-hidden bg-slate-50"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Age (Years)
                    </label>
                    <span className="font-mono text-sm font-bold text-teal-800">{formData.age} yrs</span>
                  </div>
                  <input
                    type="range"
                    min="18"
                    max="90"
                    value={formData.age}
                    onChange={(e) => handleChange('age', Number(e.target.value))}
                    className="w-full accent-teal-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                    <span>18</span>
                    <span>45 (baseline)</span>
                    <span>90</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Biological Sex
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Male', 'Female', 'Other'] as const).map((gender) => (
                      <button
                        key={gender}
                        type="button"
                        onClick={() => handleChange('gender', gender)}
                        className={`py-2 text-xs font-bold rounded-xl border transition-colors ${
                          formData.gender === gender
                            ? 'bg-teal-600 text-white border-teal-600'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {gender}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Body Mass Index (BMI)
                    </label>
                    <span className="font-mono text-sm font-bold text-teal-800">
                      {formData.bmi.toFixed(1)} kg/m²
                    </span>
                  </div>
                  <input
                    type="range"
                    min="16.0"
                    max="45.0"
                    step="0.1"
                    value={formData.bmi}
                    onChange={(e) => handleChange('bmi', Number(e.target.value))}
                    className="w-full accent-teal-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                    <span>18.5 (Normal)</span>
                    <span>25.0 (Overweight)</span>
                    <span>30+ (Obese)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Resting Heart Rate
                    </label>
                    <span className="font-mono text-sm font-bold text-teal-800">
                      {formData.restingHeartRate} bpm
                    </span>
                  </div>
                  <input
                    type="range"
                    min="45"
                    max="125"
                    value={formData.restingHeartRate}
                    onChange={(e) => handleChange('restingHeartRate', Number(e.target.value))}
                    className="w-full accent-teal-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                    <span>50 (Athletic)</span>
                    <span>72 (Normal)</span>
                    <span>100+ (Tachycardia)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Health Attributes & Biomarkers */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-teal-600" />
                  <h3 className="text-lg font-bold text-slate-900">02. Hemodynamics & Laboratory Biomarkers</h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Critical diagnostic markers measured via blood pressure cuff and venous blood serum analysis.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Systolic BP */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Systolic BP (mmHg)
                    </label>
                    <span className={`font-mono text-sm font-extrabold ${formData.systolicBp > 140 ? 'text-rose-600' : 'text-teal-800'}`}>
                      {formData.systolicBp} mmHg
                    </span>
                  </div>
                  <input
                    type="range"
                    min="90"
                    max="200"
                    value={formData.systolicBp}
                    onChange={(e) => handleChange('systolicBp', Number(e.target.value))}
                    className="w-full accent-teal-600 cursor-pointer"
                  />
                  <div className="text-[11px] text-slate-500">
                    Optimal &lt; 120 • Stage 1 &ge; 130 • Stage 2 &ge; 140
                  </div>
                </div>

                {/* Diastolic BP */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Diastolic BP (mmHg)
                    </label>
                    <span className="font-mono text-sm font-extrabold text-teal-800">
                      {formData.diastolicBp} mmHg
                    </span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="120"
                    value={formData.diastolicBp}
                    onChange={(e) => handleChange('diastolicBp', Number(e.target.value))}
                    className="w-full accent-teal-600 cursor-pointer"
                  />
                  <div className="text-[11px] text-slate-500">
                    Normal &lt; 80 • Hypertension &ge; 90
                  </div>
                </div>

                {/* Glycated Hemoglobin (HbA1c) */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      HbA1c (%)
                    </label>
                    <span className={`font-mono text-sm font-extrabold ${formData.hba1c >= 6.5 ? 'text-rose-600' : 'text-teal-800'}`}>
                      {formData.hba1c.toFixed(1)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="4.0"
                    max="12.0"
                    step="0.1"
                    value={formData.hba1c}
                    onChange={(e) => handleChange('hba1c', Number(e.target.value))}
                    className="w-full accent-teal-600 cursor-pointer"
                  />
                  <div className="text-[11px] text-slate-500">
                    Normal &lt; 5.7% • Pre-diabetes 5.7-6.4% • Diabetes &ge; 6.5%
                  </div>
                </div>

                {/* hs-CRP Inflammatory Marker */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      hs-CRP (mg/L)
                    </label>
                    <span className={`font-mono text-sm font-extrabold ${formData.hsCrp >= 3.0 ? 'text-rose-600' : 'text-teal-800'}`}>
                      {formData.hsCrp.toFixed(2)} mg/L
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="10.0"
                    step="0.05"
                    value={formData.hsCrp}
                    onChange={(e) => handleChange('hsCrp', Number(e.target.value))}
                    className="w-full accent-teal-600 cursor-pointer"
                  />
                  <div className="text-[11px] text-slate-500">
                    Low risk &lt; 1.0 • Average 1.0-3.0 • High risk &gt; 3.0
                  </div>
                </div>

                {/* LDL Cholesterol */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      LDL-C Atherogenic (mg/dL)
                    </label>
                    <span className="font-mono text-sm font-extrabold text-teal-800">
                      {formData.cholesterolLdl} mg/dL
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="240"
                    value={formData.cholesterolLdl}
                    onChange={(e) => handleChange('cholesterolLdl', Number(e.target.value))}
                    className="w-full accent-teal-600 cursor-pointer"
                  />
                  <div className="text-[11px] text-slate-500">
                    Optimal &lt; 100 • Borderline 130-159 • High &ge; 160
                  </div>
                </div>

                {/* HDL Cholesterol */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      HDL-C Protective (mg/dL)
                    </label>
                    <span className="font-mono text-sm font-extrabold text-emerald-700">
                      {formData.cholesterolHdl} mg/dL
                    </span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={formData.cholesterolHdl}
                    onChange={(e) => handleChange('cholesterolHdl', Number(e.target.value))}
                    className="w-full accent-teal-600 cursor-pointer"
                  />
                  <div className="text-[11px] text-slate-500">
                    Poor &lt; 40 • Cardioprotective &gt; 50 mg/dL
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Lifestyle & Genetic Predisposition */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-teal-600" />
                  <h3 className="text-lg font-bold text-slate-900">03. Lifestyle, Behaviors & Family History</h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Behavioral and genetic factors that act as multiplicative modifiers on baseline risk.
                </p>
              </div>

              <div className="space-y-5">
                {/* Tobacco smoking status */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Tobacco Smoking Exposure
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['Never', 'Former', 'Current'] as const).map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => handleChange('smokingStatus', status)}
                        className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                          formData.smokingStatus === status
                            ? status === 'Current'
                              ? 'bg-rose-50 border-rose-400 text-rose-800 ring-2 ring-rose-200'
                              : 'bg-teal-50 border-teal-400 text-teal-800 ring-2 ring-teal-200'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="text-xs font-bold">{status} Smoker</div>
                        <div className="text-[10px] text-slate-500 font-normal mt-0.5">
                          {status === 'Current' ? '+8.6% SHAP shift' : status === 'Former' ? 'Cessation benefits' : 'Protective baseline'}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Physical Activity */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Physical Activity Frequency
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['Sedentary', 'Moderate', 'Active'] as const).map((act) => (
                      <button
                        key={act}
                        type="button"
                        onClick={() => handleChange('physicalActivityLevel', act)}
                        className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                          formData.physicalActivityLevel === act
                            ? 'bg-teal-50 border-teal-400 text-teal-800 ring-2 ring-teal-200'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="text-xs font-bold">{act}</div>
                        <div className="text-[10px] text-slate-500 font-normal mt-0.5">
                          {act === 'Active' ? 'Cardioprotective' : act === 'Moderate' ? '150 min/wk' : 'Minimal exertion'}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Family History Checkboxes */}
                <div className="pt-2 space-y-3">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Genetic & Co-Morbidity Indicators
                  </label>

                  <label className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.familyHeartDisease}
                      onChange={(e) => handleChange('familyHeartDisease', e.target.checked)}
                      className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 accent-teal-600"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-800">
                        First-Degree Family History of Early Coronary Artery Disease
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Myocardial infarction or sudden cardiac event in parent/sibling &lt; 55 yrs (male) or &lt; 65 yrs (female)
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.historyDiabetes}
                      onChange={(e) => handleChange('historyDiabetes', e.target.checked)}
                      className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 accent-teal-600"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-800">
                        Diagnosed Type 2 Diabetes Mellitus / Metabolic Syndrome
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Documented glycemic impairment requiring pharmacological management
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: AI Analysis in Progress Screen */}
          {step === 4 && (
            <div className="py-12 flex flex-col items-center justify-center space-y-8 text-center animate-in fade-in duration-300">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-teal-200 border-t-teal-600 animate-spin" />
                <div className="w-20 h-20 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 shadow-inner">
                  <Cpu className="w-10 h-10 animate-pulse" />
                </div>
              </div>

              <div className="space-y-2 max-w-md">
                <h3 className="text-xl font-bold text-slate-900">
                  Executing Explainable AI Inference
                </h3>
                <p className="text-xs text-slate-500">
                  Calculating ensemble gradient splits, Shapley force vectors, and counterfactual sensitivity margins.
                </p>
              </div>

              {/* Progress Milestones */}
              <div className="w-full max-w-sm space-y-2.5 text-left text-xs">
                <div className={`p-2.5 rounded-xl border flex items-center gap-2.5 ${analyzingStep >= 1 ? 'bg-teal-50 border-teal-200 text-teal-900' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                  <CheckCircle2 className={`w-4 h-4 ${analyzingStep >= 1 ? 'text-teal-600' : 'text-slate-300'}`} />
                  <span>1. Validating 12 clinical physiological bounds</span>
                </div>
                <div className={`p-2.5 rounded-xl border flex items-center gap-2.5 ${analyzingStep >= 2 ? 'bg-teal-50 border-teal-200 text-teal-900' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                  <CheckCircle2 className={`w-4 h-4 ${analyzingStep >= 2 ? 'text-teal-600' : 'text-slate-300'}`} />
                  <span>2. Traversing XGBoost & LightGBM ensemble trees</span>
                </div>
                <div className={`p-2.5 rounded-xl border flex items-center gap-2.5 ${analyzingStep >= 3 ? 'bg-teal-50 border-teal-200 text-teal-900' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                  <CheckCircle2 className={`w-4 h-4 ${analyzingStep >= 3 ? 'text-teal-600' : 'text-slate-300'}`} />
                  <span>3. Computing TreeExplainer SHAP attribution vector φ</span>
                </div>
                <div className={`p-2.5 rounded-xl border flex items-center gap-2.5 ${analyzingStep >= 4 ? 'bg-teal-50 border-teal-200 text-teal-900' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                  <CheckCircle2 className={`w-4 h-4 ${analyzingStep >= 4 ? 'text-teal-600' : 'text-slate-300'}`} />
                  <span>4. Calibrating probabilistic confidence score</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Assessment Result Summary */}
          {step === 5 && completedPrediction && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                    Analysis Complete
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">
                    Cardiovascular Risk Stratification Result
                  </h3>
                  <p className="text-xs text-slate-500">
                    Patient: <strong>{formData.name}</strong> ({formData.id}) • Calculated: {new Date(completedPrediction.timestamp).toLocaleTimeString()}
                  </p>
                </div>

                <button
                  onClick={() => setStep(1)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-600 flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Re-Assess</span>
                </button>
              </div>

              {/* Result Preview Box */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-slate-50/70 rounded-2xl p-6 border border-slate-200">
                <div className="md:col-span-5 flex justify-center">
                  <RiskRadialGauge
                    score={completedPrediction.riskScore}
                    riskLevel={completedPrediction.riskLevel}
                    confidence={completedPrediction.confidence}
                    size={220}
                  />
                </div>

                <div className="md:col-span-7 space-y-4">
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Primary Risk Drivers Identified by AI:
                    </div>
                    <div className="mt-2 space-y-1.5">
                      {completedPrediction.topDrivers.map((driver) => (
                        <div key={driver} className="flex items-center gap-2 text-xs font-semibold text-slate-800 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-2xs">
                          <span className="w-2 h-2 rounded-full bg-rose-500" />
                          <span>{driver}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-3">
                    <button
                      onClick={() => onNavigate('xai')}
                      className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-xs"
                    >
                      <Binary className="w-4 h-4" />
                      <span>Explore SHAP Waterfall & What-If</span>
                    </button>

                    {onSaveToRegistry && (
                      <button
                        onClick={() => {
                          onSaveToRegistry(formData);
                          setSavedToast(true);
                          setTimeout(() => setSavedToast(false), 3000);
                        }}
                        className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                          savedToast
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : 'bg-teal-50 hover:bg-teal-100 text-teal-800 border-teal-200'
                        }`}
                      >
                        <UserPlus className="w-4 h-4" />
                        <span>{savedToast ? 'Saved in Patient Registry!' : 'Save to Patient Registry'}</span>
                      </button>
                    )}

                    <button
                      onClick={() => onNavigate('reports')}
                      className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-xl text-xs font-bold transition-all flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4 text-slate-600" />
                      <span>Generate Full Report</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stepper Navigation Buttons */}
          {step < 4 && (
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold flex items-center gap-2 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous Step</span>
                </button>
              ) : (
                <div />
              )}

              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
              >
                <span>{step === 3 ? 'Run AI Analysis' : 'Next Step'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Right-Side "AI Assessment Preview" Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
                <h4 className="text-sm font-bold text-slate-900">AI Assessment Preview</h4>
              </div>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-semibold">
                Live Telemetry
              </span>
            </div>

            {/* Live ECG Waveform Animation Container */}
            <div className="bg-slate-900 rounded-xl p-3 shadow-inner border border-slate-800">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                <span>LEAD II • ECG</span>
                <span className="text-teal-400 font-bold">{formData.restingHeartRate} BPM</span>
              </div>
              <EcgWaveform color="teal" height={52} animate={true} />
            </div>

            {/* Live Input Summary Snapshot */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Blood Pressure:</span>
                <span className="font-mono font-bold text-slate-800">
                  {formData.systolicBp}/{formData.diastolicBp} mmHg
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Glycated HbA1c:</span>
                <span className="font-mono font-bold text-slate-800">{formData.hba1c}%</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">hs-CRP Biomarker:</span>
                <span className="font-mono font-bold text-slate-800">{formData.hsCrp} mg/L</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Atherogenic LDL:</span>
                <span className="font-mono font-bold text-slate-800">{formData.cholesterolLdl} mg/dL</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Smoking Status:</span>
                <span className="font-bold text-slate-800">{formData.smokingStatus}</span>
              </div>
            </div>

            {/* Engine Status indicator */}
            <div className="p-3 bg-teal-50/70 rounded-xl border border-teal-200/80 flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-ping" />
              <div>
                <div className="text-xs font-bold text-teal-950">Engine Status: Ready for Analysis</div>
                <div className="text-[10px] text-teal-700">Calibrated XGBoost Model Active</div>
              </div>
            </div>
          </div>

          {/* Academic Prototype Notice */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-[11px] leading-relaxed">
            <div className="flex items-center gap-1.5 font-bold text-slate-700 mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              <span>Computational Validation Standard</span>
            </div>
            All risk stratifications are derived through deterministic mathematical calibration. Synthetic validation presets conform to clinical reference cohorts.
          </div>
        </div>
      </div>
    </div>
  );
};
