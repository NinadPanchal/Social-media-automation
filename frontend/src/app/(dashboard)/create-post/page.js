'use client';

import { useState } from 'react';
import { Sparkles, Save, Calendar, Send, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function CreatePostPage() {
    const { token } = useAuth();
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [generatedResults, setGeneratedResults] = useState(null);
    const [error, setError] = useState(null);

    const handleGenerate = async () => {
        if (!prompt.trim()) return;

        setLoading(true);
        setError(null);
        setGeneratedResults(null);

        try {
            const res = await fetch('/api/generate-post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ prompt })
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.detail || 'Failed to generate content');

            // Format results into expected structure from api
            // We simulate a typing effect for UX by initially setting everything blank, 
            // then gradually revealing the text.
            const resultsBlank = data.results.map(r => ({ ...r, displayContent: '' }));
            setGeneratedResults(resultsBlank);

            // Re-render with typing animation
            data.results.forEach((result, platformIndex) => {
                let charIndex = 0;
                const typingInterval = setInterval(() => {
                    if (charIndex < result.content.length) {
                        setGeneratedResults(prev => {
                            if (!prev) return prev;
                            const next = [...prev];
                            next[platformIndex].displayContent = result.content.substring(0, charIndex + 1);
                            return next;
                        });
                        charIndex += Math.max(1, Math.floor(result.content.length / 50)); // Variable speed
                    } else {
                        // Make sure exact end string is set completely
                        setGeneratedResults(prev => {
                            if (!prev) return prev;
                            const next = [...prev];
                            next[platformIndex].displayContent = result.content;
                            return next;
                        });
                        clearInterval(typingInterval);
                    }
                }, 15);
            });

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', gap: 32, height: 'calc(100vh - 80px)' }}>

            {/* Left Panel: Prompt Input */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 500 }}>
                <div>
                    <h1 style={{ fontSize: 32, fontWeight: 600, color: 'var(--color-bg-light)', marginBottom: 8, letterSpacing: '-0.02em' }}>
                        Create <span className="text-gradient-accent" style={{ fontStyle: 'italic', fontFamily: 'var(--font-accent)' }}>Magic.</span>
                    </h1>
                    <p style={{ color: 'var(--color-muted)', fontSize: 16 }}>
                        Describe what you want to post about. AI will write platform-optimized copy for Instagram, Twitter, and LinkedIn simultaneously.
                    </p>
                </div>

                <div style={{
                    padding: 24,
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16,
                    flex: 1,
                    maxHeight: 400
                }}>
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="E.g., Promote our new organic coffee blend coming this friday. Emphasize the ethical sourcing."
                        style={{
                            width: '100%',
                            flex: 1,
                            backgroundColor: 'rgba(0,0,0,0.2)',
                            border: '1px solid rgba(255,255,255,0.05)',
                            borderRadius: 'var(--radius-md)',
                            padding: 16,
                            color: 'var(--color-bg-light)',
                            fontSize: 15,
                            lineHeight: 1.6,
                            resize: 'none',
                            outline: 'none',
                            transition: 'border-color 0.3s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'rgba(201, 168, 76, 0.4)'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.05)'}
                    />

                    {error && (
                        <div style={{ color: '#ef4444', fontSize: 13, backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '8px 12px', borderRadius: 4 }}>
                            {error}
                        </div>
                    )}

                    <button
                        onClick={handleGenerate}
                        disabled={loading || !prompt.trim()}
                        className="magnetic-btn"
                        style={{ width: '100%', justifyContent: 'center', opacity: (loading || !prompt.trim()) ? 0.6 : 1 }}
                    >
                        {loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                        {loading ? 'Generating...' : 'Generate Posts'}
                    </button>
                </div>
            </div>

            {/* Right Panel: Results Grid */}
            <div style={{
                flex: 1.5,
                backgroundColor: 'rgba(10, 10, 10, 0.4)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
            }}>
                <div style={{
                    padding: '16px 24px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 100%)'
                }}>
                    <span style={{ fontWeight: 500, color: 'var(--color-bg-light)' }}>Generated Content</span>

                    <div style={{ display: 'flex', gap: 12 }}>
                        <button disabled={!generatedResults} style={{ ...BtnStyle, opacity: !generatedResults ? 0.3 : 1 }}>
                            <Save size={14} /> Draft
                        </button>
                        <button disabled={!generatedResults} style={{ ...BtnStyle, opacity: !generatedResults ? 0.3 : 1 }}>
                            <Calendar size={14} /> Schedule
                        </button>
                        <button disabled={!generatedResults} style={{ ...BtnStyle, opacity: !generatedResults ? 0.3 : 1, color: 'var(--color-bg)', backgroundColor: 'var(--color-accent)', borderColor: 'var(--color-accent)' }}>
                            <Send size={14} /> Publish
                        </button>
                    </div>
                </div>

                <div style={{ padding: 24, overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {!generatedResults && !loading && (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--color-muted)', gap: 16 }}>
                            <Sparkles size={32} opacity={0.3} />
                            <p>Write a prompt to generate multi-platform content.</p>
                        </div>
                    )}

                    {loading && !generatedResults && (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--color-accent)', gap: 16 }}>
                            <Loader2 size={32} className="animate-spin" />
                            <p style={{ color: 'var(--color-muted)', fontSize: 14 }}>Connecting to Gemini API...</p>
                        </div>
                    )}

                    {generatedResults && generatedResults.map((result, idx) => (
                        <div key={idx} style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            borderRadius: 'var(--radius-md)',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                padding: '8px 16px',
                                backgroundColor: 'rgba(0,0,0,0.2)',
                                borderBottom: '1px solid rgba(255,255,255,0.03)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                                fontSize: 12,
                                fontWeight: 500,
                                color: result.color || 'var(--color-bg-light)'
                            }}>
                                <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: result.color || 'var(--color-bg-light)' }} />
                                {result.platform}
                            </div>
                            <textarea
                                value={result.displayContent}
                                onChange={(e) => {
                                    const next = [...generatedResults];
                                    next[idx].displayContent = e.target.value;
                                    next[idx].content = e.target.value; // Store actual change
                                    setGeneratedResults(next);
                                }}
                                style={{
                                    width: '100%',
                                    minHeight: 120,
                                    padding: 16,
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    color: 'var(--color-bg-light)',
                                    fontSize: 14,
                                    lineHeight: 1.6,
                                    resize: 'vertical',
                                    outline: 'none'
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}

const BtnStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '6px 14px',
    fontSize: 12,
    fontWeight: 500,
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: 'var(--color-bg-light)',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
    transition: 'all 0.2s',
};
