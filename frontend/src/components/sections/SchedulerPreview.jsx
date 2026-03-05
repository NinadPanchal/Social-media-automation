'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Clock, CheckCircle } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const SCHEDULED_POSTS = [
    { day: 3, time: '9:00 AM', platform: 'Instagram', caption: 'New product showcase', color: '#E4405F' },
    { day: 5, time: '12:00 PM', platform: 'Twitter', caption: 'Weekly industry insight', color: '#1DA1F2' },
    { day: 8, time: '3:00 PM', platform: 'LinkedIn', caption: 'Company milestone update', color: '#0A66C2' },
    { day: 10, time: '10:00 AM', platform: 'Instagram', caption: 'Behind the scenes', color: '#E4405F' },
    { day: 12, time: '2:00 PM', platform: 'Facebook', caption: 'Customer testimonial', color: '#1877F2' },
    { day: 15, time: '11:00 AM', platform: 'Twitter', caption: 'Product tip of the week', color: '#1DA1F2' },
    { day: 18, time: '4:00 PM', platform: 'LinkedIn', caption: 'Team spotlight feature', color: '#0A66C2' },
    { day: 22, time: '9:00 AM', platform: 'Instagram', caption: 'Weekend promotion', color: '#E4405F' },
];

const postDays = new Set(SCHEDULED_POSTS.map(p => p.day));

export default function SchedulerPreview() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.scheduler-card', {
                y: 60,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 65%',
                    toggleActions: 'play none none reverse',
                },
            });

            gsap.from('.timeline-item', {
                x: -30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.timeline-container',
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
                    label="Smart Scheduler"
                    title="Set it."
                    titleAccent="Forget it."
                    description="AI analyzes your audience to find the perfect posting times. Schedule weeks ahead — your content publishes automatically."
                />

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr',
                        gap: 24,
                        maxWidth: 1000,
                        margin: '0 auto',
                    }}
                >
                    {/* Calendar */}
                    <GlassCard className="scheduler-card" style={{ padding: 32 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                            <Calendar size={18} color="var(--color-accent)" />
                            <span style={{ fontWeight: 700, fontSize: 16 }}>March 2026</span>
                            <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-muted)' }}>
                                {SCHEDULED_POSTS.length} posts scheduled
                            </span>
                        </div>

                        {/* Day headers */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 8 }}>
                            {DAYS.map(d => (
                                <div key={d} style={{ textAlign: 'center', fontSize: 11, color: 'var(--color-muted)', fontWeight: 600, padding: '8px 0', letterSpacing: '0.05em' }}>
                                    {d}
                                </div>
                            ))}
                        </div>

                        {/* Calendar grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
                            {/* Empty cells for offset (March 2026 starts on Sunday) */}
                            {[...Array(6)].map((_, i) => (
                                <div key={`empty-${i}`} className="calendar-cell" />
                            ))}
                            {/* Days */}
                            {[...Array(28)].map((_, i) => {
                                const day = i + 1;
                                const hasPost = postDays.has(day);
                                return (
                                    <div
                                        key={day}
                                        className={`calendar-cell ${hasPost ? 'has-post active' : ''}`}
                                        style={{
                                            color: hasPost ? 'var(--color-bg-light)' : undefined,
                                            fontWeight: hasPost ? 600 : undefined,
                                        }}
                                    >
                                        {day}
                                    </div>
                                );
                            })}
                        </div>
                    </GlassCard>

                    {/* Timeline */}
                    <GlassCard className="scheduler-card timeline-container" style={{ padding: 32 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                            <Clock size={18} color="var(--color-accent)" />
                            <span style={{ fontWeight: 700, fontSize: 16 }}>Upcoming Posts</span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {SCHEDULED_POSTS.slice(0, 5).map((post, i) => (
                                <div
                                    key={i}
                                    className="timeline-item"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 16,
                                        padding: '14px 18px',
                                        borderRadius: 'var(--radius-md)',
                                        background: 'rgba(255,255,255,0.02)',
                                        border: '1px solid rgba(255,255,255,0.04)',
                                        transition: 'background 0.3s ease',
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
                                    onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                                >
                                    <div
                                        style={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: '50%',
                                            background: post.color,
                                            flexShrink: 0,
                                            boxShadow: `0 0 8px ${post.color}40`,
                                        }}
                                    />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{post.caption}</div>
                                        <div style={{ fontSize: 12, color: 'var(--color-muted)' }}>
                                            {post.platform} · Mar {post.day} · {post.time}
                                        </div>
                                    </div>
                                    <CheckCircle size={16} color="#4ade80" style={{ opacity: 0.5 }} />
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                </div>
            </div>
        </section>
    );
}
