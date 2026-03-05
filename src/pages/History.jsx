import React from 'react';
import { ClipboardCheck, Calendar, User, ChevronRight } from 'lucide-react';

const History = () => {
    const vcts = [
        {
            id: 1,
            procedure: 'Inspección de equipos en el área del Molino',
            date: '2026-03-04',
            worker: 'Oskaryvan Sanchez',
            status: 'Aprobado',
            deviations: 0
        },
        {
            id: 2,
            procedure: 'Inspección diaria en el área de Materias Primas',
            date: '2026-03-03',
            worker: 'Juan Perez',
            status: 'Aprobado',
            deviations: 2
        }
    ];

    return (
        <div className="flex flex-col gap-6 animate-fade-in relative">
            {/* Decorative background blur */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-lime/10 rounded-full blur-[80px] pointer-events-none -mr-20 -mt-20"></div>

            <div className="px-2 relative z-10 bg-slate-50/80 backdrop-blur-sm sticky top-[72px] py-4 -mx-2 mb-2 rounded-b-3xl shadow-sm border-b border-white">
                <h2 className="text-3xl font-serif text-navy mb-1 px-4">Historial VCT</h2>
                <p className="text-slate-500 text-sm px-4">Registro de todas las verificaciones digitales</p>
            </div>

            <div className="flex flex-col gap-4 relative z-10 px-1">
                {vcts.map((vct) => (
                    <div key={vct.id} className="vct-card flex flex-col gap-4 hover:border-lime transition-all duration-300 cursor-pointer group hover:shadow-md hover:shadow-lime/10 relative overflow-hidden bg-white/80 backdrop-blur-sm">

                        <div className="absolute top-0 right-0 w-24 h-24 bg-navy/5 rounded-full blur-xl pointer-events-none -mr-10 -mt-10 group-hover:bg-lime/10 transition-colors"></div>

                        <div className="flex justify-between items-start relative z-10">
                            <div className="flex-1 pr-4">
                                <h4 className="font-bold text-navy text-base leading-tight mb-2 group-hover:text-lime-800 transition-colors">{vct.procedure}</h4>
                                <div className="flex flex-col gap-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                    <span className="flex items-center gap-1.5"><Calendar size={12} className="text-navy/40" /> {vct.date}</span>
                                    <span className="flex items-center gap-1.5"><User size={12} className="text-navy/40" /> {vct.worker}</span>
                                </div>
                            </div>
                            <div className={`px-2.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-sm ${vct.status === 'Aprobado'
                                    ? 'bg-success text-white'
                                    : 'bg-amber border border-amber/20 text-white'
                                }`}>
                                {vct.status}
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-3 border-t border-slate-100 relative z-10">
                            <span className={`text-xs font-bold ${vct.deviations === 0 ? 'text-success' : 'text-amber'}`}>
                                {vct.deviations === 0 ? '✓ Sin desvíos' : `! ${vct.deviations} desvíos registrados`}
                            </span>
                            <button className="text-navy flex items-center gap-1 text-[10px] font-black uppercase tracking-widest bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-colors group-hover:bg-lime/10 group-hover:text-lime-900">
                                Detalles <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {vcts.length === 0 && (
                <div className="py-20 text-center flex flex-col items-center gap-4 relative z-10">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-2">
                        <ClipboardCheck size={32} className="text-slate-300" />
                    </div>
                    <p className="text-slate-500 font-medium">No hay verificaciones registradas aún.</p>
                </div>
            )}
        </div>
    );
};

export default History;
