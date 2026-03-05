'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, PenSquare, Calendar, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Sidebar({ onClose }) {
    const pathname = usePathname();
    const { logout } = useAuth();

    const navItems = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Create Post', href: '/dashboard/create-post', icon: PenSquare },
        { name: 'Scheduled', href: '/dashboard/scheduled-posts', icon: Calendar },
    ];

    return (
        <aside className="w-[260px] h-full flex flex-col" style={{
            borderRight: '1px solid rgba(255, 255, 255, 0.08)',
            backgroundColor: 'rgba(10, 10, 10, 0.98)',
        }}>
            <div style={{ padding: '32px 24px', flexShrink: 0 }}>
                <Link href="/" onClick={onClose} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: 'linear-gradient(135deg, var(--color-accent), #FFC85C)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-bg)',
                        fontWeight: 'bold',
                        fontSize: 16
                    }}>
                        A
                    </div>
                    <span style={{ color: 'var(--color-text)', fontWeight: 600, fontSize: 18, letterSpacing: '-0.02em' }}>
                        AutoSocial<span style={{ color: 'var(--color-accent)' }}>.AI</span>
                    </span>
                </Link>
            </div>

            <nav style={{ flex: 1, padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onClose}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 12,
                                padding: '12px 16px',
                                borderRadius: 'var(--radius-md)',
                                textDecoration: 'none',
                                color: isActive ? 'var(--color-bg-light)' : 'var(--color-muted)',
                                backgroundColor: isActive ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                                transition: 'all 0.2s ease',
                                fontWeight: isActive ? 500 : 400,
                            }}
                            onMouseEnter={(e) => {
                                if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                            }}
                            onMouseLeave={(e) => {
                                if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                        >
                            <Icon size={18} color={isActive ? 'var(--color-accent)' : 'currentColor'} />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>

            <div style={{ padding: '24px 16px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <button
                    onClick={() => { logout(); if (onClose) onClose(); }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        width: '100%',
                        padding: '12px 16px',
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-muted)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontFamily: 'inherit',
                        fontSize: 16,
                        transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-muted)'}
                >
                    <LogOut size={18} />
                    Log Out
                </button>
            </div>
        </aside>
    );
}
