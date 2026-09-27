# AI HealthGuard — Explainable AI Healthcare Risk Prediction System

AI HealthGuard is an explainable clinical decision support research platform for cardiovascular and metabolic risk stratification, pairing machine learning predictive modeling with SHAP additive feature attribution, counterfactual intervention modeling, and multi-metric validation.

## User Review & Critical Decisions

> [!IMPORTANT]
> The design has been updated to reflect rigorous clinical and medical research institution standards. All informal badges such as "M.Tech CSE Researcher" and "v0.4 Demo" have been permanently removed in favor of clean, peer-reviewed clinical research metadata and institution-grade presentation.

- **Confirmed Domain**: Cardiovascular and Metabolic Disease Risk (ASCVD 10-year risk index, coronary artery calcification probability, and Type 2 diabetes progression).
- **Confirmed XAI Suite**: SHAP (SHapley Additive exPlanations) waterfall attributions, feature importance rankings ($|\phi_i|$), and counterfactual "What-If" sensitivity simulations.
- **Confirmed Patient Cohorts**: 4 clinical benchmark cases (Acute Coronary Syndromic Risk, Metabolic Syndrome with Insulin Resistance, Hypertensive Pre-Diabetic, and Low-Risk Cardiorespiratory Cohort) alongside custom patient intake.
- **Interface Standard**: Clean clinical research aesthetic adhering to zero-pill discipline, high-density tabular precision, and calm medical colorways.

---

## 1. Overview & Core Concept

- **What It Does**: Evaluates multidimensional clinical markers (blood pressure, lipid profiles, glycemic control, inflammatory biomarkers, lifestyle metrics) to predict 10-year cardiovascular and metabolic adverse events while explaining every prediction down to individual biomarker SHAP contributions.
- **Target Audience / Persona**: Clinical researchers, cardiologists, health data scientists, and academic reviewers evaluating trustworthy, transparent AI diagnostics.
- **Key Value**: Bridges the gap between black-box gradient boosted models and clinical trust by answering not just *what* the risk is, but *why* the model arrived at that conclusion and *which* interventions yield the greatest risk reduction.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Research Landing & Hero**:
   - Executive presentation with high-contrast typography, subtle vector ECG waveforms, and key clinical capabilities.
   - Interactive preview of the predictive architecture with direct shortcuts to live assessment and model analytics.
2. **Clinical Dashboard**:
   - Primary metric cards: Cohort Assessments, High Risk Stratification ($\ge 20\%$), Moderate Risk ($10\% - 19\%$), and Low Risk ($< 10\%$) with tabular figures.
   - Bivariate risk distribution matrix, longitudinal biomarker trends, and recent clinical cohort queries.
3. **5-Step Diagnostic Risk Assessment**:
   - Step 1: Patient Demographics & Baseline Vitals (Age, Sex, Resting Heart Rate, BMI).
   - Step 2: Hemodynamics & Lipid Panel (Systolic/Diastolic BP, Total Cholesterol, HDL, LDL, Triglycerides).
   - Step 3: Glycemic & Inflammatory Biomarkers (Fasting Plasma Glucose, HbA1c, hs-CRP, eGFR).
   - Step 4: Behavioral & Family History (Smoking pack-years, Physical activity, Family CAD history).
   - Step 5: Live Neural Telemetry & Validation preview with real-time risk calculation.
4. **AI Prediction & Radial Risk Visualization**:
   - Circular risk dial with calibrated probability score ($P(\text{ASCVD Risk})$), confidence intervals ($95\%\text{ CI}$), and classification boundary.
   - Summary breakdown of top positive and negative risk contributors.
5. **Explainable AI (XAI) Deep-Dive**:
   - True SHAP waterfall plot showing base expected value $\mathbb{E}[f(X)] = 11.2\%$ and additive pushing forces (red/coral) vs. mitigating protective forces (teal/green).
   - Global feature importance ($|\phi|$ impact scores across 1,200 research cohort records).
   - **Counterfactual "What-If" Sensitivity Simulator**: Interactive sliders allowing clinicians to simulate medical interventions (e.g. lowering systolic BP from 158 to 125 mmHg, reducing LDL by 30 mg/dL) and watch the predicted risk score drop in real time.
6. **Clinical Cohort History**:
   - Filterable, searchable tabular record of patient evaluations with risk tiers, key biomarker flags, and full export capabilities.
7. **Model Governance & Performance Analytics**:
   - Benchmarking of XGBoost vs. LightGBM vs. Random Forest vs. Multi-Layer Perceptron across ROC-AUC (0.914), PR-AUC (0.887), Sensitivity, and Specificity.
   - Interactive $2\times 2$ Confusion Matrix and calibration curves.
8. **Clinical Research Report & Export**:
   - Print-ready and downloadable PDF clinical research summary with patient metrics, radar profiles, SHAP attribution summaries, and peer-reviewed reference recommendations.

### Visual Identity & Theme

