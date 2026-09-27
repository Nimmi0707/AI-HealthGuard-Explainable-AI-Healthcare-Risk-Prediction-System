import React, { useState } from 'react';
import {
  Search,
  Bell,
  HelpCircle,
  Menu,
  Sparkles,
  Heart,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Moon,
  Sun,
  User,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { EcgWaveform } from '../visuals/EcgWaveform';
import { BENCHMARK_CASES } from '../../data/clinicalDatasets';
import { PatientVitals } from '../../types/health';

interface HeaderProps {
  onOpenMobileSidebar: () => void;
  onSelectPreset: (vitals: PatientVitals) => void;
  currentPatientName?: string;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  userName?: string;
  userRole?: string;
  userInitials?: string;
  onUpdateInitials?: (initials: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMobileSidebar,
  onSelectPreset,
  currentPatientName,
  isDarkMode,
  onToggleDarkMode,
  userName = 'Nimmi',
  userRole = 'Lead Clinical AI Investigator',
  userInitials = 'N',
  onUpdateInitials,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showPresetsMenu, setShowPresetsMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifications = [
    {
      id: 'notif-1',
      title: 'High-Risk Critical Alert: Arthur Pendelton',
      time: '12m ago',
      desc: 'Systolic blood pressure 162 mmHg with positive SHAP force +11.8%',
      type: 'high',
    },
    {
      id: 'notif-2',
      title: 'Active Patient Loaded: Nimmi',
      time: 'Just now',
      desc: 'Optimal cardioprotective baseline evaluated (14.2% Risk, Low)',
      type: 'success',
    },
    {
      id: 'notif-3',
      title: 'Ensemble Calibration Validated',
      time: '1h ago',
      desc: 'TreeExplainer additive attribution test passed with 0% drift',
      type: 'info',
    },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      {/* Top subtle ECG pulse line ribbon */}
      <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
        <EcgWaveform color="teal" height={6} animate={true} />
      </div>

      <div className="px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Left: Mobile trigger & Breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileSidebar}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
            aria-label="Toggle Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              Cardiovascular Risk Intelligence
            </span>
            <span>/</span>
            <span className="text-teal-700 dark:text-teal-400 font-medium">Explainable AI Core</span>
            {currentPatientName && (
              <>
                <span>/</span>
                <span className="bg-teal-50 dark:bg-teal-950/70 text-teal-800 dark:text-teal-300 px-2.5 py-0.5 rounded-full font-mono text-[11px] font-semibold border border-teal-200 dark:border-teal-800">
                  Active: {currentPatientName}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Center: Quick Benchmark Cases Selector */}
        <div className="relative">
          <button
            onClick={() => setShowPresetsMenu(!showPresetsMenu)}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-teal-50/80 dark:bg-teal-950/50 hover:bg-teal-100/80 dark:hover:bg-teal-900/60 text-teal-900 dark:text-teal-200 text-xs font-semibold border border-teal-200 dark:border-teal-800 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>Load Benchmark Cases</span>
            <ChevronDown className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
          </button>

          {showPresetsMenu && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800 mb-1">
                Clinical Test Scenarios
              </div>
              {BENCHMARK_CASES.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => {
                    onSelectPreset(preset.vitals);
                    setShowPresetsMenu(false);
                  }}
                  className="w-full text-left px-3.5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/80 flex items-start gap-2.5 transition-colors"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                      preset.expectedRisk === 'HIGH'
                        ? 'bg-rose-500'
                        : preset.expectedRisk === 'MEDIUM'
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                    }`}
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {preset.title}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                      {preset.subhead}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Action Icons & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* DARK / LIGHT MODE TOGGLE BUTTON */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all flex items-center justify-center relative group"
            title={isDarkMode ? 'Switch to Clinical Light Mode' : 'Switch to Surgical Dark Mode'}
            aria-label="Toggle Theme"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600 group-hover:-rotate-12 transition-transform" />
            )}
          </button>

          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
            </button>

            {/* Notification Drawer */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Bell className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                    <span>Clinical Research Notifications</span>
                  </div>
                  <span className="text-[10px] font-mono bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-300 px-2 py-0.5 rounded-full font-bold">
                    3 New
                  </span>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="py-2.5 hover:bg-slate-50/60 dark:hover:bg-slate-800/50 px-1 rounded-lg"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                          {n.title}
                        </div>
                        <span className="text-[10px] text-slate-400 shrink-0">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                        {n.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Help Button */}
          <button
            onClick={() => setShowHelpModal(true)}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Academic Research Guide"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* USER PROFILE AVATAR (EXPLAINING 'RI' / CUSTOMIZABLE TO 'Nimmi' or 'RI') */}
          <div className="relative pl-1 border-l border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-hidden"
              title="Click to view User Profile & Info about 'RI'"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-600 to-cyan-500 text-white flex items-center justify-center font-bold text-xs shadow-xs ring-2 ring-teal-100 dark:ring-teal-900">
                {userInitials}
              </div>
              <div className="hidden xl:block text-left pr-1">
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                  <span>{userName}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </div>
                <div className="text-[10px] text-teal-700 dark:text-teal-400 font-medium">
                  {userRole}
                </div>
              </div>
            </button>

            {/* Profile Menu Popover explaining 'RI' and allowing profile adjustments */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-teal-600 to-cyan-500 text-white flex items-center justify-center font-bold text-base shadow-md">
                    {userInitials}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{userName}</h4>
                    <p className="text-[11px] text-teal-700 dark:text-teal-400 font-medium">
                      nimmi07072003@gmail.com
                    </p>
                    <span className="text-[10px] font-mono text-slate-400">{userRole}</span>
                  </div>
                </div>

                {/* Explanation of "RI" badge */}
                <div className="mt-3 p-2.5 rounded-xl bg-teal-50/70 dark:bg-teal-950/60 border border-teal-200/80 dark:border-teal-800 text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  <strong className="text-teal-900 dark:text-teal-200 block mb-0.5">
                    💡 What was "RI"?
                  </strong>
                  "RI" stands for <strong>Research Investigator</strong> (the principal evaluator). You can toggle between displaying <strong>"N" (Nimmi)</strong> or <strong>"RI"</strong> below!
                </div>

                {/* Toggle Initials */}
                <div className="mt-3 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Avatar Display:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onUpdateInitials && onUpdateInitials('N')}
                      className={`py-1.5 px-2 rounded-lg text-xs font-bold border transition-colors flex items-center justify-center gap-1 ${
                        userInitials === 'N'
                          ? 'bg-teal-600 text-white border-teal-600'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {userInitials === 'N' && <Check className="w-3 h-3" />}
                      <span>N (Nimmi)</span>
                    </button>

                    <button
                      onClick={() => onUpdateInitials && onUpdateInitials('RI')}
                      className={`py-1.5 px-2 rounded-lg text-xs font-bold border transition-colors flex items-center justify-center gap-1 ${
                        userInitials === 'RI'
                          ? 'bg-teal-600 text-white border-teal-600'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {userInitials === 'RI' && <Check className="w-3 h-3" />}
                      <span>RI (Investigator)</span>
                    </button>
                  </div>
                </div>

                {/* Theme Mode toggle inside profile */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    {isDarkMode ? <Moon className="w-3.5 h-3.5 text-cyan-400" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
                    <span>Theme Mode:</span>
                  </span>
                  <button
                    onClick={onToggleDarkMode}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors"
                  >
                    {isDarkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                  AI HealthGuard — System Architecture
                </h3>
              </div>
              <button
                onClick={() => setShowHelpModal(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                <strong>AI HealthGuard</strong> is an Explainable Artificial Intelligence (XAI) research platform engineered for predictive cardiovascular and metabolic disease risk stratification.
              </p>
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
                <div className="font-semibold text-slate-800 dark:text-slate-200">Key Scientific Methodologies:</div>
                <ul className="list-disc pl-4 space-y-1">
                  <li><strong>TreeExplainer SHAP:</strong> Calculates local additive feature attribution φᵢ with mathematically guaranteed efficiency and symmetry.</li>
                  <li><strong>Counterfactual Sensitivity:</strong> Evaluates minimal clinical parameter perturbations required to shift high risk to cardioprotective bands.</li>
                  <li><strong>Multi-Model Benchmarking:</strong> Compares XGBoost, LightGBM, Random Forest, and ResNet-Tab MLPs.</li>
                </ul>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                Notice: Developed for computational healthcare informatics research and presentation. Clinical decisions should be corroborated with formal diagnostic evaluations.
              </p>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setShowHelpModal(false)}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-colors"
              >
                Close Briefing
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
