'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Rocket, Instagram, Twitter, Linkedin, Clock, Sparkles } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const CAMPAIGN_DAYS = [
    {
        day: 1,
        title: 'Product Teaser',
        platform: 'Instagram',
        platformIcon: Instagram,
        platformColor: '#E4405F',
        time: '10:00 AM',
        caption: '✨ Something exciting is coming... Stay tuned for a game-changing announcement this week!',
    },
    {
        day: 2,
        title: 'Behind the Scenes',
        platform: 'Twitter / X',
        platformIcon: Twitter,
        platformColor: '#1DA1F2',
        time: '12:00 PM',
        caption: 'We\'ve been working on something special for months. The team is putting in the final touches. 🔥 Drop a 💡 if you\'re curious!',
    },
    {
        day: 3,
        title: 'Feature Spotlight',
        platform: 'LinkedIn',
        platformIcon: Linkedin,
        platformColor: '#0A66C2',
        time: '9:00 AM',
        caption: 'We\'re solving a problem that affects millions of professionals. Here\'s a sneak peek at how our new product changes the game...',
    },
    {
        day: 4,
        title: 'User Testimonial',
        platform: 'Instagram',
        platformIcon: Instagram,
        platformColor: '#E4405F',
        time: '3:00 PM',
        caption: '"This product changed how I work. I save 10 hours every week." — Early beta tester 🙌',
    },
    {
        day: 5,
        title: 'Launch Countdown',
        platform: 'Twitter / X',
        platformIcon: Twitter,
        platformColor: '#1DA1F2',
        time: '11:00 AM',
        caption: '2 days until launch! 🚀 Pre-register now to get exclusive early access + a special launch-day offer →',
    },
    {
        day: 6,
        title: 'Final Teaser',
        platform: 'Instagram',
        platformIcon: Instagram,
        platformColor: '#E4405F',
        time: '6:00 PM',
        caption: 'Tomorrow is the day. The product that will transform your workflow is almost here. Last chance to sign up for early access! 🎯',
    },
    {
        day: 7,
        title: 'Launch Day! 🚀',
        platform: 'All Platforms',
        platformIcon: Rocket,
        platformColor: 'var(--color-accent)',
        time: '9:00 AM',
        caption: 'IT\'S HERE! 🎉 Introducing [Product Name] — the future of productivity. Available now with an exclusive 20% launch discount. Link in bio →',
    },
];

export default function CampaignBuilder() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.campaign-prompt', {
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 65%',
                    toggleActions: 'play none none reverse',
                },
            });

            gsap.from('.campaign-day', {
                x: -30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.campaign-timeline',
                    start: 'top 70%',
                    toggleActions: 'play none none reverse',
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="section">
            <div className="section-container">
                <SectionHeading
                    label="Campaign Builder"
                    title="One prompt."
                    titleAccent="7-day strategy."
                    description="Tell AI your goal. It creates a complete multi-platform campaign with optimized posts, timing, and platform selection."
                />

                {/* Prompt Card */}
                <div style={{ maxWidth: 700, margin: '0 auto 48px' }}>
                    <GlassCard className="campaign-prompt" style={{ padding: '24px 28px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                            <Sparkles size={16} color="var(--color-accent)" />
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-accent)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                                Campaign Prompt
                            </span>
                        </div>
                        <div
                            style={{
                                padding: '16px 20px',
                                borderRadius: 'var(--radius-md)',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.06)',
                                fontFamily: 'var(--font-mono)',
                                fontSize: 15,
                                color: 'var(--color-bg-light)',
                            }}
                        >
                            &ldquo;Launch my new product&rdquo;
                        </div>
                        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80' }} />
                            <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: '#4ade80' }}>
                                7-day campaign generated
                            </span>
                        </div>
                    </GlassCard>
                </div>

                {/* Campaign Timeline */}
                <div className="campaign-timeline" style={{ maxWidth: 700, margin: '0 auto' }}>
                    {CAMPAIGN_DAYS.map((item) => (
                        <div
                            key={item.day}
                            className={`campaign-day ${item.day === 7 ? 'active' : ''}`}
                        >
                            <div style={{ marginLeft: 16 }}>
                                {/* Day header */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                                    <span
                                        style={{
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: 11,
                                            fontWeight: 600,
                                            color: 'var(--color-accent)',
                                            letterSpacing: '0.05em',
                                            textTransform: 'uppercase',
                                        }}
                                    >
                                        Day {item.day}
                                    </span>
                                    <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-bg-light)' }}>
                                        {item.title}
                                    </span>
                                </div>

                                <GlassCard style={{ padding: 20, marginBottom: 16 }}>
                                    {/* Platform + Time */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                                        <div
                                            style={{
                                                width: 28,
                                                height: 28,
                                                borderRadius: 6,
                                                background: `${item.platformColor}15`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <item.platformIcon size={14} color={item.platformColor} />
                                        </div>
                                        <span style={{ fontSize: 13, fontWeight: 600 }}>{item.platform}</span>
                                        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--color-muted)' }}>
                                            <Clock size={12} />
                                            {item.time}
                                        </div>
                                    </div>

                                    {/* Caption */}
                                    <p style={{ fontSize: 13, lineHeight: 1.7, color: 'rgba(250,248,245,0.7)' }}>
                                        {item.caption}
                                    </p>
                                </GlassCard>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
