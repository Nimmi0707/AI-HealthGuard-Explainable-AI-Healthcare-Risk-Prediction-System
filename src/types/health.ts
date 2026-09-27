export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface PatientVitals {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  systolicBp: number; // mmHg (normal < 120)
  diastolicBp: number; // mmHg (normal < 80)
  restingHeartRate: number; // bpm (60-100)
  bmi: number; // kg/m2 (18.5 - 24.9)
  glucose: number; // mg/dL fasting (70-99)
  hba1c: number; // % (< 5.7)
  cholesterolTotal: number; // mg/dL (< 200)
  cholesterolHdl: number; // mg/dL (> 50)
  cholesterolLdl: number; // mg/dL (< 100)
  hsCrp: number; // mg/L high-sensitivity C-reactive protein (< 1.0)
  smokingStatus: 'Never' | 'Former' | 'Current';
  physicalActivityLevel: 'Sedentary' | 'Moderate' | 'Active';
  familyHeartDisease: boolean;
  historyDiabetes: boolean;
  assessmentDate: string;
}

export interface ShapContribution {
  feature: string;
  label: string;
  value: string | number;
  standardNormal: string;
  shapValue: number; // positive increases risk, negative decreases risk
  direction: 'increases' | 'decreases';
  clinicalContext: string;
}

export interface PredictionResult {
  patientId: string;
  patientName: string;
  riskScore: number; // 0 - 100%
  riskLevel: RiskLevel;
  confidence: number; // e.g. 94.6%
  primaryModel: string;
  secondaryModel: string;
  ensembleAgreement: number; // e.g. 98.2%
  baseValueShap: number; // E[f(x)] e.g. 26.4%
  shapContributions: ShapContribution[];
  topDrivers: string[];
  preventiveScore: number; // 0 - 100
  timestamp: string;
  auditHash: string;
}

export interface ModelMetric {
  name: string;
  type: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  rocAuc: number;
  inferenceLatencyMs: number;
  highlight?: boolean;
}

export interface RecommendationItem {
  id: string;
  category: 'Cardiovascular' | 'Metabolic' | 'Lifestyle' | 'Diagnostic';
  title: string;
  priority: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';
  reason: string;
  suggestedAction: string;
  aiExplanation: string;
  projectedRiskDrop: number; // e.g. 8.4%
}

export interface BenchmarkCase {
  id: string;
  title: string;
  subhead: string;
  description: string;
  tag: string;
  expectedRisk: RiskLevel;
  vitals: PatientVitals;
}
