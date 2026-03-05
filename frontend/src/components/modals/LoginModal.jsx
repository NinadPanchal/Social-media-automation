'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { X, Mail, Lock, Chrome, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function LoginModal({ isOpen, onClose }) {
    const overlayRef = useRef(null);
    const modalRef = useRef(null);
    const router = useRouter();
    const { login, register } = useAuth();

    const [isLoginMode, setIsLoginMode] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' });
            gsap.fromTo(modalRef.current,
                { opacity: 0, scale: 0.95, y: 20 },
                { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.1 }
            );
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const handleClose = () => {
        gsap.to(modalRef.current, { opacity: 0, scale: 0.95, y: 10, duration: 0.3, ease: 'power2.in' });
        gsap.to(overlayRef.current, {
            opacity: 0, duration: 0.3, ease: 'power2.in', delay: 0.1, onComplete: () => {
                setEmail('');
                setPassword('');
                setError(null);
                onClose();
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (isLoginMode) {
                await login(email, password);
            } else {
                await register(email, password);
            }
            router.push('/dashboard');
            handleClose(); // Close on success
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            ref={overlayRef}
            onClick={handleClose}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                opacity: 0,
                padding: 24,
            }}
        >
            <div
                ref={modalRef}
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: '100%',
                    maxWidth: 420,
                    background: 'linear-gradient(135deg, rgba(26,26,36,0.95) 0%, rgba(13,13,18,0.98) 100%)',
                    backdropFilter: 'blur(40px)',
                    WebkitBackdropFilter: 'blur(40px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 24,
                    padding: '40px 36px',
                    position: 'relative',
                    boxShadow: '0 40px 100px rgba(0,0,0,0.5), 0 0 1px rgba(255,255,255,0.1)',
                }}
            >
                {/* Close button */}
                <button
                    onClick={handleClose}
                    style={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.05)',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'background 0.2s ease',
                        color: 'var(--color-muted)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                >
                    <X size={16} />
                </button>

                {/* Header */}
                <h2 style={{
                    fontSize: 26,
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    marginBottom: 8,
                    color: 'var(--color-bg-light)',
                }}>
                    {isLoginMode ? 'Welcome back' : 'Create an account'}
                </h2>
                <p style={{
                    fontSize: 14,
                    color: 'var(--color-muted)',
                    lineHeight: 1.6,
                    marginBottom: 24,
                }}>
                    {isLoginMode ? 'Sign in to continue managing your automated social media campaigns.' : 'Get started with AI-powered social media automation.'}
                </p>

                {error && (
                    <div style={{
                        padding: '12px 16px',
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        borderRadius: 'var(--radius-sm)',
                        color: '#ef4444',
                        fontSize: 13,
                        marginBottom: 20,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8
                    }}>
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
                    {/* Email */}
                    <div style={{ position: 'relative' }}>
                        <Mail size={16} color="var(--color-muted)" style={{
                            position: 'absolute',
                            left: 14,
                            top: '50%',
                            transform: 'translateY(-50%)',
                        }} />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Email address"
                            style={{
                                width: '100%',
                                padding: '14px 14px 14px 42px',
                                borderRadius: 'var(--radius-md)',
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                color: 'var(--color-bg-light)',
                                fontSize: 14,
                                fontFamily: 'var(--font-heading)',
                                outline: 'none',
                                transition: 'border-color 0.3s ease',
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'rgba(201,168,76,0.4)'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                        />
                    </div>

                    {/* Password */}
                    <div style={{ position: 'relative' }}>
                        <Lock size={16} color="var(--color-muted)" style={{
                            position: 'absolute',
                            left: 14,
                            top: '50%',
                            transform: 'translateY(-50%)',
                        }} />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Password"
                            style={{
                                width: '100%',
                                padding: '14px 14px 14px 42px',
                                borderRadius: 'var(--radius-md)',
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                color: 'var(--color-bg-light)',
                                fontSize: 14,
                                fontFamily: 'var(--font-heading)',
                                outline: 'none',
                                transition: 'border-color 0.3s ease',
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'rgba(201,168,76,0.4)'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                        />
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="magnetic-btn"
                        style={{
                            width: '100%',
                            justifyContent: 'center',
                            padding: '14px',
                            fontSize: 14,
                            marginBottom: 14,
                            opacity: loading ? 0.7 : 1,
                        }}
                    >
                        {loading ? <Loader2 size={16} className="animate-spin" /> : (isLoginMode ? 'Log In' : 'Sign Up')}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginBottom: '14px' }}>
                    <button
                        type="button"
                        onClick={() => {
                            setIsLoginMode(!isLoginMode);
                            setError(null);
                        }}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--color-accent)',
                            fontSize: 13,
                            cursor: 'pointer',
                        }}
                    >
                        {isLoginMode ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
                    </button>
                </div>

                {/* Divider */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    margin: '6px 0 14px',
                }}>
                    <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
                    <span style={{ fontSize: 11, color: 'var(--color-muted)', fontWeight: 500 }}>OR</span>
                    <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
                </div>

                {/* Google button */}
                <button
                    style={{
                        width: '100%',
                        padding: '13px',
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: 'var(--color-bg-light)',
                        fontSize: 14,
                        fontWeight: 500,
                        fontFamily: 'var(--font-heading)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 10,
                        transition: 'background 0.2s ease, border-color 0.2s ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                >
                    <Chrome size={16} />
                    Continue with Google
                </button>

                {/* Microtext */}
                <p style={{
                    textAlign: 'center',
                    marginTop: 20,
                    fontSize: 11,
                    color: 'var(--color-muted)',
                    fontFamily: 'var(--font-mono)',
                    opacity: 0.7,
                    letterSpacing: '0.02em',
                }}>
                    By continuing, you agree to our Terms of Service.
                </p>
            </div >
        </div >
    );
}
