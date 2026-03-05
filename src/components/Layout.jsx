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
            <header className="glass p-4 sticky top-0 z-50 flex justify-between items-center border-b border-slate-100">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-lime rounded-xl flex items-center justify-center font-bold text-navy shadow-sm">
                        A
                    </div>
                    <h1 className="text-xl m-0 leading-none tracking-tight">Argos VCT</h1>
                </div>
                {!hideNav && (
                    <button
                        className="p-2 text-slate-400 hover:text-navy hover:bg-slate-100 rounded-xl transition-all"
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
                <nav className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-white/90 backdrop-blur-md border-t border-slate-100 p-2 flex justify-around items-center z-50 pb-[max(env(safe-area-inset-bottom),8px)] shadow-[0_-4px_24px_rgba(0,0,0,0.02)]">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all flex-1 ${isActive
                                        ? 'text-navy font-bold bg-slate-50 relative'
                                        : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50/50'
                                    }`}
                            >
                                {isActive && (
                                    <div className="absolute top-0 w-8 h-1 bg-lime rounded-b-full shadow-[0_0_8px_rgba(178,210,53,0.5)]"></div>
                                )}
                                <div className={`${isActive ? 'scale-110 text-lime-800' : ''} transition-transform duration-300`}>
                                    {item.icon}
                                </div>
                                <span className={`text-[10px] tracking-widest uppercase ${isActive ? 'font-black' : 'font-semibold'}`}>
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
