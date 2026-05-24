'use client';
import React from 'react';
 
 interface SliderControlProps {
    label: string;
    value: number;
    min: number;
    max: number;
    unit?: string;
    onChange: (value: number) => void;
    step?: number;
}

export const SliderControl: React.FC<SliderControlProps> = ({
    label,
    value,
    min,
    max,
    unit = '',
    onChange,
    step = 1,
}) => {
    return (
        <label className="block">
            <div className="mb-2 flex items-center justify-between text-xs text-gray-600 uppercase tracking-wider">
                <span>{label}</span>
                <span className="font-mono text-gray-800">
                    {Math.round(value)}
                    {unit}
                </span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full accent-silvoraa-gold"
            />
        </label>
    );
};
