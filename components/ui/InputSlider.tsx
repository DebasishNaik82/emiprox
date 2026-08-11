import React from 'react';
import { Info } from 'lucide-react';

interface InputSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  unit?: string;
  prefix?: string;
  tooltip?: string;
}

export function InputSlider({ label, value, onChange, min, max, step, unit, prefix, tooltip }: InputSliderProps) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2 relative group">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</label>
          {tooltip && (
            <div className="relative flex items-center justify-center">
              <Info size={14} className="text-zinc-400 cursor-help" />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 bg-zinc-800 dark:bg-zinc-700 text-xs text-white rounded shadow-lg z-10 text-center">
                {tooltip}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-800 dark:border-t-zinc-700"></div>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center bg-zinc-100 dark:bg-zinc-900 rounded-lg px-3 py-1.5 border border-zinc-200 dark:border-zinc-700 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500">
          {prefix && <span className="text-zinc-500 mr-1">{prefix}</span>}
          <input
            type="number"
            value={value}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              if (!isNaN(val)) onChange(val);
            }}
            className="bg-transparent w-24 text-right font-semibold text-zinc-900 dark:text-zinc-100 focus:outline-none"
          />
          {unit && <span className="text-zinc-500 ml-1">{unit}</span>}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer dark:bg-zinc-800 accent-emerald-600"
      />
      <div className="flex justify-between text-xs text-zinc-400 mt-1">
        <span>{prefix}{min.toLocaleString()}{unit ? ` ${unit}` : ''}</span>
        <span>{prefix}{max.toLocaleString()}{unit ? ` ${unit}` : ''}</span>
      </div>
    </div>
  );
}
