import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, PlusSquare, ClipboardList, LogOut } from 'lucide-react';

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { icon: <Home size={24} />, label: 'Inicio', path: '/' },
        { icon: <PlusSquare size={24} />, label: 'Nuevo VCT', path: '/new-vct' },
        { icon: <ClipboardList size={24} />, label: 'Historial', path: '/history' },
    ];

    const hideNav = location.pathname === '/login';

    return (
        <div className="mobile-container">
            <header className="glass p-4 sticky top-0 z-50 flex justify-between items-center bg-argos-navy text-white">
                <div className="flex items-center gap-3">
                    <img
                        src="https://brandcenter.argos.co/wp-content/uploads/2024/02/ARGOS_BC_logotipo.png"
                        alt="Argos VCT"
                        className="h-6 object-contain filter brightness-0 invert"
                    />
                </div>
                {!hideNav && (
                    <button
                        className="p-2 text-white/70 hover:text-white rounded-sm transition-all"
                        onClick={() => navigate('/login')}
                        aria-label="Cerrar sesión"
                    >
                        <LogOut size={22} />
                    </button>
                )}
            </header>

            <main className="flex-1 p-5 overflow-y-auto pb-28">
                {children}
            </main>

            {!hideNav && (
                <nav className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-white border-t border-slate-200 p-2 flex justify-around items-center z-50 pb-[max(env(safe-area-inset-bottom),8px)] argos-shadow">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={`flex flex-col items-center gap-1.5 p-3 rounded-sm transition-all flex-1 ${isActive
                                    ? 'text-argos-navy font-bold bg-slate-50 relative'
                                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50/50'
                                    }`}
                            >
                                {isActive && (
                                    <div className="absolute top-0 w-8 h-1 bg-argos-lime"></div>
                                )}
                                <div className={`${isActive ? 'scale-110 text-argos-navy' : ''} transition-transform duration-300`}>
                                    {item.icon}
                                </div>
                                <span className={`text-[10px] uppercase ${isActive ? 'font-bold' : 'font-medium'}`} style={{ fontFamily: 'Trebuchet MS' }}>
                                    {item.label}
                                </span>
                            </button>
                        );
                    })}
                </nav>
            )}
        </div>
    );
};

export default Layout;
