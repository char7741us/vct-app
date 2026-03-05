import React from 'react';
import { ClipboardCheck, Calendar, User, ChevronRight } from 'lucide-react';

const History = () => {
    const vcts = [
        {
            id: 1,
            procedure: 'Inspecciones Molino',
            date: '2026-03-04',
            worker: 'Oskaryvan Sanchez',
            status: 'APROBADO',
            deviations: 0
        },
        {
            id: 2,
            procedure: 'Transferencias de Banda',
            date: '2026-03-03',
            worker: 'Juan Perez',
            status: 'APROBADO',
            deviations: 2
        }
    ];

    return (
        <div className="flex flex-col gap-6 animate-fade-in relative">
            <div className="px-2 relative z-10 bg-white/95 backdrop-blur-sm sticky top-[72px] py-4 -mx-2 mb-2 border-b border-slate-200">
                <h2 className="text-3xl font-serif text-argos-navy mb-1 px-4 uppercase leading-none">Historial VCT</h2>
                <p className="text-slate-500 font-sans text-sm px-4">Registro de todas las verificaciones operativas</p>
            </div>

            <div className="flex flex-col gap-4 relative z-10 px-1">
                {vcts.map((vct) => (
                    <div key={vct.id} className="vct-card flex flex-col gap-4 hover:border-argos-navy transition-all duration-300 cursor-pointer group bg-white shadow-sm border-l-4 border-argos-navy">
                        <div className="flex justify-between items-start">
                            <div className="flex-1 pr-4">
                                <h4 className="font-bold text-argos-navy text-base leading-tight mb-2 group-hover:text-argos-lime-hover transition-colors font-sans uppercase">{vct.procedure}</h4>
                                <div className="flex flex-col gap-1 text-[11px] text-slate-500 font-bold uppercase tracking-wider" style={{ fontFamily: 'Trebuchet MS' }}>
                                    <span className="flex items-center gap-2"><Calendar size={14} className="text-argos-navy opacity-50" /> {vct.date}</span>
                                    <span className="flex items-center gap-2"><User size={14} className="text-argos-navy opacity-50" /> {vct.worker}</span>
                                </div>
                            </div>
                            <div className={`px-2 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest ${vct.status === 'APROBADO'
                                ? 'bg-success text-white'
                                : 'bg-amber text-white'
                                }`} style={{ fontFamily: 'Trebuchet MS' }}>
                                {vct.status}
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                            <span className={`text-xs font-bold uppercase tracking-wide ${vct.deviations === 0 ? 'text-success' : 'text-amber'}`} style={{ fontFamily: 'Trebuchet MS' }}>
                                {vct.deviations === 0 ? '✓ Sin desvíos' : `! ${vct.deviations} desvíos`}
                            </span>
                            <button className="text-argos-navy flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest bg-slate-50 hover:bg-argos-lime hover:text-argos-navy px-3 py-2 rounded-sm transition-colors" style={{ fontFamily: 'Trebuchet MS' }}>
                                Detalles <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {vcts.length === 0 && (
                <div className="py-20 text-center flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-slate-100 rounded-sm flex items-center justify-center mb-2">
                        <ClipboardCheck size={32} className="text-slate-300" />
                    </div>
                    <p className="text-slate-500 font-medium font-sans">No hay verificaciones registradas aún.</p>
                </div>
            )}
        </div>
    );
};

export default History;
