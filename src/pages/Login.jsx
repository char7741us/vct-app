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
        <div className="flex flex-col min-h-[85vh] justify-center relative animate-fade-in px-2">

            <div className="absolute top-0 right-0 w-32 h-64 bg-argos-lime/5 skew-x-12 pointer-events-none"></div>

            <div className="text-left mb-10 relative z-10 border-l-8 border-argos-lime pl-4">
                <h1 className="text-5xl font-serif text-argos-navy mb-2 leading-none uppercase">
                    Acceso<br />
                    Argos VCT
                </h1>
                <p className="text-slate-500 font-medium text-lg mt-4 font-sans">Identificación de colaborador para iniciar jornada operativa</p>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col relative z-10">
                <div className="input-group">
                    <label className="input-label">Nombre del Colaborador</label>
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
                    <label className="input-label">Proceso / Área Asignada</label>
                    <select
                        className="text-input appearance-none bg-white cursor-pointer"
                        value={process}
                        onChange={(e) => setProcess(e.target.value)}
                        required
                    >
                        <option value="" disabled hidden>Selecciona área operativa</option>
                        {SEED_DATA.processes.map(p => (
                            <option key={p.id} value={p.name}>{p.name}</option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary w-full py-4 text-lg mt-6 group">
                    Ingresar a Plataforma
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </button>
            </form>

            <div className="mt-auto pt-16 flex flex-col items-center gap-4 relative z-10 border-t border-slate-100">
                <img
                    src="https://brandcenter.argos.co/wp-content/uploads/2024/02/ARGOS_BC_logotipo.png"
                    alt="Argos"
                    className="h-6"
                />
                <p className="text-[10px] text-argos-navy uppercase tracking-widest text-center font-bold" style={{ fontFamily: 'Trebuchet MS' }}>
                    Herramienta VCT <span className="text-argos-lime mx-1">•</span> Política Papel Cero
                </p>
            </div>
        </div>
    );
};

export default Login;
