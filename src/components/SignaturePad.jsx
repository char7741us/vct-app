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
            <label className="input-label mb-2 block">{label}</label>
            <div className="relative border border-slate-300 rounded-sm overflow-hidden bg-white transition-all duration-300 focus-within:border-argos-lime">
                {!signature ? (
                    <>
                        <SignatureCanvas
                            ref={sigPad}
                            penColor="#071D49"
                            canvasProps={{
                                style: { width: '100%', height: '180px' },
                                className: 'sigCanvas cursor-crosshair'
                            }}
                            onEnd={save}
                        />
                        <button
                            type="button"
                            onClick={clear}
                            className="absolute right-2 bottom-2 p-2 bg-slate-100 rounded-sm text-slate-500 hover:text-error hover:bg-error/10 transition-colors"
                        >
                            <Trash2 size={18} />
                        </button>
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.05] flex flex-col items-center gap-2">
                            <PenTool size={32} />
                            <p className="text-xl font-bold uppercase tracking-widest font-sans">Área de Firma</p>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-[180px] bg-slate-50 relative animate-fade-in group/sig">
                        <img src={signature} alt="Firma" className="max-h-[140px] mix-blend-multiply transition-transform group-hover/sig:scale-105 duration-500" />
                        <button
                            type="button"
                            onClick={() => onSave(null)}
                            className="absolute right-2 bottom-2 p-2 bg-white rounded-sm shadow-sm border border-slate-200 text-error hover:bg-error/10 transition-colors"
                        >
                            <Trash2 size={18} />
                        </button>
                        <div className="absolute top-2 left-2 flex items-center gap-1.5 text-success font-bold text-[10px] uppercase tracking-widest bg-success/10 px-2 py-1 border border-success/20 rounded-sm" style={{ fontFamily: 'Trebuchet MS' }}>
                            <CheckCircle size={14} /> CERTIFICADA
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SignaturePad;
