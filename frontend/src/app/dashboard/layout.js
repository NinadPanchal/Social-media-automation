'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { Menu, X } from 'lucide-react';

export default function DashboardLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen relative" style={{ backgroundColor: 'var(--color-bg)' }}>
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-[60px] flex items-center justify-between px-5 z-50 backdrop-blur-md border-b border-white/10"
                style={{ backgroundColor: 'rgba(10, 10, 10, 0.85)' }}>
                <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-md flex items-center justify-center font-bold text-sm"
                        style={{ background: 'linear-gradient(135deg, var(--color-accent), #FFC85C)', color: 'var(--color-bg)' }}>
                        A
                    </div>
                    <span className="font-semibold text-base" style={{ color: 'var(--color-text)' }}>AutoSocial</span>
                </div>
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white/80 hover:text-white border-none bg-transparent">
                    {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar Container */}
            <div className={`fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <Sidebar onClose={() => setSidebarOpen(false)} />
            </div>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-auto pt-[60px] md:pt-0">
                <div className="w-full max-w-7xl mx-auto p-5 md:p-10">
                    {children}
                </div>
            </main>
        </div>
    );
}
