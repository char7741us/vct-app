import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Trash2, CheckCircle, PenTool } from 'lucide-react';

const SignaturePad = ({ label, onSave, signature }) => {
    const sigPad = useRef({});

    const clear = () => {
        sigPad.current.clear();
        onSave(null);
    };

    const save = () => {
        if (!sigPad.current.isEmpty()) {
            onSave(sigPad.current.getTrimmedCanvas().toDataURL('image/png'));
        }
    };

    return (
        <div className="input-group">
            <label className="input-label">{label}</label>
            <div className="relative border-2 border-slate-100 rounded-3xl overflow-hidden bg-slate-50/50 group transition-all duration-300 focus-within:border-navy/20">
                {!signature ? (
                    <>
                        <SignatureCanvas
                            ref={sigPad}
                            penColor="#002B49"
                            canvasProps={{
                                style: { width: '100%', height: '180px' },
                                className: 'sigCanvas cursor-crosshair'
                            }}
                            onEnd={save}
                        />
                        <button
                            type="button"
                            onClick={clear}
                            className="absolute right-3 bottom-3 p-2.5 bg-white rounded-xl shadow-sm text-slate-400 hover:text-error hover:bg-error/5 transition-colors"
                        >
                            <Trash2 size={16} />
                        </button>
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03] flex flex-col items-center gap-3">
                            <PenTool size={48} />
                            <p className="text-2xl font-black uppercase tracking-[0.2em]">Firma Aquí</p>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-[180px] bg-emerald-50 relative animate-fade-in group/sig">
                        <img src={signature} alt="Firma" className="max-h-[140px] mix-blend-multiply transition-transform group-hover/sig:scale-105 duration-500" />
                        <button
                            type="button"
                            onClick={() => onSave(null)}
                            className="absolute right-3 bottom-3 p-2.5 bg-white rounded-xl shadow-sm text-error hover:bg-error/10 transition-colors"
                        >
                            <Trash2 size={16} />
                        </button>
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 text-emerald-700 font-black text-[10px] uppercase tracking-widest bg-emerald-100/50 px-2 py-1 rounded-lg backdrop-blur-sm">
                            <CheckCircle size={12} /> Firma Capturada
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SignaturePad;
