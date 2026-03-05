import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('vct_user') || '{}');

    return (
        <div className="flex flex-col gap-6 animate-fade-in">
            <div className="bg-navy rounded-[28px] p-7 text-white overflow-hidden relative shadow-[0_12px_32px_-8px_rgba(0,43,73,0.4)]">
                <div className="relative z-10">
                    <p className="text-lime font-bold uppercase text-[10px] tracking-widest mb-2 opacity-90">Tu Actividad</p>
                    <h2 className="text-3xl font-serif text-white mb-6">Hola, {user.name?.split(' ')[0]}</h2>
                    <div className="flex gap-4">
                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl flex-1 border border-white/10">
                            <p className="text-[10px] opacity-70 uppercase tracking-wider mb-1">Hoy</p>
                            <p className="text-2xl font-bold">3</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl flex-1 border border-white/10">
                            <p className="text-[10px] opacity-70 uppercase tracking-wider mb-1">Semana</p>
                            <p className="text-2xl font-bold">12</p>
                        </div>
                    </div>
                </div>
                {/* Decorative blob */}
                <div className="absolute -right-12 -bottom-16 w-56 h-56 bg-lime rounded-full blur-[64px] opacity-30 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-[80px] opacity-10 pointer-events-none"></div>
            </div>

            <button
                onClick={() => navigate('/new-vct')}
                className="btn btn-lime w-full py-5 text-lg shadow-[0_8px_24px_-4px_rgba(178,210,53,0.4)]"
            >
                <Plus size={24} /> NUEVA VERIFICACIÓN
            </button>

            <div className="mt-2">
                <div className="flex justify-between items-end mb-4 px-2">
                    <h3 className="text-xl font-serif text-navy m-0">Recientes</h3>
                    <button className="text-[10px] text-navy font-bold uppercase tracking-widest bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors">
                        Ver Todo
                    </button>
                </div>

                <div className="flex flex-col gap-3">
                    <div className="vct-card flex items-center gap-4 group cursor-pointer hover:border-slate-200">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                            <CheckCircle size={24} />
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-navy text-sm">Inspección Molino</p>
                            <p className="text-xs text-slate-500 mt-0.5 mt-0.5">Hace 2 horas • Sin desvíos</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-slate-100 transition-colors">
                            <Clock size={14} className="text-slate-400" />
                        </div>
                    </div>

                    <div className="vct-card flex items-center gap-4 group cursor-pointer hover:border-slate-200">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                            <AlertTriangle size={24} />
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-navy text-sm">Transferencia Bandas</p>
                            <p className="text-xs text-slate-500 mt-0.5">Ayer • 2 desvíos corregidos</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-slate-100 transition-colors">
                            <Clock size={14} className="text-slate-400" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
