'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Twitter, Linkedin, Facebook, FileText } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const platforms = [
    { name: 'Instagram', icon: Instagram, color: '#E4405F', bg: 'rgba(228,64,95,0.12)' },
    { name: 'Twitter / X', icon: Twitter, color: '#1DA1F2', bg: 'rgba(29,161,242,0.12)' },
    { name: 'LinkedIn', icon: Linkedin, color: '#0A66C2', bg: 'rgba(10,102,194,0.12)' },
    { name: 'Facebook', icon: Facebook, color: '#1877F2', bg: 'rgba(24,119,242,0.12)' },
];

export default function PlatformFlow() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate center post card
            gsap.from('.flow-center', {
                scale: 0.8,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 65%',
                    toggleActions: 'play none none reverse',
                },
            });

            // Animate connection lines
            gsap.from('.flow-connection', {
                scaleX: 0,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 60%',
                    toggleActions: 'play none none reverse',
                },
            });

            // Animate platform cards
            gsap.from('.flow-platform', {
                y: 30,
                opacity: 0,
                duration: 0.7,
                stagger: 0.12,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 55%',
                    toggleActions: 'play none none reverse',
                },
            });

            // Animated flowing dots
            gsap.to('.flow-pulse', {
                x: 60,
                opacity: 0,
                duration: 1.5,
                repeat: -1,
                stagger: 0.3,
                ease: 'power1.in',
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="features" className="section">
            <div className="section-container">
                <SectionHeading
                    label="Multi-Platform"
                    title="One post."
                    titleAccent="Every platform."
                    description="Create once, publish everywhere. AutoSocial AI optimizes your content for each platform's unique format and audience."
                />

                {/* Flow diagram */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 0,
                        flexDirection: 'column',
                        maxWidth: 900,
                        margin: '0 auto',
                    }}
                >
                    {/* Center post card */}
                    <div
                        className="flow-center glass-card"
                        style={{
                            padding: '28px 36px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 16,
                            marginBottom: 48,
                        }}
                    >
                        <div
                            style={{
                                width: 44,
                                height: 44,
                                borderRadius: 'var(--radius-sm)',
                                background: 'rgba(201, 168, 76, 0.15)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                            }}
                        >
                            <FileText size={20} color="var(--color-accent)" />
                        </div>
                        <div>
                            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Your Content</div>
                            <div style={{ fontSize: 13, color: 'var(--color-muted)' }}>One post, optimized for all platforms</div>
                        </div>
                    </div>

                    {/* Connection lines */}
                    <div
                        style={{
                            width: 2,
                            height: 40,
                            background: 'linear-gradient(180deg, var(--color-accent) 0%, rgba(201,168,76,0.2) 100%)',
                            marginBottom: 8,
                            position: 'relative',
                        }}
                        className="flow-connection"
                    />

                    {/* Distribution arrow */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 0,
                            marginBottom: 8,
                            width: '100%',
                            maxWidth: 600,
                            position: 'relative',
                        }}
                    >
                        <div
                            className="flow-connection"
                            style={{
                                height: 2,
                                flex: 1,
                                background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)',
                                transformOrigin: 'center',
                            }}
                        />
                    </div>

                    {/* Platform cards */}
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            gap: 16,
                            width: '100%',
                            maxWidth: 700,
                        }}
                    >
                        {platforms.map((platform) => (
                            <div
                                key={platform.name}
                                className="flow-platform glass-card"
                                style={{
                                    padding: '24px 16px',
                                    textAlign: 'center',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 12,
                                    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease',
                                    cursor: 'pointer',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-6px)';
                                    e.currentTarget.style.borderColor = `${platform.color}40`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                                }}
                            >
                                {/* Connection dot */}
                                <div
                                    style={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: '50%',
                                        background: platform.color,
                                        marginBottom: 4,
                                        boxShadow: `0 0 12px ${platform.color}40`,
                                    }}
                                />
                                <div
                                    style={{
                                        width: 52,
                                        height: 52,
                                        borderRadius: 'var(--radius-md)',
                                        background: platform.bg,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <platform.icon size={24} color={platform.color} />
                                </div>
                                <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '-0.01em' }}>
                                    {platform.name}
                                </span>
                                <span
                                    style={{
                                        fontSize: 11,
                                        fontFamily: 'var(--font-mono)',
                                        color: '#4ade80',
                                        padding: '3px 10px',
                                        borderRadius: 12,
                                        background: 'rgba(74, 222, 128, 0.08)',
                                    }}
                                >
                                    Connected
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