- **Palette**:
  - Neutral Canvas: Crisp clinical off-white (`#F8FAFC`) and structural slate (`#FFFFFF`, `#F1F5F9`).
  - Text & Structural: Deep navy (`#0F172A`) and cool slate (`#334155`).
  - Medical Accents: Clinical teal (`#0D9488`), cyan highlights (`#0284C7`), and soft sage (`#10B981`).
  - Risk & Heartbeat: Controlled carmine coral (`#E11D48`) reserved exclusively for ECG waveforms and acute cardiovascular risk alerts.
- **Typography**:
  - Display: `Plus Jakarta Sans` for clean, modern clinical authority.
  - Body: `Plus Jakarta Sans` / `Inter` with 1.6 line-height.
  - Telemetry: Monospace tabular numerals (`font-mono tabular-nums`) for exact biomarker measurements and statistical metrics.
- **Visual Polish**:
  - Clean vector ECG waveforms rendered via scalable SVG paths.
  - Zero-pill metadata discipline: quiet unboxed text tags separated by `·` or `/`.
  - Professional medical research branding: "AI HealthGuard · Clinical Decision Support Research Prototype".

---

## 3. Key Product Decisions & Trade-Offs

- **Deterministic SHAP Calculation**:
  - *Chosen Approach*: Real-time client-side calculation of exact additive Shapley values based on calibrated logistic regression / tree ensemble approximation weights.
  - *Why*: Delivers instantaneous zero-latency interaction in the Counterfactual "What-If" simulator without server bottlenecks or network jitter during presentations.
- **Clinical Guideline Grounding**:
  - *Chosen Approach*: Risk formulas and factor attributions ground directly in ACC/AHA Atherosclerotic Cardiovascular Disease (ASCVD) Risk Estimator Plus and ADA Standards of Care.
  - *Why*: Ensures the simulated predictions and risk categories mirror authentic clinical cardiology guidelines rather than arbitrary toy data.
- **Benchmark Cohort Presets**:
  - *Chosen Approach*: 1-click loading of 4 standardized clinical archetypes.
  - *Why*: Enables rapid demonstration of distinct model behaviors (e.g. comparing how smoking and hypertension dramatically skew SHAP bars compared to dyslipidemia alone).

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        AI HealthGuard Web App                          │
├────────────────────────────────────────────────────────────────────────┤
│  Navigation & Top Bar (Search, Active Case, Export, System Status)     │
├──────────────┬─────────────────────────────────────────────────────────┤
│ Sidebar      │ Active Viewport Router                                  │
│ ├─ Overview  │ ├─ Landing / Executive Overview                         │
│ ├─ Dashboard │ ├─ Clinical Research Dashboard                          │
│ ├─ Assess    │ ├─ 5-Step Diagnostic Assessment (Live Telemetry Preview)│
│ ├─ Predict   │ ├─ Radial Prediction & Confidence Gauge                 │
│ ├─ XAI Deep  │ ├─ SHAP Waterfall & Counterfactual "What-If" Simulator   │
│ ├─ Cohorts   │ ├─ Patient Cohort Record Table (Search & Filter)        │
│ ├─ Analytics │ ├─ Model Benchmarks, ROC-AUC, Confusion Matrix          │
│ ├─ Guidelines│ ├─ Clinical Guideline Interventions & Evidence           │
│ ├─ Report    │ ├─ Print-Ready Clinical Summary & PDF Generator         │
│ └─ Settings  │ └─ Model Architecture, Feature Definitions, Governance  │
└──────────────┴─────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   Clinical Data & Inference Layer                      │
├────────────────────────────────────────────────────────────────────────┤
│ • Diagnostic State Store (Patient Vitals, Biomarkers, History)         │
│ • SHAP Attribution Engine (Base Value φ₀, Marginal Contributions φᵢ)   │
│ • Counterfactual Delta Calculator (Δ Risk = f(x') - f(x))             │
│ • 4 Curated Benchmark Cohorts + LocalStorage Persistence               │
└────────────────────────────────────────────────────────────────────────┘
```

### Data Model & Entity Specifications

```typescript
interface PatientBiomarkers {
  id: string;
  patientId: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  systolicBp: number;       // mmHg
  diastolicBp: number;      // mmHg
  totalCholesterol: number; // mg/dL
  hdlCholesterol: number;   // mg/dL
  ldlCholesterol: number;   // mg/dL
  triglycerides: number;    // mg/dL
  fastingGlucose: number;   // mg/dL
  hbA1c: number;            // %
  hsCrp: number;            // mg/L (high-sensitivity C-reactive protein)
  eGfr: number;             // mL/min/1.73m²
  smokingStatus: 'never' | 'former' | 'current';
  packYears: number;
  physicalActivity: 'sedentary' | 'moderate' | 'active';
  familyHistoryCad: boolean;
  hypertensionTreated: boolean;
}

interface PredictionOutput {
  riskScore: number;         // 0.0 - 1.0 (e.g. 0.28 = 28% 10-year risk)
  riskCategory: 'Low' | 'Moderate' | 'High' | 'Critical';
  confidenceInterval: [number, number];
  modelName: string;
  timestamp: string;
  shapBaseValue: number;     // e.g. 0.112
  shapValues: Array<{
    feature: string;
    label: string;
    patientValue: string;
    impact: number;          // Positive pulls risk up, negative pushes down
    clinicalNormal: string;
  }>;
}
```
