import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Save, CheckCircle2, ChevronRight, User, Settings, Info as InfoIcon } from 'lucide-react';
import { SEED_DATA } from '../data/seedData';
import CheckItem from '../components/CheckItem';
import SignaturePad from '../components/SignaturePad';

const VCTForm = () => {
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem('vct_user') || '{}');
    const [step, setStep] = useState(1);

    // Form State
    const [formData, setFormData] = useState({
        process: userData.process || '',
        procedure_id: '',
        supervisor_name: '',
        worker_name: '',
        execution_date: new Date().toISOString().split('T')[0],
        is_aware: null,
        skill_level: null,
        improvement_text: '',
        deviations_compromise_safety: null,
        is_approved: null,
        needs_reschedule: null,
        supervisor_signature: null,
        worker_signature: null,
        results: {} // step_id -> { has_deviation, observation, cause, countermeasure }
    });

    const currentSteps = SEED_DATA.steps[formData.procedure_id] || [];

    const handleNext = () => setStep(s => Math.min(s + 1, 4));
    const handleBack = () => setStep(s => Math.max(s - 1, 1));

    const updateFormData = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleStepResultChange = (stepId, result) => {
        setFormData(prev => ({
            ...prev,
            results: { ...prev.results, [stepId]: result }
        }));
    };

    const isStepValid = () => {
        if (step === 1) return formData.procedure_id && formData.supervisor_name && formData.worker_name;
        if (step === 2) return formData.is_aware !== null && formData.skill_level !== null;
        if (step === 3) return currentSteps.every(s => formData.results[s.id]?.has_deviation !== undefined);
        return formData.is_approved !== null && formData.supervisor_signature;
    };

    const submitVCT = () => {
        // In a real app, send to Supabase here
        console.log('Submitting VCT:', formData);
        alert('VCT Guardado Exitosamente (Modo Demo)');
        navigate('/');
    };

    return (
        <div className="flex flex-col gap-6 animate-fade-in pb-24">
            {/* Progress Header */}
            <div className="sticky top-[72px] z-40 bg-white/95 backdrop-blur-md -mx-5 px-5 py-3 border-b border-slate-200 mb-2">
                <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500" style={{ fontFamily: 'Trebuchet MS' }}>Paso {step} de 4</span>
                    <span className="text-sm font-bold text-argos-navy uppercase" style={{ fontFamily: 'Trebuchet MS' }}>
                        {step === 1 && "Información General"}
                        {step === 2 && "Evaluación Capacidad"}
                        {step === 3 && "Ejecución en Campo"}
                        {step === 4 && "Cierre y Firmas"}
                    </span>
                </div>
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${(step / 4) * 100}%` }}></div>
                </div>
            </div>

            {step === 1 && (
                <div className="flex flex-col gap-6 animate-fade-in px-1">
                    <div className="input-group">
                        <label className="input-label">Proceso Operativo</label>
                        <input type="text" readOnly className="text-input bg-slate-50 text-slate-500 cursor-not-allowed border-slate-200" value={formData.process} />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Procedimiento a Evaluar</label>
                        <select
                            className="text-input appearance-none cursor-pointer"
                            value={formData.procedure_id}
                            onChange={(e) => updateFormData('procedure_id', e.target.value)}
                        >
                            <option value="" disabled hidden>Selecciona procedimiento...</option>
                            {SEED_DATA.procedures.filter(p => p.process_id === '1').map(p => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Evaluador Lider</label>
                        <input
                            type="text" className="text-input"
                            placeholder="Nombre del evaluador"
                            value={formData.supervisor_name}
                            onChange={(e) => updateFormData('supervisor_name', e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Colaborador Evaluado</label>
                        <input
                            type="text" className="text-input"
                            placeholder="Nombre del colaborador"
                            value={formData.worker_name}
                            onChange={(e) => updateFormData('worker_name', e.target.value)}
                        />
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="flex flex-col gap-6 animate-fade-in px-1">
                    <div className="vct-card relative overflow-hidden border-t border-r border-slate-200">
                        <div className="absolute top-0 right-0 w-32 h-64 bg-argos-lime/10 skew-x-12 pointer-events-none"></div>
                        <p className="font-bold mb-5 text-argos-navy text-lg leading-tight relative z-10 font-sans">1. ¿El colaborador demuestra entendimiento de los riesgos asociados a la tarea?</p>
                        <div className="check-options relative z-10">
                            <button
                                className={`option-btn ${formData.is_aware === true ? 'selected-success' : ''}`}
                                onClick={() => updateFormData('is_aware', true)}
                            >
                                SÍ
                            </button>
                            <button
                                className={`option-btn ${formData.is_aware === false ? 'selected-error' : ''}`}
                                onClick={() => updateFormData('is_aware', false)}
                            >
                                NO
                            </button>
                        </div>
                    </div>

                    <div className="vct-card relative overflow-hidden border-t border-r border-slate-200">
                        <div className="absolute top-0 right-0 w-32 h-64 bg-argos-navy/5 skew-x-12 pointer-events-none"></div>
                        <p className="font-bold mb-1 text-argos-navy text-lg relative z-10 font-sans">2. Nivel de Competencia Operativa</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-5 font-bold relative z-10" style={{ fontFamily: 'Trebuchet MS' }}>Selección única obligatoria</p>
                        <div className="flex flex-col gap-2 relative z-10">
                            {[
                                { val: 1, label: 'Nivel 1 - Entrenamiento básico incompleto' },
                                { val: 2, label: 'Nivel 2 - Competencia estándar' },
                                { val: 3, label: 'Nivel 3 - Experto / Formador' }
                            ].map(opt => (
                                <button
                                    key={opt.val}
                                    onClick={() => updateFormData('skill_level', opt.val)}
                                    className={`p-4 rounded-sm border transition-all duration-200 flex justify-between items-center text-sm font-bold ${formData.skill_level === opt.val
                                        ? 'border-argos-navy bg-argos-navy text-white argos-shadow'
                                        : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                                        }`}
                                >
                                    {opt.label}
                                    {formData.skill_level === opt.val && <CheckCircle2 size={18} className="text-argos-lime" />}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="flex flex-col gap-4 animate-fade-in px-1">
                    <div className="bg-slate-50 border border-slate-200 border-l-4 border-l-argos-lime p-4 rounded-sm mb-2 flex gap-4 items-start shadow-sm">
                        <div className="bg-white border border-slate-200 p-2 rounded-sm shrink-0">
                            <InfoIcon className="text-argos-navy" size={24} />
                        </div>
                        <div>
                            <p className="text-[11px] font-bold text-argos-navy uppercase tracking-widest mb-1.5" style={{ fontFamily: 'Trebuchet MS' }}>Instrucción Operativa</p>
                            <p className="text-sm text-slate-700 leading-relaxed font-sans">Evaluar la adherencia estricta al estándar paso por paso. Registrar desvíos si aplica.</p>
                        </div>
                    </div>

                    {currentSteps.map(s => (
                        <CheckItem
                            key={s.id}
                            step={s}
                            result={formData.results[s.id] || {}}
                            onChange={(res) => handleStepResultChange(s.id, res)}
                        />
                    ))}
                </div>
            )}

            {step === 4 && (
                <div className="flex flex-col gap-6 animate-fade-in px-1">
                    <div className="bg-white border-2 border-slate-200 p-5 rounded-sm">
                        <p className="font-serif text-2xl text-center text-argos-navy mb-5 uppercase tracking-wide">Dictamen Final VCT</p>
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => updateFormData('is_approved', true)}
                                className={`btn ${formData.is_approved === true ? 'btn-primary' : 'btn-outline'} w-full border border-slate-200`}
                            >CERTIFICADO COMPETENTE</button>
                            <button
                                onClick={() => updateFormData('is_approved', false)}
                                className={`btn ${formData.is_approved === false ? 'selected-error' : 'btn-outline'} w-full border border-slate-200`}
                            >REQUIERE REENTRENAMIENTO</button>
                        </div>
                    </div>

                    <SignaturePad
                        label="Firma Lider Evaluador"
                        signature={formData.supervisor_signature}
                        onSave={(val) => updateFormData('supervisor_signature', val)}
                    />

                    <SignaturePad
                        label="Firma Colaborador (Opcional)"
                        signature={formData.worker_signature}
                        onSave={(val) => updateFormData('worker_signature', val)}
                    />
                </div>
            )}

            {/* Navigation Buttons */}
            <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto p-4 bg-white/95 backdrop-blur-md border-t border-slate-200 flex gap-4 z-50 pb-[max(env(safe-area-inset-bottom),16px)]">
                {step > 1 && (
                    <button onClick={handleBack} className="btn btn-outline flex-1 px-0 border-slate-300">
                        <ArrowLeft size={18} /> ANTERIOR
                    </button>
                )}

                {step < 4 ? (
                    <button
                        onClick={handleNext}
                        disabled={!isStepValid()}
                        className={`btn btn-navy flex-[2] ${!isStepValid() ? 'opacity-50 cursor-not-allowed bg-slate-300 shadow-none' : ''}`}
                    >
                        CONTINUAR <ArrowRight size={18} />
                    </button>
                ) : (
                    <button
                        onClick={submitVCT}
                        disabled={!isStepValid()}
                        className={`btn btn-primary flex-[2] ${!isStepValid() ? 'opacity-50 cursor-not-allowed bg-slate-300 shadow-none text-slate-500' : ''}`}
                    >
                        <Save size={18} /> GUARDAR VCT
                    </button>
                )}
            </div>
        </div>
    );
};

export default VCTForm;
