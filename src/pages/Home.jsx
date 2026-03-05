import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('vct_user') || '{}');

    return (
        <div className="flex flex-col gap-6 animate-fade-in">
            <div className="bg-argos-navy rounded-sm p-6 text-white overflow-hidden relative argos-shadow">
                <div className="relative z-10">
                    <p className="text-argos-lime font-bold uppercase text-[10px] tracking-widest mb-1 opacity-90" style={{ fontFamily: 'Trebuchet MS' }}>Tu Actividad</p>
                    <h2 className="text-3xl font-serif text-white mb-6 uppercase">Hola, {user.name?.split(' ')[0]}</h2>
                    <div className="flex gap-4">
                        <div className="bg-white/10 p-4 border-l-4 border-argos-lime rounded-sm flex-1">
                            <p className="text-[10px] opacity-80 uppercase tracking-widest mb-1 font-bold">Hoy</p>
                            <p className="text-3xl font-serif">3</p>
                        </div>
                        <div className="bg-white/10 p-4 border-l-4 border-white border-opacity-30 rounded-sm flex-1">
                            <p className="text-[10px] opacity-80 uppercase tracking-widest mb-1 font-bold">Semana</p>
                            <p className="text-3xl font-serif">12</p>
                        </div>
                    </div>
                </div>
                {/* Decorative blob argos brand touch */}
                <div className="absolute -right-16 -top-16 w-32 h-64 bg-argos-lime opacity-10 skew-x-12 pointer-events-none"></div>
            </div>

            <button
                onClick={() => navigate('/new-vct')}
                className="btn btn-primary w-full py-5 text-lg"
            >
                <Plus size={24} /> NUEVA VERIFICACIÓN
            </button>

            <div className="mt-2">
                <div className="flex justify-between items-end mb-4 px-1">
                    <h3 className="text-xl font-serif text-argos-navy m-0 leading-none">Recientes</h3>
                    <button className="text-[10px] text-argos-navy font-bold uppercase tracking-widest hover:text-argos-lime-hover transition-colors" style={{ fontFamily: 'Trebuchet MS' }}>
                        Ver Todo
                    </button>
                </div>

                <div className="flex flex-col gap-3">
                    <div className="vct-card flex items-center gap-4 group cursor-pointer border-l-4 border-success">
                        <div className="w-10 h-10 rounded-sm bg-success/10 text-success flex items-center justify-center transition-colors">
                            <CheckCircle size={22} />
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-argos-navy text-sm">Inspección Molino</p>
                            <p className="text-xs text-slate-500 mt-1">Hace 2 horas • Sin desvíos</p>
                        </div>
                        <div className="text-slate-300 group-hover:text-argos-lime transition-colors">
                            <Clock size={16} />
                        </div>
                    </div>

                    <div className="vct-card flex items-center gap-4 group cursor-pointer border-l-4 border-amber">
                        <div className="w-10 h-10 rounded-sm bg-amber/10 text-amber flex items-center justify-center transition-colors">
                            <AlertTriangle size={22} />
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-argos-navy text-sm">Transferencia Bandas</p>
                            <p className="text-xs text-slate-500 mt-1">Ayer • 2 desvíos corregidos</p>
                        </div>
                        <div className="text-slate-300 group-hover:text-argos-lime transition-colors">
                            <Clock size={16} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
