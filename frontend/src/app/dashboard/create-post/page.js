'use client';

import { useState } from 'react';
import { Sparkles, Save, Calendar, Send, Loader2, X, Clock, Image, Download, RefreshCw } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function CreatePostPage() {
    const { token } = useAuth();
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [generatedResults, setGeneratedResults] = useState(null);
    const [error, setError] = useState(null);
    const [saveMsg, setSaveMsg] = useState(null);

    // Image generation state
    const [imageUrl, setImageUrl] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [imageError, setImageError] = useState(null);

    // Schedule modal state
    const [scheduleModal, setScheduleModal] = useState(false);
    const [schedulePlatform, setSchedulePlatform] = useState('Instagram');
    const [scheduleContent, setScheduleContent] = useState('');
    const [scheduleDate, setScheduleDate] = useState('');
    const [scheduleTime, setScheduleTime] = useState('');
    const [scheduling, setScheduling] = useState(false);
    const [scheduleSuccess, setScheduleSuccess] = useState(null);

    const generateImage = async (imagePrompt) => {
        setImageLoading(true);
        setImageError(null);
        setImageUrl(null);

        try {
            const res = await fetch('/api/generate-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ prompt: imagePrompt })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.detail || 'Failed to generate image');

            setImageUrl(data.image_url);
        } catch (err) {
            setImageError(err.message);
        } finally {
            setImageLoading(false);
        }
    };

    const handleGenerate = async () => {
        if (!prompt.trim()) return;

        setLoading(true);
        setError(null);
        setGeneratedResults(null);
        setImageUrl(null);
        setImageError(null);

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

            const resultsBlank = data.results.map(r => ({ ...r, displayContent: '' }));
            setGeneratedResults(resultsBlank);

            data.results.forEach((result, platformIndex) => {
                let charIndex = 0;
                const typingInterval = setInterval(() => {
                    if (charIndex < result.content.length) {
                        setGeneratedResults(prev => {
                            if (!prev) return prev;
                            const next = [...prev];
                            next[platformIndex] = { ...next[platformIndex], displayContent: result.content.substring(0, charIndex + 1) };
                            return next;
                        });
                        charIndex += Math.max(1, Math.floor(result.content.length / 50));
                    } else {
                        setGeneratedResults(prev => {
                            if (!prev) return prev;
                            const next = [...prev];
                            next[platformIndex] = { ...next[platformIndex], displayContent: result.content };
                            return next;
                        });
                        clearInterval(typingInterval);
                    }
                }, 15);
            });

            // Start image generation in parallel
            generateImage(prompt);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveDraft = async (result) => {
        setSaveMsg(null);
        try {
            const res = await fetch('/api/save-draft', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ content: result.content, platform: result.platform })
            });
            if (!res.ok) throw new Error('Failed to save');
            setSaveMsg('Draft saved!');
            setTimeout(() => setSaveMsg(null), 2500);
        } catch (err) {
            setSaveMsg('Save failed: ' + err.message);
        }
    };

    const openScheduleModal = (result) => {
        setScheduleContent(result.content);
        const platformName = result.platform.split(' ')[0]; // e.g. "Instagram Caption" -> "Instagram"
        setSchedulePlatform(platformName);
        setScheduleDate('');
        setScheduleTime('');
        setScheduleSuccess(null);
        setScheduleModal(true);
    };

    const handleSchedule = async (e) => {
        e.preventDefault();
        if (!scheduleDate || !scheduleTime) return;

        setScheduling(true);

        try {
            const scheduled_time = new Date(`${scheduleDate}T${scheduleTime}:00`).toISOString();
            const res = await fetch('/api/schedule-post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    content: scheduleContent,
                    platform: schedulePlatform,
                    scheduled_time
                })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.detail || 'Schedule failed');
            setScheduleSuccess('Post scheduled successfully! 🎉');
            setTimeout(() => setScheduleModal(false), 1800);
        } catch (err) {
            setScheduleSuccess('Error: ' + err.message);
        } finally {
            setScheduling(false);
        }
    };

    const handleDownloadImage = async () => {
        if (!imageUrl) return;
        try {
            const res = await fetch(imageUrl);
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `autosocial-${Date.now()}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Download failed:', err);
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
                        Describe what you want to post about. AI will write platform-optimized copy and generate a stunning image.
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
                    maxHeight: 300
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

                {saveMsg && (
                    <div style={{
                        padding: '10px 16px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: saveMsg.startsWith('Error') ? 'rgba(239,68,68,0.1)' : 'rgba(34,197,94,0.1)',
                        border: `1px solid ${saveMsg.startsWith('Error') ? 'rgba(239,68,68,0.2)' : 'rgba(34,197,94,0.2)'}`,
                        color: saveMsg.startsWith('Error') ? '#ef4444' : '#22c55e',
                        fontSize: 13,
                    }}>
                        {saveMsg}
                    </div>
                )}

                {/* Generated Image Card */}
                <div style={{
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    overflow: 'hidden',
                }}>
                    <div style={{
                        padding: '12px 16px',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 100%)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 500, color: 'var(--color-bg-light)' }}>
                            <Image size={14} style={{ color: 'var(--color-accent)' }} />
                            AI Generated Image
                        </div>
                        {imageUrl && (
                            <div style={{ display: 'flex', gap: 6 }}>
                                <button onClick={() => generateImage(prompt)} title="Regenerate image"
                                    style={{ ...SmallBtnStyle, color: 'var(--color-accent)' }}>
                                    <RefreshCw size={12} />
                                </button>
                                <button onClick={handleDownloadImage} title="Download image"
                                    style={{ ...SmallBtnStyle, color: 'var(--color-accent)' }}>
                                    <Download size={12} />
                                </button>
                            </div>
                        )}
                    </div>

                    <div style={{ padding: 12, minHeight: 160 }}>
                        {!imageUrl && !imageLoading && !imageError && (
                            <div style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                height: 140, color: 'var(--color-muted)', gap: 8
                            }}>
                                <Image size={28} opacity={0.2} />
                                <span style={{ fontSize: 12 }}>Image will appear here after generation</span>
                            </div>
                        )}

                        {imageLoading && (
                            <div style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                height: 140, gap: 12
                            }}>
                                <div style={{
                                    width: '100%', height: 140, borderRadius: 'var(--radius-md)',
                                    background: 'linear-gradient(90deg, rgba(201,168,76,0.05) 25%, rgba(201,168,76,0.15) 50%, rgba(201,168,76,0.05) 75%)',
                                    backgroundSize: '200% 100%',
                                    animation: 'shimmer 1.5s ease-in-out infinite',
                                }} />
                                <span style={{ fontSize: 12, color: 'var(--color-accent)' }}>
                                    <Loader2 size={12} className="animate-spin" style={{ display: 'inline', marginRight: 6 }} />
                                    Generating image with FLUX.1...
                                </span>
                            </div>
                        )}

                        {imageError && (
                            <div style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                height: 140, gap: 10
                            }}>
                                <div style={{ color: '#ef4444', fontSize: 12, backgroundColor: 'rgba(239,68,68,0.1)', padding: '8px 12px', borderRadius: 4 }}>
                                    {imageError}
                                </div>
                                <button onClick={() => generateImage(prompt)}
                                    style={{ ...SmallBtnStyle, fontSize: 11, color: 'var(--color-accent)', gap: 4, display: 'flex', alignItems: 'center' }}>
                                    <RefreshCw size={10} /> Retry
                                </button>
                            </div>
                        )}

                        {imageUrl && (
                            <img
                                src={imageUrl}
                                alt="AI Generated"
                                style={{
                                    width: '100%',
                                    borderRadius: 'var(--radius-md)',
                                    objectFit: 'cover',
                                    maxHeight: 300,
                                    display: 'block',
                                }}
                            />
                        )}
                    </div>
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
                        <button disabled={!generatedResults} style={{ ...BtnStyle, opacity: !generatedResults ? 0.3 : 1 }}
                            onClick={() => generatedResults && handleSaveDraft(generatedResults[0])}>
                            <Save size={14} /> Draft
                        </button>
                        <button disabled={!generatedResults} style={{ ...BtnStyle, opacity: !generatedResults ? 0.3 : 1, color: 'var(--color-bg)', backgroundColor: 'var(--color-accent)', borderColor: 'var(--color-accent)' }}
                            onClick={() => generatedResults && openScheduleModal(generatedResults[0])}>
                            <Calendar size={14} /> Schedule
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
                                justifyContent: 'space-between',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 500, color: result.color || 'var(--color-bg-light)' }}>
                                    <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: result.color || 'var(--color-bg-light)' }} />
                                    {result.platform}
                                </div>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <button
                                        onClick={() => handleSaveDraft(result)}
                                        title="Save as draft"
                                        style={{ ...SmallBtnStyle }}>
                                        <Save size={12} />
                                    </button>
                                    <button
                                        onClick={() => openScheduleModal(result)}
                                        title="Schedule this post"
                                        style={{ ...SmallBtnStyle, color: 'var(--color-accent)' }}>
                                        <Clock size={12} />
                                    </button>
                                </div>
                            </div>
                            <textarea
                                value={result.displayContent}
                                onChange={(e) => {
                                    const next = [...generatedResults];
                                    next[idx] = { ...next[idx], displayContent: e.target.value, content: e.target.value };
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

            {/* Schedule Modal */}
            {scheduleModal && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 1000,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)',
                }} onClick={() => setScheduleModal(false)}>
                    <div onClick={e => e.stopPropagation()} style={{
                        width: '100%', maxWidth: 460,
                        background: 'linear-gradient(135deg, rgba(26,26,36,0.98) 0%, rgba(13,13,18,0.99) 100%)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 20, padding: '36px 32px',
                        position: 'relative',
                        boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
                    }}>
                        <button onClick={() => setScheduleModal(false)} style={{
                            position: 'absolute', top: 14, right: 14,
                            background: 'rgba(255,255,255,0.05)', border: 'none',
                            borderRadius: '50%', width: 30, height: 30, cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: 'var(--color-muted)'
                        }}>
                            <X size={14} />
                        </button>

                        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-bg-light)', marginBottom: 6, letterSpacing: '-0.02em' }}>
                            Schedule Post
                        </h2>
                        <p style={{ fontSize: 13, color: 'var(--color-muted)', marginBottom: 24 }}>
                            Choose when to publish this content
                        </p>

                        <form onSubmit={handleSchedule} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {/* Platform selector */}
                            <div>
                                <label style={{ fontSize: 12, color: 'var(--color-muted)', marginBottom: 6, display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Platform</label>
                                <select value={schedulePlatform} onChange={e => setSchedulePlatform(e.target.value)}
                                    style={{
                                        width: '100%', padding: '12px 14px',
                                        borderRadius: 'var(--radius-md)',
                                        background: 'rgba(255,255,255,0.04)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        color: 'var(--color-bg-light)',
                                        fontSize: 14, outline: 'none', cursor: 'pointer'
                                    }}>
                                    {['Instagram', 'Twitter', 'LinkedIn'].map(p => (
                                        <option key={p} value={p} style={{ backgroundColor: '#1a1a24' }}>{p}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Content preview */}
                            <div>
                                <label style={{ fontSize: 12, color: 'var(--color-muted)', marginBottom: 6, display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Content</label>
                                <textarea
                                    value={scheduleContent}
                                    onChange={e => setScheduleContent(e.target.value)}
                                    rows={4}
                                    style={{
                                        width: '100%', padding: '12px 14px',
                                        borderRadius: 'var(--radius-md)',
                                        background: 'rgba(255,255,255,0.04)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        color: 'var(--color-bg-light)',
                                        fontSize: 13, lineHeight: 1.6, resize: 'vertical', outline: 'none'
                                    }}
                                />
                            </div>

                            {/* Date & Time */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                <div>
                                    <label style={{ fontSize: 12, color: 'var(--color-muted)', marginBottom: 6, display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date</label>
                                    <input type="date" value={scheduleDate} onChange={e => setScheduleDate(e.target.value)} required
                                        style={{
                                            width: '100%', padding: '12px 14px',
                                            borderRadius: 'var(--radius-md)',
                                            background: 'rgba(255,255,255,0.04)',
                                            border: '1px solid rgba(255,255,255,0.08)',
                                            color: 'var(--color-bg-light)',
                                            fontSize: 14, outline: 'none', colorScheme: 'dark'
                                        }} />
                                </div>
                                <div>
                                    <label style={{ fontSize: 12, color: 'var(--color-muted)', marginBottom: 6, display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Time</label>
                                    <input type="time" value={scheduleTime} onChange={e => setScheduleTime(e.target.value)} required
                                        style={{
                                            width: '100%', padding: '12px 14px',
                                            borderRadius: 'var(--radius-md)',
                                            background: 'rgba(255,255,255,0.04)',
                                            border: '1px solid rgba(255,255,255,0.08)',
                                            color: 'var(--color-bg-light)',
                                            fontSize: 14, outline: 'none', colorScheme: 'dark'
                                        }} />
                                </div>
                            </div>

                            {scheduleSuccess && (
                                <div style={{
                                    padding: '10px 14px',
                                    borderRadius: 'var(--radius-sm)',
                                    backgroundColor: scheduleSuccess.startsWith('Error') ? 'rgba(239,68,68,0.1)' : 'rgba(34,197,94,0.1)',
                                    border: `1px solid ${scheduleSuccess.startsWith('Error') ? 'rgba(239,68,68,0.2)' : 'rgba(34,197,94,0.2)'}`,
                                    color: scheduleSuccess.startsWith('Error') ? '#ef4444' : '#22c55e',
                                    fontSize: 13,
                                }}>
                                    {scheduleSuccess}
                                </div>
                            )}

                            <button type="submit" disabled={scheduling} className="magnetic-btn"
                                style={{ width: '100%', justifyContent: 'center', marginTop: 4, opacity: scheduling ? 0.7 : 1 }}>
                                {scheduling ? <Loader2 size={16} className="animate-spin" /> : <Calendar size={16} />}
                                {scheduling ? 'Scheduling...' : 'Schedule Post'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
            `}</style>
        </div>
    );
}

const BtnStyle = {
    display: 'flex', alignItems: 'center', gap: 6,
    padding: '6px 14px', fontSize: 12, fontWeight: 500,
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: 'var(--color-bg-light)',
    borderRadius: 'var(--radius-sm)', cursor: 'pointer', transition: 'all 0.2s',
};

const SmallBtnStyle = {
    background: 'none', border: 'none',
    color: 'var(--color-muted)', cursor: 'pointer',
    padding: 4, borderRadius: 4,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'color 0.2s',
};
