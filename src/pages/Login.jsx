import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, Lock, AlertCircle, Loader2, Eye, EyeOff } from 'lucide-react';
import { signInWithEmail } from '../lib/supabase';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await signInWithEmail(email, password);
            navigate('/');
        } catch (err) {
            // Mensajes de error amigables en español
            if (err.message.includes('Invalid login credentials')) {
                setError('Correo o contraseña incorrectos. Verifica tus datos.');
            } else if (err.message.includes('Email not confirmed')) {
                setError('Debes confirmar tu correo antes de ingresar. Revisa tu bandeja de entrada.');
            } else if (err.message.includes('Too many requests')) {
                setError('Demasiados intentos. Espera un momento e intenta nuevamente.');
            } else {
                setError(err.message || 'Error al iniciar sesión. Intenta de nuevo.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-[85vh] justify-center relative animate-fade-in px-2">

            {/* Decoración de fondo */}
            <div className="absolute top-0 right-0 w-32 h-64 bg-argos-lime/5 skew-x-12 pointer-events-none"></div>

            {/* Encabezado */}
            <div className="text-left mb-10 relative z-10 border-l-8 border-argos-lime pl-4">
                <h1 className="text-5xl font-serif text-argos-navy mb-2 leading-none uppercase">
                    Acceso<br />
                    Argos VCT
                </h1>
                <p className="text-slate-500 font-medium text-lg mt-4 font-sans">
                    Ingresa con tu correo corporativo Argos
                </p>
            </div>

            {/* Formulario */}
            <form onSubmit={handleLogin} className="flex flex-col relative z-10 gap-4">

                {/* Campo Email */}
                <div className="input-group">
                    <label className="input-label">
                        <Mail size={14} className="inline mr-1 opacity-60" />
                        Correo Corporativo
                    </label>
                    <input
                        type="email"
                        className="text-input"
                        placeholder="usuario@argos.co"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                        disabled={loading}
                    />
                </div>

                {/* Campo Contraseña */}
                <div className="input-group">
                    <label className="input-label">
                        <Lock size={14} className="inline mr-1 opacity-60" />
                        Contraseña
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="text-input pr-12"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                            disabled={loading}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-argos-navy transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
                            tabIndex={-1}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                {/* Mensaje de error */}
                {error && (
                    <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
                        <AlertCircle size={16} className="mt-0.5 shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Botón de ingreso */}
                <button
                    type="submit"
                    className="btn btn-primary w-full py-4 text-lg mt-2 group"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin" size={20} />
                            Verificando...
                        </>
                    ) : (
                        <>
                            Ingresar a Plataforma
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                        </>
                    )}
                </button>
            </form>

            {/* Footer */}
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
