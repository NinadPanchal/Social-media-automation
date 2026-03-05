'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Menu, X } from 'lucide-react';
import LoginModal from '@/components/modals/LoginModal';
import Link from 'next/link';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'Demo', href: '#demo' },
        { label: 'Features', href: '#features' },
        { label: 'Analytics', href: '#analytics' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'Docs', href: 'https://github.com/NinadPanchal/Social-media-automation#readme' },
    ];

    const scrollToSection = (e, href) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            const id = href.replace('#', '');
            const el = document.getElementById(id);
            if (el) {
                const navHeight = 80;
                const y = el.getBoundingClientRect().top + window.scrollY - navHeight;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }
    };

    return (
        <>
            <nav
                id="main-nav"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 100,
                    padding: isScrolled ? '12px 0' : '20px 0',
                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
            >
                <div
                    style={{
                        maxWidth: 1280,
                        margin: '0 auto',
                        padding: '0 24px',
                    }}
                >
                    <div
                        className={isScrolled ? 'glass' : ''}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '12px 24px',
                            borderRadius: 'var(--radius-xl)',
                            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                            background: isScrolled ? undefined : 'transparent',
                            border: isScrolled ? undefined : '1px solid transparent',
                        }}
                    >
                        {/* Logo */}
                        <a
                            href="https://github.com/NinadPanchal/Social-media-automation"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10,
                                textDecoration: 'none',
                                color: 'var(--color-bg-light)',
                            }}
                        >
                            <div
                                style={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: 'var(--radius-sm)',
                                    background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-dark) 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Sparkles size={18} color="var(--color-primary)" />
                            </div>
                            <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: '-0.02em' }}>
                                AutoSocial
                            </span>
                            <span
                                style={{
                                    fontSize: 10,
                                    fontWeight: 600,
                                    padding: '2px 8px',
                                    borderRadius: 20,
                                    background: 'rgba(201, 168, 76, 0.15)',
                                    color: 'var(--color-accent)',
                                    letterSpacing: '0.05em',
                                }}
                            >
                                AI
                            </span>
                        </a>

                        {/* Desktop Nav */}
                        <div
                            className="hide-mobile"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 32,
                            }}
                        >
                            {navLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={(e) => scrollToSection(e, link.href)}
                                    style={{
                                        color: 'var(--color-muted)',
                                        textDecoration: 'none',
                                        fontSize: 14,
                                        fontWeight: 500,
                                        transition: 'color 0.3s ease',
                                        letterSpacing: '0.01em',
                                        cursor: 'pointer',
                                    }}
                                    onMouseEnter={(e) => (e.target.style.color = 'var(--color-bg-light)')}
                                    onMouseLeave={(e) => (e.target.style.color = 'var(--color-muted)')}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>

                        {/* Desktop CTA */}
                        <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <button
                                onClick={() => setShowLogin(true)}
                                style={{
                                    color: 'var(--color-muted)',
                                    background: 'none',
                                    border: 'none',
                                    textDecoration: 'none',
                                    fontSize: 14,
                                    fontWeight: 500,
                                    padding: '10px 20px',
                                    cursor: 'pointer',
                                    transition: 'color 0.3s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                    fontFamily: 'var(--font-heading)',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = 'var(--color-bg-light)';
                                    e.currentTarget.style.transform = 'scale(1.03)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = 'var(--color-muted)';
                                    e.currentTarget.style.transform = 'scale(1)';
                                }}
                            >
                                Log In
                            </button>
                            <Link
                                href="/dashboard"
                                className="magnetic-btn"
                                style={{
                                    padding: '10px 24px',
                                    fontSize: 13,
                                    textDecoration: 'none',
                                    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                }}
                            >
                                Get Started
                            </Link>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="hide-desktop"
                            onClick={() => setIsMobileOpen(!isMobileOpen)}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--color-bg-light)',
                                cursor: 'pointer',
                                padding: 8,
                            }}
                        >
                            {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {isMobileOpen && (
                        <div
                            className="glass hide-desktop"
                            style={{
                                marginTop: 8,
                                padding: 24,
                                borderRadius: 'var(--radius-lg)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 16,
                            }}
                        >
                            {navLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={(e) => { scrollToSection(e, link.href); setIsMobileOpen(false); }}
                                    style={{
                                        color: 'var(--color-bg-light)',
                                        textDecoration: 'none',
                                        fontSize: 16,
                                        fontWeight: 500,
                                        padding: '8px 0',
                                        borderBottom: '1px solid rgba(255,255,255,0.06)',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {link.label}
                                </a>
                            ))}
                            <button
                                onClick={() => { setIsMobileOpen(false); setShowLogin(true); }}
                                className="magnetic-btn magnetic-btn-outline"
                                style={{ marginTop: 4, width: '100%', justifyContent: 'center' }}
                            >
                                Log In
                            </button>
                            <Link
                                href="/dashboard"
                                className="magnetic-btn"
                                style={{ width: '100%', justifyContent: 'center', textDecoration: 'none' }}
                                onClick={() => setIsMobileOpen(false)}
                            >
                                Get Started
                            </Link>
                        </div>
                    )}
                </div>
            </nav>

            {/* Modals */}
            <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
        </>
    );
}
