'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronDown } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';
import Link from 'next/link';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
    const heroRef = useRef(null);
    const orbRef1 = useRef(null);
    const orbRef2 = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            tl.from('.hero-label', { y: 30, opacity: 0, duration: 0.8, delay: 0.3 })
                .from('.hero-title-line', { y: 60, opacity: 0, duration: 1, stagger: 0.12 }, '-=0.4')
                .from('.hero-subtitle', { y: 30, opacity: 0, duration: 0.8 }, '-=0.5')
                .from('.hero-cta', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.3')
                .from('.hero-stats', { y: 20, opacity: 0, duration: 0.6 }, '-=0.2')
                .from('.scroll-indicator', { opacity: 0, duration: 0.6 }, '-=0.1');

            // Floating orbs animation
            gsap.to(orbRef1.current, {
                x: 30,
                y: -20,
                duration: 6,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            });

            gsap.to(orbRef2.current, {
                x: -20,
                y: 30,
                duration: 8,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            });

            // Parallax on scroll
            gsap.to('.hero-content', {
                y: -80,
                opacity: 0.3,
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1,
                },
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={heroRef}
            id="hero"
            style={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
            }}
        >
            {/* Animated gradient background */}
            <div className="hero-gradient">
                <div
                    ref={orbRef1}
                    className="hero-gradient-orb"
                    style={{
                        width: 500,
                        height: 500,
                        top: '-10%',
                        right: '10%',
                        background: 'radial-gradient(circle, rgba(201, 168, 76, 0.12) 0%, transparent 70%)',
                    }}
                />
                <div
                    ref={orbRef2}
                    className="hero-gradient-orb"
                    style={{
                        width: 400,
                        height: 400,
                        bottom: '10%',
                        left: '5%',
                        background: 'radial-gradient(circle, rgba(201, 168, 76, 0.08) 0%, transparent 70%)',
                    }}
                />
            </div>

            {/* Content */}
            <div
                className="hero-content"
                style={{
                    position: 'relative',
                    zIndex: 2,
                    textAlign: 'center',
                    padding: '0 24px',
                    maxWidth: 900,
                }}
            >
                {/* Label */}
                <div
                    className="hero-label"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        marginBottom: 32,
                        padding: '8px 20px',
                        borderRadius: 24,
                        background: 'rgba(201, 168, 76, 0.08)',
                        border: '1px solid rgba(201, 168, 76, 0.12)',
                    }}
                >
                    <span
                        style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: 'var(--color-accent)',
                            animation: 'pulse 2s ease-in-out infinite',
                        }}
                    />
                    <span
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: 13,
                            fontWeight: 500,
                            color: 'var(--color-accent)',
                            letterSpacing: '0.03em',
                        }}
                    >
                        AI-Powered Social Media Automation
                    </span>
                </div>

                {/* Main Headline */}
                <h1 style={{ marginBottom: 28 }}>
                    <span
                        className="hero-title-line"
                        style={{
                            display: 'block',
                            fontSize: 'clamp(40px, 8vw, 82px)',
                            fontWeight: 900,
                            lineHeight: 1.05,
                            letterSpacing: '-0.04em',
                            color: 'var(--color-bg-light)',
                        }}
                    >
                        Automate Your
                    </span>
                    <span
                        className="hero-title-line"
                        style={{
                            display: 'block',
                            fontSize: 'clamp(40px, 8vw, 82px)',
                            fontWeight: 900,
                            lineHeight: 1.05,
                            letterSpacing: '-0.04em',
                        }}
                    >
                        <span className="text-gradient-accent" style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontWeight: 700 }}>
                            Social Media.
                        </span>
                    </span>
                </h1>

                {/* Subtitle */}
                <p
                    className="hero-subtitle"
                    style={{
                        fontSize: 'clamp(16px, 2.2vw, 20px)',
                        lineHeight: 1.7,
                        color: 'var(--color-muted)',
                        maxWidth: 600,
                        margin: '0 auto 44px',
                    }}
                >
                    AI that writes, schedules, and analyzes your entire social media strategy — across every platform, automatically.
                </p>

                {/* CTAs */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 16,
                        flexWrap: 'wrap',
                    }}
                >
                    <div className="hero-cta">
                        <Link href="/app/create-post" passHref legacyBehavior>
                            <MagneticButton>
                                Start Automating <ArrowRight size={16} />
                            </MagneticButton>
                        </Link>
                    </div>
                    <div className="hero-cta">
                        <MagneticButton variant="outline">
                            Watch Demo
                        </MagneticButton>
                    </div>
                </div>

                {/* Stats */}
                <div
                    className="hero-stats"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 48,
                        marginTop: 64,
                        flexWrap: 'wrap',
                    }}
                >
                    {[
                        { value: '50K+', label: 'Posts Generated' },
                        { value: '12K+', label: 'Active Users' },
                        { value: '4', label: 'Platforms' },
                    ].map((stat) => (
                        <div key={stat.label} style={{ textAlign: 'center' }}>
                            <div
                                style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: 24,
                                    fontWeight: 700,
                                    color: 'var(--color-accent)',
                                    letterSpacing: '-0.02em',
                                }}
                            >
                                {stat.value}
                            </div>
                            <div
                                style={{
                                    fontSize: 13,
                                    color: 'var(--color-muted)',
                                    marginTop: 4,
                                    letterSpacing: '0.02em',
                                }}
                            >
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="scroll-indicator">
                <div className="scroll-indicator-dot" />
                <div className="scroll-indicator-line" />
            </div>

            <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
      `}</style>
        </section>
    );
}
