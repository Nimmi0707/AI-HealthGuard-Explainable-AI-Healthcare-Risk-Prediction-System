import React from 'react';
import {
  LayoutDashboard,
  HeartPulse,
  Cpu,
  Binary,
  Users,
  BarChart3,
  Lightbulb,
  FileText,
  Settings,
  Shield,
  Home,
  ChevronRight,
  Activity,
} from 'lucide-react';

export type NavigationPage =
  | 'overview'
  | 'dashboard'
  | 'assessment'
  | 'predictions'
  | 'xai'
  | 'history'
  | 'analytics'
  | 'recommendations'
  | 'reports'
  | 'settings';

interface SidebarProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
  isOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  isOpen,
  onCloseMobile,
}) => {
  const navItems = [
    { id: 'overview' as NavigationPage, label: 'Overview', icon: Home, desc: 'Platform entry & briefing' },
    { id: 'dashboard' as NavigationPage, label: 'Dashboard', icon: LayoutDashboard, desc: 'Cohort KPIs & telemetry' },
    { id: 'assessment' as NavigationPage, label: 'Risk Assessment', icon: HeartPulse, desc: '5-step clinical intake' },
    { id: 'predictions' as NavigationPage, label: 'AI Predictions', icon: Cpu, desc: 'Calibrated risk scores' },
    { id: 'xai' as NavigationPage, label: 'Explainable AI', icon: Binary, desc: 'SHAP force & what-if' },
    { id: 'history' as NavigationPage, label: 'Patient History', icon: Users, desc: 'Cohort registry & filters' },
    { id: 'analytics' as NavigationPage, label: 'Analytics', icon: BarChart3, desc: 'ROC, F1 & model metrics' },
    { id: 'recommendations' as NavigationPage, label: 'Recommendations', icon: Lightbulb, desc: 'Intelligent interventions' },
    { id: 'reports' as NavigationPage, label: 'Reports', icon: FileText, desc: 'Clinical audit print/PDF' },
    { id: 'settings' as NavigationPage, label: 'Settings', icon: Settings, desc: 'Model parameters & citation' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-slate-200/90 dark:border-slate-800 flex flex-col transition-all duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('overview')}>
            {/* Heart + AI Circuit Logo Icon */}
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-teal-600 via-teal-700 to-cyan-800 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
              <HeartPulse className="w-6 h-6 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-cyan-400 border-2 border-white flex items-center justify-center">
                <span className="w-1 h-1 rounded-full bg-white animate-ping" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-slate-100">AI HealthGuard</span>
              </div>
              <p className="text-[11px] font-medium text-teal-700 dark:text-teal-400">Explainable AI Healthcare</p>
            </div>
          </div>
        </div>

        {/* Institution Badge */}
        <div className="px-4 py-2.5 bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
          <div className="text-[11px] text-slate-600 dark:text-slate-400 font-medium truncate">
            Clinical AI Research Platform
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 pb-1">
            Core Modules
          </div>

          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-semibold transition-all duration-150 group ${
                  isActive
                    ? 'bg-gradient-to-r from-teal-50 to-cyan-50/60 dark:from-teal-950/60 dark:to-cyan-950/40 text-teal-900 dark:text-teal-200 border border-teal-200/80 dark:border-teal-800 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      isActive
                        ? 'bg-teal-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 group-hover:text-slate-700 dark:group-hover:text-slate-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className={isActive ? 'font-bold text-teal-950 dark:text-teal-200' : 'font-medium'}>
                      {item.label}
                    </div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 font-normal">
                      {item.desc}
                    </div>
                  </div>
                </div>

                {isActive && (
                  <ChevronRight className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Footer info (Professional academic framing) */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40">
          <div className="rounded-xl border border-teal-100 dark:border-teal-900 bg-gradient-to-br from-teal-50/90 to-white dark:from-slate-800 dark:to-slate-900 p-3 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-teal-800 dark:text-teal-300 uppercase tracking-wider flex items-center gap-1">
                <Activity className="w-3 h-3 text-teal-600 dark:text-teal-400" />
                XGBoost + SHAP
              </span>
              <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-950/80 px-1.5 py-0.5 rounded font-semibold border border-emerald-200/50 dark:border-emerald-800/50">
                94.8% Acc
              </span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1.5 leading-snug">
              Explainable clinical risk intelligence prototype for cardiovascular assessment.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
