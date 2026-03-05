'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function SectionHeading({ label, title, titleAccent, description, align = 'center' }) {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(containerRef.current.querySelectorAll('.sh-animate'), {
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                textAlign: align,
                marginBottom: 64,
                maxWidth: align === 'center' ? 720 : undefined,
                marginLeft: align === 'center' ? 'auto' : undefined,
                marginRight: align === 'center' ? 'auto' : undefined,
            }}
        >
            {label && (
                <div
                    className="sh-animate"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        marginBottom: 20,
                        padding: '6px 16px',
                        borderRadius: 20,
                        background: 'rgba(201, 168, 76, 0.1)',
                        border: '1px solid rgba(201, 168, 76, 0.15)',
                    }}
                >
                    <span
                        style={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: 'var(--color-accent)',
                        }}
                    />
                    <span
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: 12,
                            fontWeight: 500,
                            color: 'var(--color-accent)',
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                        }}
                    >
                        {label}
                    </span>
                </div>
            )}
            <h2
                className="sh-animate"
                style={{
                    fontSize: 'clamp(32px, 5vw, 52px)',
                    fontWeight: 800,
                    lineHeight: 1.1,
                    letterSpacing: '-0.03em',
                    marginBottom: 20,
                    color: 'var(--color-bg-light)',
                }}
            >
                {title}
                {titleAccent && (
                    <span
                        className="text-gradient-accent"
                        style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontWeight: 400 }}
                    >
                        {' '}{titleAccent}
                    </span>
                )}
            </h2>
            {description && (
                <p
                    className="sh-animate"
                    style={{
                        fontSize: 'clamp(16px, 2vw, 18px)',
                        lineHeight: 1.7,
                        color: 'var(--color-muted)',
                        maxWidth: 560,
                        marginLeft: align === 'center' ? 'auto' : undefined,
                        marginRight: align === 'center' ? 'auto' : undefined,
                    }}
                >
                    {description}
                </p>
            )}
        </div>
    );
}
