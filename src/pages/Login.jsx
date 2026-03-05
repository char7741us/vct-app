import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEED_DATA } from '../data/seedData';
import { ArrowRight } from 'lucide-react';

const Login = () => {
    const [name, setName] = useState('');
    const [process, setProcess] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (name && process) {
            localStorage.setItem('vct_user', JSON.stringify({ name, process }));
            navigate('/');
        }
    };

    return (
        <div className="flex flex-col min-h-[85vh] justify-center relative animate-fade-in px-4">
            {/* Decorative background blur */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-lime/20 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute bottom-20 -right-20 w-80 h-80 bg-navy/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="text-left mb-10 relative z-10">
                <div className="w-16 h-16 bg-lime text-navy rounded-2xl flex items-center justify-center font-bold text-2xl mb-6 shadow-sm">
                    A
                </div>
                <h1 className="text-4xl font-serif text-navy mb-3 leading-tight">
                    Ingreso a<br />
                    Argos VCT
                </h1>
                <p className="text-slate-500 font-medium text-lg">Identifícate para comenzar tu jornada</p>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-6 relative z-10">
                <div className="input-group">
                    <label className="input-label">Tu Nombre</label>
                    <input
                        type="text"
                        className="text-input"
                        placeholder="Ej. Oskaryvan Sanchez"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="input-group">
                    <label className="input-label">Proceso / Área</label>
                    <select
                        className="text-input appearance-none bg-white cursor-pointer"
                        value={process}
                        onChange={(e) => setProcess(e.target.value)}
                        required
                    >
                        <option value="" disabled hidden>Selecciona un área</option>
                        {SEED_DATA.processes.map(p => (
                            <option key={p.id} value={p.name}>{p.name}</option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary w-full py-4 text-lg mt-4 group">
                    Ingresar al Sistema
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </button>
            </form>

            <div className="mt-auto pt-16 flex flex-col items-center gap-5 relative z-10">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Logo_de_Cementos_Argos.svg/1200px-Logo_de_Cementos_Argos.svg.png"
                    alt="Argos"
                    className="h-7 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
                <p className="text-[10px] text-slate-400 uppercase tracking-widest text-center font-bold">
                    Tecnología Argos <span className="text-lime-800 mx-1">•</span> Política Papel Cero
                </p>
            </div>
        </div>
    );
};

export default Login;
