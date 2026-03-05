import React, { useState, useEffect } from 'react';
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

    const currentProcedure = SEED_DATA.procedures.find(p => p.id === formData.procedure_id);
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
            <div className="sticky top-[72px] z-40 bg-white/90 backdrop-blur-md -mx-5 px-5 py-3 border-b border-slate-100 mb-2 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-navy/40">Paso {step} de 4</span>
                    <span className="text-sm font-bold text-navy">
                        {step === 1 && "Información General"}
                        {step === 2 && "Evaluación de Capacidad"}
                        {step === 3 && "Verificación en Campo"}
                        {step === 4 && "Cierre y Firmas"}
                    </span>
                </div>
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${(step / 4) * 100}%` }}></div>
                </div>
            </div>

            {step === 1 && (
                <div className="flex flex-col gap-6 animate-fade-in">
                    <div className="input-group">
                        <label className="input-label">Proceso</label>
                        <input type="text" readOnly className="text-input bg-slate-100 text-slate-500 cursor-not-allowed" value={formData.process} />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Procedimiento a Evaluar</label>
                        <select
                            className="text-input bg-white appearance-none cursor-pointer"
                            value={formData.procedure_id}
                            onChange={(e) => updateFormData('procedure_id', e.target.value)}
                        >
                            <option value="" disabled hidden>Selecciona procedimiento</option>
                            {SEED_DATA.procedures.filter(p => p.process_id === '1').map(p => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Supervisor (Evaluador)</label>
                        <input
                            type="text" className="text-input"
                            placeholder="Nombre del supervisor"
                            value={formData.supervisor_name}
                            onChange={(e) => updateFormData('supervisor_name', e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Ejecutante (Evaluado)</label>
                        <input
                            type="text" className="text-input"
                            placeholder="Nombre del operario"
                            value={formData.worker_name}
                            onChange={(e) => updateFormData('worker_name', e.target.value)}
                        />
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="flex flex-col gap-6 animate-fade-in">
                    <div className="vct-card border-navy/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-lime/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                        <p className="font-bold mb-5 text-navy text-lg leading-tight relative z-10">¿El ejecutante es consciente de la importancia y resultados de su tarea?</p>
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

                    <div className="vct-card border-navy/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-navy/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                        <p className="font-bold mb-1 text-navy text-lg relative z-10">Estatus de Capacidad</p>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-5 font-bold relative z-10">Nivel de habilidad actual</p>
                        <div className="flex flex-col gap-3 relative z-10">
                            {[
                                { val: 1, label: '1 - Conocimientos no conformes' },
                                { val: 2, label: '2 - Posee conocimiento y habilidad' },
                                { val: 3, label: '3 - Capaz de enseñar a otros' }
                            ].map(opt => (
                                <button
                                    key={opt.val}
                                    onClick={() => updateFormData('skill_level', opt.val)}
                                    className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 flex justify-between items-center ${formData.skill_level === opt.val
                                            ? 'border-navy bg-navy/5 text-navy font-bold shadow-sm'
                                            : 'border-slate-100 text-slate-500 hover:border-slate-200 hover:bg-slate-50'
                                        }`}
                                >
                                    {opt.label}
                                    {formData.skill_level === opt.val && <CheckCircle2 size={20} className="text-navy" />}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="flex flex-col gap-4 animate-fade-in">
                    <div className="bg-lime-50 border border-lime-100 p-5 rounded-[24px] mb-2 flex gap-4 items-start shadow-sm">
                        <div className="bg-lime/20 p-2 rounded-xl shrink-0">
                            <InfoIcon className="text-lime-800" size={24} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-lime-900 uppercase tracking-widest mb-1.5">Instrucciones de Campo</p>
                            <p className="text-[13px] text-lime-800 leading-relaxed font-medium">Observa al operario realizar cada paso. Si ves algo fuera del estándar, marca "CON DESVÍO".</p>
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
                <div className="flex flex-col gap-6 animate-fade-in">
                    <div className="vct-card bg-slate-50 border-dashed border-2 border-slate-200 shadow-none">
                        <p className="font-serif text-xl text-center text-navy mb-5">Resultado Final</p>
                        <div className="flex flex-col gap-4">
                            <button
                                onClick={() => updateFormData('is_approved', true)}
                                className={`btn ${formData.is_approved === true ? 'btn-primary' : 'btn-outline'} w-full bg-white shadow-sm`}
                            >APROBADO</button>
                            <button
                                onClick={() => updateFormData('is_approved', false)}
                                className={`btn ${formData.is_approved === false ? 'selected-error' : 'btn-outline'} w-full bg-white shadow-sm`}
                            >REPROBADO</button>
                        </div>
                    </div>

                    <SignaturePad
                        label="Firma del Supervisor"
                        signature={formData.supervisor_signature}
                        onSave={(val) => updateFormData('supervisor_signature', val)}
                    />

                    <SignaturePad
                        label="Firma del Ejecutante (Opcional)"
                        signature={formData.worker_signature}
                        onSave={(val) => updateFormData('worker_signature', val)}
                    />
                </div>
            )}

            {/* Navigation Buttons */}
            <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto p-4 bg-white/90 backdrop-blur-md border-t border-slate-100 flex gap-4 z-50 pb-[max(env(safe-area-inset-bottom),16px)]">
                {step > 1 && (
                    <button onClick={handleBack} className="btn btn-outline flex-1 px-0 shadow-sm">
                        <ArrowLeft size={20} /> Atrás
                    </button>
                )}

                {step < 4 ? (
                    <button
                        onClick={handleNext}
                        disabled={!isStepValid()}
                        className={`btn btn-primary flex-[2] shadow-md shadow-navy/20 ${!isStepValid() ? 'opacity-40 cursor-not-allowed transform-none' : ''}`}
                    >
                        Siguiente <ArrowRight size={20} />
                    </button>
                ) : (
                    <button
                        onClick={submitVCT}
                        disabled={!isStepValid()}
                        className={`btn btn-lime flex-[2] shadow-md shadow-lime/20 ${!isStepValid() ? 'opacity-40 cursor-not-allowed transform-none' : ''}`}
                    >
                        <Save size={20} /> FINALIZAR VCT
                    </button>
                )}
            </div>
        </div>
    );
};

export default VCTForm;
