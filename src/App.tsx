import React, { useState, useEffect } from 'react';
import { Sidebar, NavigationPage } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { HomeView } from './views/HomeView';
import { DashboardView } from './views/DashboardView';
import { AssessmentView } from './views/AssessmentView';
import { PredictionResultView } from './views/PredictionResultView';
import { ExplainableAiView } from './views/ExplainableAiView';
import { PatientHistoryView } from './views/PatientHistoryView';
import { AnalyticsView } from './views/AnalyticsView';
import { RecommendationsView } from './views/RecommendationsView';
import { ReportsView } from './views/ReportsView';
import { SettingsView } from './views/SettingsView';
import { BENCHMARK_CASES, INITIAL_PATIENT_HISTORY, NIMMI_PATIENT_PROFILE } from './data/clinicalDatasets';
import { PatientVitals, PredictionResult } from './types/health';
import { calculateClinicalRisk } from './utils/riskEngine';

const STORAGE_KEY = 'ai_healthguard_patients_registry';
const THEME_STORAGE_KEY = 'ai_healthguard_theme_dark';
const INITIALS_STORAGE_KEY = 'ai_healthguard_initials';

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('overview');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Dark Mode Theme State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme !== null) {
        return savedTheme === 'true';
      }
    } catch (e) {
      console.warn('Failed to load theme preference', e);
    }
    return false; // Default to clean Clinical Light mode
  });

  // User Avatar Initials State ('N' for Nimmi or 'RI' for Research Investigator)
  const [userInitials, setUserInitials] = useState<string>(() => {
    try {
      return localStorage.getItem(INITIALS_STORAGE_KEY) || 'N';
    } catch {
      return 'N';
    }
  });

  // Sync dark class on document element
  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, String(isDarkMode));
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      console.warn('Failed to save theme preference', e);
    }
  }, [isDarkMode]);

  const handleToggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleUpdateInitials = (newInitials: string) => {
    setUserInitials(newInitials);
    try {
      localStorage.setItem(INITIALS_STORAGE_KEY, newInitials);
    } catch (e) {
      console.warn('Failed to save initials', e);
    }
  };

  // Dynamic Patient Cohort Registry with LocalStorage persistence
  const [patientsList, setPatientsList] = useState<PatientVitals[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          if (!parsed.some((p: any) => p.id === 'PT-10023' || p.name?.toLowerCase().includes('nimmi'))) {
            return [NIMMI_PATIENT_PROFILE, ...parsed];
          }
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to load saved patients from localStorage', e);
    }
    return INITIAL_PATIENT_HISTORY;
  });

  // Save to localStorage when patientsList changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(patientsList));
    } catch (e) {
      console.warn('Failed to save patients to localStorage', e);
    }
  }, [patientsList]);

  // Active patient session (defaults to Nimmi profile)
  const [activeVitals, setActiveVitals] = useState<PatientVitals>(NIMMI_PATIENT_PROFILE);
  const [activePrediction, setActivePrediction] = useState<PredictionResult>(() =>
    calculateClinicalRisk(NIMMI_PATIENT_PROFILE)
  );

  const handleSelectPreset = (vitals: PatientVitals) => {
    setActiveVitals(vitals);
    const pred = calculateClinicalRisk(vitals);
    setActivePrediction(pred);
  };

  const handleUpdateVitals = (vitals: PatientVitals) => {
    setActiveVitals(vitals);
    const pred = calculateClinicalRisk(vitals);
    setActivePrediction(pred);
  };

  const handleAssessmentComplete = (prediction: PredictionResult) => {
    setActivePrediction(prediction);
  };

  const handleAddPatient = (newPatient: PatientVitals) => {
    // Add new patient to registry (avoiding duplicates by id)
    setPatientsList((prev) => {
      const existingIdx = prev.findIndex((p) => p.id === newPatient.id);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx] = newPatient;
        return updated;
      }
      return [newPatient, ...prev];
    });

    // Make this patient active and compute risk
    setActiveVitals(newPatient);
    const pred = calculateClinicalRisk(newPatient);
    setActivePrediction(pred);
  };

  const handleDeletePatient = (patientId: string) => {
    setPatientsList((prev) => prev.filter((p) => p.id !== patientId));
  };

  return (
    <div
      className={`min-h-screen font-sans antialiased transition-colors duration-200 ${
        isDarkMode
          ? 'dark bg-slate-950 text-slate-100'
          : 'bg-slate-50 text-slate-900'
      } flex bg-medical-grid`}
    >
      {/* Left Navigation Sidebar */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        isOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        {/* Top Sticky Navigation Bar with Dark Mode Toggle and Profile */}
        <Header
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onSelectPreset={(vitals) => {
            handleSelectPreset(vitals);
            setCurrentPage('predictions');
          }}
          currentPatientName={activeVitals.name}
          isDarkMode={isDarkMode}
          onToggleDarkMode={handleToggleDarkMode}
          userName="Nimmi"
          userRole="Lead Clinical AI Investigator"
          userInitials={userInitials}
          onUpdateInitials={handleUpdateInitials}
        />

        {/* Dynamic Page Views */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {currentPage === 'overview' && (
            <HomeView
              onNavigate={setCurrentPage}
              onSelectPreset={(vitals) => {
                handleSelectPreset(vitals);
                setCurrentPage('predictions');
              }}
            />
          )}

          {currentPage === 'dashboard' && (
            <DashboardView
              patients={patientsList}
              onNavigate={setCurrentPage}
              onSelectPatient={(vitals) => {
                handleSelectPreset(vitals);
              }}
            />
          )}

          {currentPage === 'assessment' && (
            <AssessmentView
              currentVitals={activeVitals}
              onUpdateVitals={handleUpdateVitals}
              onAssessmentComplete={handleAssessmentComplete}
              onSaveToRegistry={handleAddPatient}
              onNavigate={setCurrentPage}
            />
          )}

          {currentPage === 'predictions' && (
            <PredictionResultView
              prediction={activePrediction}
              vitals={activeVitals}
              onNavigate={setCurrentPage}
            />
          )}

          {currentPage === 'xai' && (
            <ExplainableAiView
              currentVitals={activeVitals}
              currentPrediction={activePrediction}
              onUpdateVitals={handleUpdateVitals}
            />
          )}

          {currentPage === 'history' && (
            <PatientHistoryView
              patients={patientsList}
              onSelectPatient={(vitals) => {
                handleSelectPreset(vitals);
              }}
              onAddPatient={handleAddPatient}
              onDeletePatient={handleDeletePatient}
              onNavigate={setCurrentPage}
            />
          )}

          {currentPage === 'analytics' && <AnalyticsView />}

          {currentPage === 'recommendations' && (
            <RecommendationsView
              vitals={activeVitals}
              prediction={activePrediction}
              onNavigate={setCurrentPage}
            />
          )}

          {currentPage === 'reports' && (
            <ReportsView vitals={activeVitals} prediction={activePrediction} />
          )}

          {currentPage === 'settings' && (
            <SettingsView
              isDarkMode={isDarkMode}
              onToggleDarkMode={handleToggleDarkMode}
              userName="Nimmi"
              userInitials={userInitials}
              onUpdateInitials={handleUpdateInitials}
            />
          )}
        </main>
      </div>
    </div>
  );
}
