'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Twitter, Linkedin, Sparkles, Hash, Send } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const AI_OUTPUTS = [
    {
        platform: 'Instagram',
        icon: Instagram,
        color: '#E4405F',
        content: '☕ Start your morning right! Our house blend is crafted from ethically sourced beans, roasted to perfection. Come taste the difference at our cozy corner shop. Your new favorite cup awaits! ✨',
        hashtags: '#CoffeeLovers #LocalCafe #MorningBrew #CoffeeShop #Barista',
    },
    {
        platform: 'Twitter / X',
        icon: Twitter,
        color: '#1DA1F2',
        content: 'Your morning ritual, elevated. ☕ Our single-origin pour-over is turning heads (and waking up taste buds). Swing by and let us make your day. →',
        hashtags: null,
    },
    {
        platform: 'LinkedIn',
        icon: Linkedin,
        color: '#0A66C2',
        content: 'At our coffee shop, we believe great coffee builds great conversations. We\'re proud to support local farmers and bring you a premium experience in every cup. Visit us this week — business meetings taste better here.',
        hashtags: null,
    },
];

export default function AIDemoSection() {
    const sectionRef = useRef(null);
    const [typedText, setTypedText] = useState('');
    const [showOutputs, setShowOutputs] = useState(false);
    const [hasTriggered, setHasTriggered] = useState(false);
    const fullPrompt = 'Promote my coffee shop';

    useEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top 60%',
                onEnter: () => {
                    if (!hasTriggered) {
                        setHasTriggered(true);
                        startTyping();
                    }
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [hasTriggered]);

    const startTyping = () => {
        let i = 0;
        const interval = setInterval(() => {
            setTypedText(fullPrompt.slice(0, i + 1));
            i++;
            if (i >= fullPrompt.length) {
                clearInterval(interval);
                setTimeout(() => {
                    setShowOutputs(true);
                }, 600);
            }
        }, 60);
    };

    useEffect(() => {
        if (showOutputs && sectionRef.current) {
            gsap.from(sectionRef.current.querySelectorAll('.ai-output-card'), {
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
            });
        }
    }, [showOutputs]);

    return (
        <section ref={sectionRef} id="demo" className="section">
            <div className="section-container">
                <SectionHeading
                    label="AI Generation"
                    title="Type a prompt."
                    titleAccent="Watch AI create."
                    description="One simple instruction generates platform-optimized content for every social network — captions, hashtags, and tone, all tailored automatically."
                />

                {/* Input Demo */}
                <div style={{ maxWidth: 720, margin: '0 auto 48px' }}>
                    <GlassCard style={{ padding: '24px 28px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                            <Sparkles size={16} color="var(--color-accent)" />
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-accent)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                                AI Prompt
                            </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div
                                style={{
                                    flex: 1,
                                    padding: '16px 20px',
                                    borderRadius: 'var(--radius-md)',
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.06)',
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: 15,
                                    color: 'var(--color-bg-light)',
                                    minHeight: 52,
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                {typedText}
                                <span className="typing-cursor" />
                            </div>
                            <button
                                style={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: 'var(--radius-md)',
                                    background: typedText.length === fullPrompt.length ? 'var(--color-accent)' : 'rgba(255,255,255,0.06)',
                                    border: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    flexShrink: 0,
                                }}
                            >
                                <Send size={18} color={typedText.length === fullPrompt.length ? 'var(--color-primary)' : 'var(--color-muted)'} />
                            </button>
                        </div>
                    </GlassCard>
                </div>

                {/* AI Output Cards */}
                {showOutputs && (
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                            gap: 20,
                            maxWidth: 1100,
                            margin: '0 auto',
                        }}
                    >
                        {AI_OUTPUTS.map((output) => (
                            <div key={output.platform} className="ai-output-card">
                                <GlassCard hoverable style={{ padding: 28, height: '100%' }}>
                                    {/* Platform header */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                                        <div
                                            style={{
                                                width: 36,
                                                height: 36,
                                                borderRadius: 'var(--radius-sm)',
                                                background: `${output.color}15`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <output.icon size={18} color={output.color} />
                                        </div>
                                        <span style={{ fontWeight: 600, fontSize: 14 }}>{output.platform}</span>
                                        <span
                                            style={{
                                                marginLeft: 'auto',
                                                fontSize: 11,
                                                fontFamily: 'var(--font-mono)',
                                                color: '#4ade80',
                                                padding: '3px 10px',
                                                borderRadius: 12,
                                                background: 'rgba(74, 222, 128, 0.1)',
                                            }}
                                        >
                                            Generated
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(250,248,245,0.8)', marginBottom: output.hashtags ? 16 : 0 }}>
                                        {output.content}
                                    </p>

                                    {/* Hashtags */}
                                    {output.hashtags && (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                                            <Hash size={12} color="var(--color-accent)" />
                                            <span style={{ fontSize: 12, color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}>
                                                {output.hashtags}
                                            </span>
                                        </div>
                                    )}
                                </GlassCard>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
