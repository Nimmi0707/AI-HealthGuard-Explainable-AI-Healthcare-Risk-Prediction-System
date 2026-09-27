import React, { useState } from 'react';
import {
  Settings,
  User,
  Bell,
  Palette,
  Shield,
  Cpu,
  Database,
  Info,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Layers,
} from 'lucide-react';

interface SettingsViewProps {
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
  userName?: string;
  userInitials?: string;
  onUpdateInitials?: (init: string) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  isDarkMode = false,
  onToggleDarkMode,
  userName = 'Nimmi',
  userInitials = 'N',
  onUpdateInitials,
}) => {
  const [activeTab, setActiveTab] = useState<
    'profile' | 'notifications' | 'appearance' | 'privacy' | 'model' | 'dataset' | 'about'
  >('model');

  const tabs = [
    { id: 'model', label: 'AI Model Specs', icon: Cpu },
    { id: 'dataset', label: 'Dataset Information', icon: Database },
    { id: 'about', label: 'About Project', icon: Info },
    { id: 'profile', label: 'Investigator Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'privacy', label: 'Data Privacy & HIPAA', icon: Shield },
  ] as const;

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-teal-50 text-teal-700 border border-teal-200">
              <Settings className="w-4 h-4" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              System Settings & Architecture Specifications
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Configure system parameters, review machine learning hyperparameters, and inspect training cohorts.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Tabs (Left) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-3 border border-slate-200 shadow-xs space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panels (Right) */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          {/* TAB: AI Model Specs */}
          {activeTab === 'model' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-teal-600" />
                  <span>Primary Inference Model & SHAP Explainer Architecture</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Production parameters for gradient boosted decision trees and TreeExplainer polynomial formulation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Algorithm Family</span>
                  <strong className="text-slate-900 font-mono">XGBoost v2.1 (Histogram-Optimized)</strong>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Tree Depth (max_depth)</span>
                  <strong className="text-slate-900 font-mono">6 levels (Regularized)</strong>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Number of Estimators</span>
                  <strong className="text-slate-900 font-mono">500 Boosted Decision Stumps</strong>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Learning Rate (eta)</span>
                  <strong className="text-slate-900 font-mono">0.035 (Early Stopping: 25)</strong>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">XAI Interpretability Algorithm</span>
                  <strong className="text-teal-800 font-mono">TreeExplainer (Lundberg et al., Nature MI)</strong>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Computational Complexity</span>
                  <strong className="text-slate-900 font-mono">O(TLD²) where D = max_depth</strong>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200 text-xs space-y-1.5">
                <div className="font-bold text-teal-950 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  <span>Axiomatic Guarantee of Additive Attributions</span>
                </div>
                <p className="text-teal-900/80 leading-relaxed text-[11px]">
                  TreeExplainer computes exact conditional expectations over all possible feature coalitions, guaranteeing that local feature contributions sum exactly to the margin between model output and expected baseline.
                </p>
              </div>
            </div>
          )}

          {/* TAB: Dataset Information */}
          {activeTab === 'dataset' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Database className="w-5 h-5 text-teal-600" />
                  <span>Clinical Cohort & Benchmark Dataset Provenance</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Multi-center validation benchmarks harmonized according to epidemiological standards.
                </p>
              </div>

              <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
                <p>
                  The training and cross-validation corpus aggregates data points harmonized with the <strong>National Health and Nutrition Examination Survey (NHANES)</strong> and MIMIC-IV cardiovascular disease sub-cohorts.
                </p>

                <div className="grid grid-cols-3 gap-3 pt-2 text-center">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="text-xl font-extrabold text-slate-900 font-mono">1,500</div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold mt-0.5">
                      Sample Size
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="text-xl font-extrabold text-slate-900 font-mono">12</div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold mt-0.5">
                      Clinical Features
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="text-xl font-extrabold text-slate-900 font-mono">0.972</div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold mt-0.5">
                      ROC Area
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="font-bold text-slate-800 mb-1">Pre-processing Pipeline:</div>
                  <ul className="list-disc pl-5 space-y-1 text-[11px] text-slate-500">
                    <li>Winsorization applied to physiological outliers at 1st and 99th percentiles</li>
                    <li>Median imputation via IterativeImputer for sparse lab values</li>
                    <li>Quantile transformation for skewed inflammatory biomarker distributions (hs-CRP)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB: About Project */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Info className="w-5 h-5 text-teal-600" />
                  <span>AI HealthGuard — Academic Project Brief</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Explainable AI Healthcare Risk Prediction System for Computer Science & Healthcare Informatics research.
                </p>
              </div>

              <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="font-bold text-slate-900 text-sm">
                    Core Thesis & Motivation
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    While modern machine learning achieves remarkable discrimination accuracy in cardiovascular risk modeling, standard clinical adoption is impeded by black-box opacity. AI HealthGuard demonstrates that cooperative game theory (SHAP) combined with counterfactual sensitivity analysis provides actionable, mathematically sound, and patient-centric explainability.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="font-bold text-slate-800">Primary Technical Contributions:</div>
                  <div className="space-y-2 text-[11px]">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                      <span><strong>Real-time SHAP Waterfall Generation:</strong> Instant decomposition of patient predictions into local force vectors φᵢ.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                      <span><strong>Interactive Counterfactual Simulator:</strong> Dynamic what-if analysis quantifying projected risk drops for clinical interventions.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                      <span><strong>Clinical Research Reporting Suite:</strong> Structured audit trails compliant with algorithmic transparency recommendations.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: Investigator Profile */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <User className="w-5 h-5 text-teal-600" />
                  <span>Clinical Research Investigator Profile</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Authenticated session information for academic evaluation and clinical trials.
                </p>
              </div>

              <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-teal-600 to-cyan-500 text-white flex items-center justify-center font-bold text-xl shadow-md ring-4 ring-teal-100">
                  {userInitials}
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-extrabold text-base text-slate-900">{userName}</h4>
                  <div className="text-xs text-teal-700 font-semibold">
                    nimmi07072003@gmail.com
                  </div>
                  <div className="text-xs text-slate-600">
                    Lead Clinical AI Investigator • Cardiovascular XAI Lab
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 font-mono">
                    Session: Principal Evaluator (Academic Clinical Protocol)
                  </div>
                </div>
              </div>

              {/* Avatar Switcher */}
              <div className="p-4 bg-teal-50/70 rounded-2xl border border-teal-200 space-y-3">
                <div className="font-bold text-xs text-teal-950">
                  Header Avatar Badge Configuration:
                </div>
                <p className="text-[11px] text-teal-900/80">
                  Choose how your avatar badge appears in the top navigation bar:
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => onUpdateInitials && onUpdateInitials('N')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors flex items-center gap-2 ${
                      userInitials === 'N'
                        ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span>"N" — Personal Name (Nimmi)</span>
                  </button>

                  <button
                    onClick={() => onUpdateInitials && onUpdateInitials('RI')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors flex items-center gap-2 ${
                      userInitials === 'RI'
                        ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span>"RI" — Research Investigator (Role)</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: Notifications */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-teal-600" />
                  <span>Clinical Alert & Surveillance Thresholds</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Configure real-time notifications for anomalous or high-risk cohort events.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                  <div>
                    <strong className="text-slate-800 block">Critical High-Risk Alerts</strong>
                    <span className="text-slate-500 text-[11px]">Notify immediately when a patient crosses &ge; 62% predicted event probability</span>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-teal-600" />
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                  <div>
                    <strong className="text-slate-800 block">Model Drift Surveillance</strong>
                    <span className="text-slate-500 text-[11px]">Audit weekly residual variance between XGBoost and LightGBM ensemble</span>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-teal-600" />
                </label>
              </div>
            </div>
          )}

          {/* TAB: Appearance */}
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Palette className="w-5 h-5 text-teal-600" />
                  <span>Visual Theme & Ergonomics</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tailored high-readability healthcare palette designed for clinical environments.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Clinical Day Light Button */}
                <div
                  onClick={() => {
                    if (isDarkMode && onToggleDarkMode) onToggleDarkMode();
                  }}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer space-y-2 ${
                    !isDarkMode
                      ? 'border-teal-600 bg-teal-50/60 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 text-sm">Clinical Day Light</span>
                    {!isDarkMode && (
                      <span className="text-[10px] font-bold bg-teal-600 text-white px-2 py-0.5 rounded-full uppercase">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    High-contrast white & slate background optimized for daytime clinical readability, viva presentation, and formal report printing.
                  </p>
                </div>

                {/* Surgical Dark Mode Button */}
                <div
                  onClick={() => {
                    if (!isDarkMode && onToggleDarkMode) onToggleDarkMode();
                  }}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer space-y-2 ${
                    isDarkMode
                      ? 'border-teal-500 bg-slate-900 text-white shadow-sm ring-2 ring-teal-500/20'
                      : 'border-slate-700 bg-slate-900 text-white hover:border-slate-500 opacity-80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-white text-sm">Surgical Dark Mode</span>
                    {isDarkMode && (
                      <span className="text-[10px] font-bold bg-teal-500 text-slate-950 px-2 py-0.5 rounded-full uppercase">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Deep high-contrast obsidian & teal palette for low-luminance intensive care units, nocturnal telemetry, and futuristic glow aesthetics.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB: Privacy */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-teal-600" />
                  <span>Data Protection & Computational Compliance</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Adherence to international computational healthcare research guidelines.
                </p>
              </div>

              <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
                <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 flex items-start gap-2.5">
                  <Shield className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-emerald-900">Zero Protected Health Information (PHI) Retention:</strong>
                    <p className="text-emerald-800 text-[11px] mt-0.5">
                      All calculations execute client-side or within transient stateless micro-containers. No real patient data is transmitted or retained.
                    </p>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500">
                  Synthetic test records generated for viva evaluation align with the 18 Safe Harbor de-identification elements specified under HIPAA 45 CFR &sect; 164.514(b).
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
