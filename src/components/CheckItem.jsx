import React from 'react';
import { Check, X, AlertCircle } from 'lucide-react';

const CheckItem = ({ step, result, onChange }) => {
    const { has_deviation, observation, deviation_cause, countermeasure } = result || {};

    return (
        <div className={`check-item transition-all duration-300 ${has_deviation === false ? 'border-l-4 border-l-success' :
            has_deviation === true ? 'border-l-4 border-l-error bg-error/5' :
                'border-l-4 border-l-slate-200'
            }`}>
            <div className="flex gap-4 mb-4">
                <div className="w-8 h-8 rounded-sm bg-argos-navy text-white flex items-center justify-center shrink-0 font-bold text-sm">
                    {step.step_number}
                </div>
                <div className="flex-1">
                    <p className="font-bold text-argos-navy leading-tight mb-2 font-sans">{step.description}</p>
                    <div className="flex flex-wrap gap-2 text-[10px] text-argos-navy uppercase font-bold tracking-widest" style={{ fontFamily: 'Trebuchet MS' }}>
                        <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-sm border border-slate-200">
                            <AlertCircle size={12} className="text-argos-lime" /> Riesgo: {step.risks}
                        </span>
                    </div>
                </div>
            </div>

            <div className="check-options">
                <button
                    type="button"
                    onClick={() => onChange({ ...result, has_deviation: false })}
                    className={`option-btn flex items-center justify-center gap-2 py-3 ${has_deviation === false ? 'selected-success' : 'hover:border-argos-lime'}`}
                >
                    {has_deviation === false && <Check size={18} className="animate-fade-in" />}
                    CUMPLE ESTÁNDAR
                </button>
                <button
                    type="button"
                    onClick={() => onChange({ ...result, has_deviation: true })}
                    className={`option-btn flex items-center justify-center gap-2 py-3 ${has_deviation === true ? 'selected-error' : 'hover:border-argos-lime'}`}
                >
                    {has_deviation === true && <X size={18} className="animate-fade-in" />}
                    REGISTRAR DESVÍO
                </button>
            </div>

            {has_deviation === true && (
                <div className="mt-4 flex flex-col gap-4 animate-fade-in border-t border-slate-200 pt-4">
                    <div className="input-group mb-0">
                        <label className="input-label text-[10px] text-error">1. Observación / Hallazgo</label>
                        <textarea
                            className="text-input text-sm p-3 min-h-[80px] bg-white border-slate-300 focus:border-error focus:ring-error"
                            placeholder="Describe detalladamente el desvío encontrado..."
                            value={observation || ''}
                            onChange={(e) => onChange({ ...result, observation: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <div className="input-group mb-0">
                            <label className="input-label text-[10px] text-error">2. Causa Raíz Identificada</label>
                            <select
                                className="text-input text-sm p-3 bg-white cursor-pointer border-slate-300 focus:border-error focus:ring-error"
                                value={deviation_cause || ''}
                                onChange={(e) => onChange({ ...result, deviation_cause: parseInt(e.target.value) })}
                            >
                                <option value="" disabled hidden>Selecciona la tipología de causa...</option>
                                <option value="1">1. Operativo no sigue el estándar definido</option>
                                <option value="2">2. El estándar está desactualizado/incompleto</option>
                                <option value="3">3. Factores combinados (1 y 2)</option>
                            </select>
                        </div>

                        <div className="input-group mb-0">
                            <label className="input-label text-[10px] text-error">3. Acción Correctora Inmediata</label>
                            <input
                                type="text"
                                className="text-input text-sm p-3 bg-white border-slate-300 focus:border-error focus:ring-error"
                                placeholder="Indica la acción tomada in situ..."
                                value={countermeasure || ''}
                                onChange={(e) => onChange({ ...result, countermeasure: e.target.value })}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckItem;
