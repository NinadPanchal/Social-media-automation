'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { X, Sparkles, Instagram, Twitter, Linkedin, Hash, Loader2, ArrowRight } from 'lucide-react';

const AI_RESULTS = [
    {
        platform: 'Instagram Caption',
        icon: Instagram,
        color: '#E4405F',
        content: '☕ Start your morning right! Our house blend is crafted from ethically sourced beans, roasted to perfection. Come taste the difference!',
    },
    {
        platform: 'Hashtags',
        icon: Hash,
        color: 'var(--color-accent)',
        content: '#CoffeeLovers #LocalCafe #MorningBrew #CoffeeShop #FreshlyRoasted #CoffeeCulture',
    },
    {
        platform: 'Tweet',
        icon: Twitter,
        color: '#1DA1F2',
        content: 'Your morning ritual, elevated. ☕ Our single-origin pour-over is turning heads. Swing by and let us make your day →',
    },
    {
        platform: 'LinkedIn Post',
        icon: Linkedin,
        color: '#0A66C2',
        content: 'At our coffee shop, we believe great coffee builds great conversations. Visit us this week — business meetings taste better here.',
    },
];

import { useAuth } from '@/context/AuthContext';

export default function GetStartedModal({ isOpen, onClose }) {
    const overlayRef = useRef(null);
    const modalRef = useRef(null);
    const [prompt, setPrompt] = useState('Promote my coffee shop');
    const [isGenerating, setIsGenerating] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [visibleResults, setVisibleResults] = useState(0);
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const { token } = useAuth();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setIsGenerating(false);
            setShowResults(false);
            setVisibleResults(0);
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
        gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in', delay: 0.1, onComplete: onClose });
    };

    const handleGenerate = async () => {
        setIsGenerating(true);
        setShowResults(false);
        setVisibleResults(0);
        setError(null);

        try {
            const headers = { 'Content-Type': 'application/json' };
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const res = await fetch('/api/generate-post', {
                method: 'POST',
                headers,
                body: JSON.stringify({ prompt })
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.detail || 'Failed to generate content');
            }

            const data = await res.json();

            // Map the API results back to our UI structure
            const platformIcons = {
                'Instagram Caption': Instagram,
                'Tweet': Twitter,
                'LinkedIn Post': Linkedin,
                'Hashtags': Hash
            };

            const formattedResults = data.results.map(r => ({
                platform: r.platform,
                content: r.content,
                color: r.color,
                icon: platformIcons[r.platform] || Sparkles
            }));

            setResults(formattedResults);
            setIsGenerating(false);
            setShowResults(true);

            // Stagger results visibility
            formattedResults.forEach((_, i) => {
                setTimeout(() => setVisibleResults(prev => Math.max(prev, i + 1)), (i + 1) * 300);
            });

        } catch (err) {
            console.error(err);
            setError(err.message);
            setIsGenerating(false);
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
                overflowY: 'auto',
            }}
        >
            <div
                ref={modalRef}
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: '100%',
                    maxWidth: 560,
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    background: 'linear-gradient(135deg, rgba(26,26,36,0.95) 0%, rgba(13,13,18,0.98) 100%)',
                    backdropFilter: 'blur(40px)',
                    WebkitBackdropFilter: 'blur(40px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 24,
                    padding: '36px 32px',
                    position: 'relative',
                    boxShadow: '0 40px 100px rgba(0,0,0,0.5), 0 0 1px rgba(201,168,76,0.2)',
                }}
            >
                {/* Close */}
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
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <div style={{
                        width: 32,
                        height: 32,
                        borderRadius: 'var(--radius-sm)',
                        background: 'rgba(201,168,76,0.12)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Sparkles size={16} color="var(--color-accent)" />
                    </div>
                    <h2 style={{
                        fontSize: 22,
                        fontWeight: 800,
                        letterSpacing: '-0.02em',
                        color: 'var(--color-bg-light)',
                    }}>
                        Start Automating Your Social Media
                    </h2>
                </div>

                <p style={{
                    fontSize: 14,
                    color: 'var(--color-muted)',
                    lineHeight: 1.6,
                    marginBottom: 28,
                    paddingLeft: 42,
                }}>
                    Try the AI content generator — type a prompt and watch it create platform-optimized content.
                </p>

                {/* Prompt Input */}
                <div style={{
                    display: 'flex',
                    gap: 10,
                    marginBottom: 24,
                }}>
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe what you want to promote..."
                        style={{
                            flex: 1,
                            padding: '14px 16px',
                            borderRadius: 'var(--radius-md)',
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            color: 'var(--color-bg-light)',
                            fontSize: 14,
                            fontFamily: 'var(--font-mono)',
                            outline: 'none',
                            transition: 'border-color 0.3s ease',
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'rgba(201,168,76,0.4)'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                    />
                    <button
                        onClick={handleGenerate}
                        disabled={isGenerating || !prompt.trim()}
                        className="magnetic-btn"
                        style={{
                            padding: '14px 20px',
                            fontSize: 13,
                            opacity: isGenerating || !prompt.trim() ? 0.6 : 1,
                            pointerEvents: isGenerating || !prompt.trim() ? 'none' : 'auto',
                        }}
                    >
                        {isGenerating ? (
                            <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                        ) : (
                            'Generate'
                        )}
                    </button>
                </div>

                {/* Loading state */}
                {isGenerating && (
                    <div style={{
                        textAlign: 'center',
                        padding: '32px 0',
                    }}>
                        <div style={{
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            background: 'rgba(201,168,76,0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 16px',
                        }}>
                            <Sparkles size={20} color="var(--color-accent)" style={{ animation: 'spin 2s ease-in-out infinite' }} />
                        </div>
                        <p style={{ fontSize: 14, color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}>
                            AI is generating your content...
                        </p>
                    </div>
                )}

                {error && (
                    <div style={{
                        padding: '16px',
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        color: '#ef4444',
                        fontSize: 14,
                        marginBottom: 24,
                        textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}

                {/* Results */}
                {showResults && results.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                        {results.map((result, i) => (
                            <div
                                key={result.platform}
                                style={{
                                    opacity: i < visibleResults ? 1 : 0,
                                    transform: i < visibleResults ? 'translateY(0)' : 'translateY(15px)',
                                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                                    padding: '16px 18px',
                                    borderRadius: 'var(--radius-md)',
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.06)',
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                                    <result.icon size={14} color={result.color} />
                                    <span style={{ fontSize: 12, fontWeight: 600, fontFamily: 'var(--font-mono)', color: result.color, letterSpacing: '0.03em' }}>
                                        {result.platform}
                                    </span>
                                    <span style={{
                                        marginLeft: 'auto',
                                        fontSize: 10,
                                        fontFamily: 'var(--font-mono)',
                                        color: '#4ade80',
                                        padding: '2px 8px',
                                        borderRadius: 8,
                                        background: 'rgba(74,222,128,0.08)',
                                    }}>
                                        Generated
                                    </span>
                                </div>
                                <p style={{ fontSize: 13, lineHeight: 1.6, color: 'rgba(250,248,245,0.75)' }}>
                                    {result.content}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                {/* CTA */}
                {showResults && visibleResults >= results.length && !token && (
                    <button
                        onClick={onClose}
                        className="magnetic-btn"
                        style={{
                            width: '100%',
                            justifyContent: 'center',
                            padding: '14px',
                            fontSize: 14,
                        }}
                    >
                        Create Free Account to Save <ArrowRight size={15} />
                    </button>
                )}

                <style jsx>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
            </div>
        </div>
    );
}
