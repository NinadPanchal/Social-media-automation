'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function CTASection() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.cta-content', {
                y: 40,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse',
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            style={{
                position: 'relative',
                padding: '120px 0',
                overflow: 'hidden',
            }}
        >
            {/* Background gradient */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201, 168, 76, 0.08) 0%, transparent 70%)',
                }}
            />

            <div className="section-container cta-content" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                {/* Accent line */}
                <div
                    style={{
                        width: 60,
                        height: 3,
                        background: 'var(--color-accent)',
                        borderRadius: 2,
                        margin: '0 auto 40px',
                    }}
                />

                <h2
                    style={{
                        fontSize: 'clamp(32px, 6vw, 56px)',
                        fontWeight: 800,
                        lineHeight: 1.1,
                        letterSpacing: '-0.03em',
                        marginBottom: 20,
                    }}
                >
                    Start Automating
                    <br />
                    <span
                        className="text-gradient-accent"
                        style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontWeight: 700 }}
                    >
                        Today.
                    </span>
                </h2>

                <p
                    style={{
                        fontSize: 'clamp(16px, 2vw, 18px)',
                        color: 'var(--color-muted)',
                        lineHeight: 1.7,
                        maxWidth: 480,
                        margin: '0 auto 40px',
                    }}
                >
                    Join thousands of brands using AI to transform their social media presence. Free to start. No credit card required.
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
                    <MagneticButton>
                        Get Started Free <ArrowRight size={16} />
                    </MagneticButton>
                    <MagneticButton variant="outline">
                        Talk to Sales
                    </MagneticButton>
                </div>
            </div>
        </section>
    );
}
