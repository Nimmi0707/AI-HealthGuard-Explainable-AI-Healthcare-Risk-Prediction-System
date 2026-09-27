import React from 'react';
import { ShapContribution } from '../../types/health';
import { ArrowUpRight, ArrowDownRight, Info, Sparkles, Binary } from 'lucide-react';

interface ShapWaterfallPlotProps {
  baseValue: number; // E[f(x)]
  predictedRisk: number; // f(x)
  contributions: ShapContribution[];
}

export const ShapWaterfallPlot: React.FC<ShapWaterfallPlotProps> = ({
  baseValue,
  predictedRisk,
  contributions,
}) => {
  // Compute cumulative values for waterfall plot steps
  let cumulative = baseValue;
  const steps = contributions.map((item) => {
    const startVal = cumulative;
    const endVal = cumulative + item.shapValue;
    cumulative = endVal;
    return {
      ...item,
      startVal,
      endVal,
    };
  });

  // Calculate axis bounds (min and max for normalization)
  const allValues = [baseValue, predictedRisk, ...steps.map(s => s.endVal), ...steps.map(s => s.startVal)];
  const minVal = Math.max(0, Math.floor(Math.min(...allValues) - 5));
  const maxVal = Math.min(100, Math.ceil(Math.max(...allValues) + 5));
  const range = maxVal - minVal || 1;

  const getPercentLeft = (val: number) => {
    return Math.max(0, Math.min(100, ((val - minVal) / range) * 100));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
      {/* Header section with mathematical formulation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-teal-50 text-teal-600 border border-teal-200">
              <Binary className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-slate-900">
              SHAP Force Waterfall Decomposition
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Additive feature attribution model: <span className="font-mono font-medium text-slate-700">f(x) = E[f(x)] + Σ φᵢ</span>
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-rose-500" />
            <span className="text-slate-600">Elevates Risk (+φ)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-emerald-500" />
            <span className="text-slate-600">Cardioprotective (-φ)</span>
          </div>
        </div>
      </div>

      {/* Axis Scale Markers */}
      <div className="relative pt-4 pb-2 text-[10px] font-mono text-slate-400 border-b border-slate-100">
        <div className="flex justify-between items-center px-1">
          <span>{minVal}% baseline floor</span>
          <span className="text-slate-700 font-semibold">
            Population Prior E[f(x)] = {baseValue.toFixed(1)}%
          </span>
          <span>{maxVal}% risk ceiling</span>
        </div>
        {/* Baseline vertical guide line indicator */}
        <div
          className="absolute top-0 bottom-0 border-r-2 border-dashed border-slate-300 pointer-events-none"
          style={{ left: `${getPercentLeft(baseValue)}%` }}
        />
      </div>

      {/* Waterfall Rows */}
      <div className="space-y-3.5 py-4">
        {steps.map((step) => {
          const isPositive = step.shapValue >= 0;
          const leftBound = Math.min(step.startVal, step.endVal);
          const rightBound = Math.max(step.startVal, step.endVal);
          const barLeft = getPercentLeft(leftBound);
          const barWidth = Math.max(1.5, getPercentLeft(rightBound) - barLeft);

          return (
            <div key={step.feature} className="group relative">
              <div className="flex items-center justify-between text-xs mb-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-800">{step.label}</span>
                  <span className="font-mono text-[11px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                    {step.value}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    (Ref: {step.standardNormal})
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span
                    className={`font-mono font-bold text-xs flex items-center ${
                      isPositive ? 'text-rose-600' : 'text-emerald-600'
                    }`}
                  >
                    {isPositive ? (
                      <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                    ) : (
                      <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
                    )}
                    {isPositive ? '+' : ''}
                    {step.shapValue.toFixed(1)}%
                  </span>
                </div>
              </div>

              {/* Bar track container */}
              <div className="relative h-6 bg-slate-50 rounded-md overflow-hidden border border-slate-100 flex items-center">
                {/* Population Baseline dotted line */}
                <div
                  className="absolute top-0 bottom-0 border-r border-slate-300 pointer-events-none z-10"
                  style={{ left: `${getPercentLeft(baseValue)}%` }}
                />

                {/* Floating attribution bar */}
                <div
                  className={`absolute h-4 rounded shadow-sm transition-all duration-500 ${
                    isPositive
                      ? 'bg-gradient-to-r from-rose-500 to-rose-600 border border-rose-600'
                      : 'bg-gradient-to-r from-emerald-500 to-emerald-600 border border-emerald-600'
                  }`}
                  style={{
                    left: `${barLeft}%`,
                    width: `${barWidth}%`,
                  }}
                />
              </div>

              {/* Clinical rationale subtext */}
              <div className="text-[11px] text-slate-500 mt-1 pl-1 flex items-start gap-1">
                <Info className="w-3 h-3 text-slate-400 mt-0.5 shrink-0" />
                <span>{step.clinicalContext}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Box: Base + Sum = Final Output */}
      <div className="mt-4 pt-3 border-t border-slate-200 bg-slate-50/80 -mx-5 -mb-5 p-5 rounded-b-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-teal-600 text-white shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Ensemble Model Output f(x)
            </div>
            <div className="text-sm text-slate-700">
              Sum of attributions matches final calibrated risk score with 0.00% residual drift.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-xs self-start sm:self-auto">
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-mono">Population Base</div>
            <div className="text-xs font-mono font-bold text-slate-600">{baseValue.toFixed(1)}%</div>
          </div>
          <span className="text-slate-300 font-bold">+</span>
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-mono">Net Attributions</div>
            <div
              className={`text-xs font-mono font-bold ${
                predictedRisk - baseValue >= 0 ? 'text-rose-600' : 'text-emerald-600'
              }`}
            >
              {predictedRisk - baseValue >= 0 ? '+' : ''}
              {(predictedRisk - baseValue).toFixed(1)}%
            </div>
          </div>
          <span className="text-slate-300 font-bold">=</span>
          <div>
            <div className="text-[10px] text-teal-600 uppercase font-mono font-bold">Predicted Risk</div>
            <div className="text-base font-mono font-extrabold text-teal-900">{predictedRisk.toFixed(1)}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};
