import React from 'react';
import { Check, X, AlertCircle, Info } from 'lucide-react';

const CheckItem = ({ step, result, onChange }) => {
    const { has_deviation, observation, deviation_cause, countermeasure } = result || {};

    return (
        <div className={`check-item border-l-4 transition-all duration-300 ${has_deviation === false ? 'border-success' :
                has_deviation === true ? 'border-error shadow-md shadow-error/5' :
                    'border-slate-200'
            }`}>
            <div className="flex gap-4 mb-5">
                <div className="w-9 h-9 rounded-xl bg-navy text-white flex items-center justify-center shrink-0 font-bold text-sm shadow-sm ring-4 ring-navy/5">
                    {step.step_number}
                </div>
                <div className="flex-1">
                    <p className="font-bold text-navy leading-tight mb-2.5">{step.description}</p>
                    <div className="flex flex-wrap gap-2 text-[10px] text-slate-400 uppercase font-black tracking-widest">
                        <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                            <AlertCircle size={10} className="text-navy/40" /> {step.risks}
                        </span>
                    </div>
                </div>
            </div>

            <div className="check-options">
                <button
                    type="button"
                    onClick={() => onChange({ ...result, has_deviation: false })}
                    className={`option-btn flex items-center justify-center gap-2 py-4 ${has_deviation === false ? 'selected-success' : 'hover:border-slate-200 hover:bg-slate-50'}`}
                >
                    {has_deviation === false && <Check size={18} className="animate-fade-in" />}
                    SIN DESVÍO
                </button>
                <button
                    type="button"
                    onClick={() => onChange({ ...result, has_deviation: true })}
                    className={`option-btn flex items-center justify-center gap-2 py-4 ${has_deviation === true ? 'selected-error' : 'hover:border-slate-200 hover:bg-slate-50'}`}
                >
                    {has_deviation === true && <X size={18} className="animate-fade-in" />}
                    CON DESVÍO
                </button>
            </div>

            {has_deviation === true && (
                <div className="mt-5 flex flex-col gap-5 animate-fade-in bg-slate-50/50 p-5 rounded-2xl border border-error/10">
                    <div className="input-group mb-0">
                        <label className="input-label text-[10px] text-error/70">Observación / Hallazgo</label>
                        <textarea
                            className="text-input text-sm p-4 min-h-[100px] bg-white border-slate-200 focus:border-error focus:ring-error/5"
                            placeholder="Describe el desvío encontrado..."
                            value={observation || ''}
                            onChange={(e) => onChange({ ...result, observation: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-5">
                        <div className="input-group mb-0">
                            <label className="input-label text-[10px] text-error/70">Causa del Desvío</label>
                            <select
                                className="text-input text-sm p-4 bg-white cursor-pointer border-slate-200 focus:border-error focus:ring-error/5"
                                value={deviation_cause || ''}
                                onChange={(e) => onChange({ ...result, deviation_cause: parseInt(e.target.value) })}
                            >
                                <option value="" disabled hidden>Selecciona una causa</option>
                                <option value="1">No cumple estándar</option>
                                <option value="2">Estándar incompleto</option>
                                <option value="3">Ambas</option>
                            </select>
                        </div>

                        <div className="input-group mb-0">
                            <label className="input-label text-[10px] text-error/70">Acción / Contramedida</label>
                            <input
                                type="text"
                                className="text-input text-sm p-4 bg-white border-slate-200 focus:border-error focus:ring-error/5"
                                placeholder="¿Qué se hizo para corregir?"
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
