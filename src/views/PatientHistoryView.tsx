import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Download,
  ArrowUpDown,
  ChevronRight,
  Eye,
  Heart,
  Activity,
  Sliders,
  Sparkles,
  UserPlus,
  Trash2,
  X,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { PatientVitals } from '../types/health';
import { calculateClinicalRisk } from '../utils/riskEngine';
import { NavigationPage } from '../components/layout/Sidebar';

interface PatientHistoryViewProps {
  patients: PatientVitals[];
  onSelectPatient: (vitals: PatientVitals) => void;
  onAddPatient: (patient: PatientVitals) => void;
  onDeletePatient: (id: string) => void;
  onNavigate: (page: NavigationPage) => void;
}

export const PatientHistoryView: React.FC<PatientHistoryViewProps> = ({
  patients,
  onSelectPatient,
  onAddPatient,
  onDeletePatient,
  onNavigate,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState<string>('ALL');
  const [genderFilter, setGenderFilter] = useState<string>('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Patient Form State
  const initialNewPatientState: PatientVitals = {
    id: `PT-${Math.floor(10000 + Math.random() * 90000)}`,
    name: '',
    age: 52,
    gender: 'Male',
    systolicBp: 135,
    diastolicBp: 85,
    restingHeartRate: 74,
    bmi: 26.5,
    glucose: 105,
    hba1c: 5.8,
    cholesterolTotal: 210,
    cholesterolHdl: 46,
    cholesterolLdl: 130,
    hsCrp: 1.85,
    smokingStatus: 'Never',
    physicalActivityLevel: 'Moderate',
    familyHeartDisease: false,
    historyDiabetes: false,
    assessmentDate: new Date().toISOString().slice(0, 10),
  };

  const [newPatient, setNewPatient] = useState<PatientVitals>(initialNewPatientState);
  const [formError, setFormError] = useState('');

  // Precompute predictions for all patients in current list
  const patientsWithRisk = patients.map((p) => ({
    ...p,
    pred: calculateClinicalRisk(p),
  }));

  const filteredPatients = patientsWithRisk.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRisk = riskFilter === 'ALL' || p.pred.riskLevel === riskFilter;
    const matchesGender = genderFilter === 'ALL' || p.gender === genderFilter;

    return matchesSearch && matchesRisk && matchesGender;
  });

  const handleExportCsv = () => {
    const headers =
      'ID,Name,Age,Gender,SystolicBP,DiastolicBP,HbA1c,hsCRP,LDL,HDL,RiskScore,RiskLevel,AssessmentDate\n';
    const rows = filteredPatients
      .map(
        (p) =>
          `${p.id},"${p.name}",${p.age},${p.gender},${p.systolicBp},${p.diastolicBp},${p.hba1c},${p.hsCrp},${p.cholesterolLdl},${p.cholesterolHdl},${p.pred.riskScore},${p.pred.riskLevel},${p.assessmentDate}`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `AI_HealthGuard_Cohort_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleQuickFill = (type: 'healthy' | 'borderline' | 'highrisk') => {
    if (type === 'healthy') {
      setNewPatient((prev) => ({
        ...prev,
        systolicBp: 115,
        diastolicBp: 72,
        hba1c: 5.1,
        hsCrp: 0.45,
        cholesterolLdl: 85,
        cholesterolHdl: 65,
        bmi: 22.4,
        smokingStatus: 'Never',
        physicalActivityLevel: 'Active',
      }));
    } else if (type === 'borderline') {
      setNewPatient((prev) => ({
        ...prev,
        systolicBp: 136,
        diastolicBp: 86,
        hba1c: 5.9,
        hsCrp: 1.95,
        cholesterolLdl: 138,
        cholesterolHdl: 44,
        bmi: 27.8,
        smokingStatus: 'Former',
        physicalActivityLevel: 'Moderate',
      }));
    } else {
      setNewPatient((prev) => ({
        ...prev,
        systolicBp: 164,
        diastolicBp: 98,
        hba1c: 7.4,
        hsCrp: 4.1,
        cholesterolLdl: 172,
        cholesterolHdl: 36,
        bmi: 32.5,
        smokingStatus: 'Current',
        physicalActivityLevel: 'Sedentary',
        familyHeartDisease: true,
        historyDiabetes: true,
      }));
    }
  };

  const handleSaveNewPatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatient.name.trim()) {
      setFormError('Please enter a valid patient name.');
      return;
    }
    setFormError('');

    const patientToAdd: PatientVitals = {
      ...newPatient,
      id: newPatient.id || `PT-${Math.floor(10000 + Math.random() * 90000)}`,
      assessmentDate: new Date().toISOString().slice(0, 10),
    };

    onAddPatient(patientToAdd);
    setIsAddModalOpen(false);
    setNewPatient({
      ...initialNewPatientState,
      id: `PT-${Math.floor(10000 + Math.random() * 90000)}`,
    });
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-teal-50 text-teal-700 border border-teal-200">
              <Users className="w-4 h-4" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Patient History & Cohort Registry
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Registered clinical cases ({patients.length} total) with automated risk stratification and SHAP vectors.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Add New Patient Button */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add New Patient</span>
          </button>

          <button
            onClick={handleExportCsv}
            className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold transition-colors flex items-center gap-2 shadow-2xs"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name or ID (e.g. PT-90412)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-hidden"
            />
          </div>

          {/* Risk Level Pills */}
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
              Risk:
            </span>
            {['ALL', 'HIGH', 'MEDIUM', 'LOW'].map((risk) => (
              <button
                key={risk}
                onClick={() => setRiskFilter(risk)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                  riskFilter === risk
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {risk}
              </button>
            ))}
          </div>

          {/* Gender Filter */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Sex:
            </span>
            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 bg-white outline-hidden"
            >
              <option value="ALL">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cohort Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 pl-4">Patient Profile</th>
                <th className="py-3.5 px-3">Age / Sex</th>
                <th className="py-3.5 px-3">Hemodynamics (BP)</th>
                <th className="py-3.5 px-3">Metabolic (HbA1c)</th>
                <th className="py-3.5 px-3">Inflammation (hs-CRP)</th>
                <th className="py-3.5 px-3">Lipids (LDL / HDL)</th>
                <th className="py-3.5 px-3">Smoking</th>
                <th className="py-3.5 px-3">Predicted Risk</th>
                <th className="py-3.5 pr-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPatients.map((patient) => {
                const isHigh = patient.pred.riskLevel === 'HIGH';
                const isMed = patient.pred.riskLevel === 'MEDIUM';

                return (
                  <tr key={patient.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="py-3.5 pl-4">
                      <div className="font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                        {patient.name}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">
                        {patient.id} • {patient.assessmentDate}
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-slate-600">
                      {patient.age} yrs • {patient.gender}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="font-mono font-medium text-slate-800">
                        {patient.systolicBp}/{patient.diastolicBp} mmHg
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`font-mono font-medium ${
                          patient.hba1c >= 6.5 ? 'text-rose-600 font-bold' : 'text-slate-700'
                        }`}
                      >
                        {patient.hba1c}%
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`font-mono font-medium ${
                          patient.hsCrp >= 3.0 ? 'text-rose-600 font-bold' : 'text-slate-700'
                        }`}
                      >
                        {patient.hsCrp} mg/L
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-mono text-slate-600">
                      {patient.cholesterolLdl} / {patient.cholesterolHdl}
                    </td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          patient.smokingStatus === 'Current'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {patient.smokingStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
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
                        {patient.pred.riskLevel} ({patient.pred.riskScore}%)
                      </span>
                    </td>
                    <td className="py-3.5 pr-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            onSelectPatient(patient);
                            onNavigate('predictions');
                          }}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-teal-700 hover:bg-slate-100 transition-colors"
                          title="View Prediction"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => {
                            onSelectPatient(patient);
                            onNavigate('xai');
                          }}
                          className="px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 text-[11px] font-bold border border-teal-200 transition-colors"
                        >
                          Explain
                        </button>

                        {/* Delete Patient Button */}
                        <button
                          onClick={() => {
                            if (confirm(`Remove ${patient.name} from the clinical cohort?`)) {
                              onDeletePatient(patient.id);
                            }
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete from Registry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>
            Showing {filteredPatients.length} of {patients.length} recorded cohort members
          </span>
          <span className="font-mono text-[11px] text-teal-700 font-semibold">
            All records validated against FHIR R4 clinical data specifications
          </span>
        </div>
      </div>

      {/* Add New Patient Modal Dialog */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center font-bold">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Register New Clinical Patient
                  </h3>
                  <p className="text-xs text-slate-500">
                    Enter demographic and laboratory values to calculate automated XAI risk.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Presets Pre-fill */}
            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <span className="font-bold text-slate-600">Quick Clinical Profiles:</span>
              <button
                type="button"
                onClick={() => handleQuickFill('healthy')}
                className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium hover:bg-emerald-100"
              >
                Normotensive Cardioprotective
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('borderline')}
                className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 font-medium hover:bg-amber-100"
              >
                Pre-Hypertensive
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('highrisk')}
                className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-800 border border-rose-200 font-medium hover:bg-rose-100"
              >
                Severe Atherosclerotic
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                <span>{formError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSaveNewPatient} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Full Patient Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Evelyn Reed"
                    value={newPatient.name}
                    onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-hidden font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Patient ID</label>
                  <input
                    type="text"
                    value={newPatient.id}
                    onChange={(e) => setNewPatient({ ...newPatient, id: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono bg-slate-50 outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Age (Years)</label>
                  <input
                    type="number"
                    min="18"
                    max="95"
                    value={newPatient.age}
                    onChange={(e) => setNewPatient({ ...newPatient, age: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Sex</label>
                  <select
                    value={newPatient.gender}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, gender: e.target.value as any })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-medium outline-hidden"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">BMI (kg/m²)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="16"
                    max="50"
                    value={newPatient.bmi}
                    onChange={(e) => setNewPatient({ ...newPatient, bmi: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono outline-hidden"
                  />
                </div>
              </div>

              {/* Hemodynamics & Lab Values */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Systolic BP (mmHg)</label>
                  <input
                    type="number"
                    min="80"
                    max="220"
                    value={newPatient.systolicBp}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, systolicBp: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono outline-hidden font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Diastolic BP (mmHg)</label>
                  <input
                    type="number"
                    min="50"
                    max="130"
                    value={newPatient.diastolicBp}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, diastolicBp: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">HbA1c (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="4.0"
                    max="14.0"
                    value={newPatient.hba1c}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, hba1c: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono outline-hidden font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">hs-CRP (mg/L)</label>
                  <input
                    type="number"
                    step="0.05"
                    min="0.1"
                    max="15.0"
                    value={newPatient.hsCrp}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, hsCrp: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono outline-hidden font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">LDL Chol (mg/dL)</label>
                  <input
                    type="number"
                    min="40"
                    max="300"
                    value={newPatient.cholesterolLdl}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, cholesterolLdl: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">HDL Chol (mg/dL)</label>
                  <input
                    type="number"
                    min="20"
                    max="120"
                    value={newPatient.cholesterolHdl}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, cholesterolHdl: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Resting HR (bpm)</label>
                  <input
                    type="number"
                    min="40"
                    max="140"
                    value={newPatient.restingHeartRate}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, restingHeartRate: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono outline-hidden"
                  />
                </div>
              </div>

              {/* Lifestyle & History */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Smoking Habit</label>
                  <select
                    value={newPatient.smokingStatus}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, smokingStatus: e.target.value as any })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-medium outline-hidden"
                  >
                    <option value="Never">Never Smoker</option>
                    <option value="Former">Former Smoker</option>
                    <option value="Current">Current Smoker</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Physical Activity</label>
                  <select
                    value={newPatient.physicalActivityLevel}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, physicalActivityLevel: e.target.value as any })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-medium outline-hidden"
                  >
                    <option value="Active">Active (&ge; 150 min/wk)</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Sedentary">Sedentary</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newPatient.familyHeartDisease}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, familyHeartDisease: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 accent-teal-600"
                  />
                  <span>Family History of Early Heart Disease</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newPatient.historyDiabetes}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, historyDiabetes: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 accent-teal-600"
                  />
                  <span>Type 2 Diabetes / Metabolic Syndrome</span>
                </label>
              </div>

              {/* Modal Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold transition-all shadow-sm flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Save to Patient Cohort</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
