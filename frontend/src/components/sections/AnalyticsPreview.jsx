'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, Heart, MessageCircle, Users, ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

function AnimatedCounter({ target, duration = 2000, prefix = '', suffix = '' }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const hasStarted = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasStarted.current) {
                    hasStarted.current = true;
                    const startTime = Date.now();
                    const animate = () => {
                        const elapsed = Date.now() - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        setCount(Math.floor(eased * target));
                        if (progress < 1) requestAnimationFrame(animate);
                    };
                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target, duration]);

    return (
        <span ref={ref}>
            {prefix}{count.toLocaleString()}{suffix}
        </span>
    );
}

const STATS = [
    { icon: Heart, label: 'Total Likes', value: 24680, suffix: '', change: '+12.4%', color: '#E4405F' },
    { icon: MessageCircle, label: 'Comments', value: 3842, suffix: '', change: '+8.7%', color: '#1DA1F2' },
    { icon: Users, label: 'Followers', value: 15230, suffix: '', change: '+22.1%', color: '#4ade80' },
    { icon: TrendingUp, label: 'Engagement', value: 94, suffix: '%', change: '+5.2%', color: 'var(--color-accent)' },
];

const CHART_DATA = [
    { month: 'Sep', engagement: 35, followers: 20, likes: 45 },
    { month: 'Oct', engagement: 42, followers: 35, likes: 52 },
    { month: 'Nov', engagement: 38, followers: 45, likes: 48 },
    { month: 'Dec', engagement: 55, followers: 52, likes: 65 },
    { month: 'Jan', engagement: 62, followers: 68, likes: 72 },
    { month: 'Feb', engagement: 78, followers: 75, likes: 85 },
    { month: 'Mar', engagement: 92, followers: 88, likes: 95 },
];

function MiniChart({ data, dataKey, color, height = 120 }) {
    const maxVal = Math.max(...data.map(d => d[dataKey]));
    const points = data.map((d, i) => ({
        x: (i / (data.length - 1)) * 100,
        y: 100 - (d[dataKey] / maxVal) * 100,
    }));

    const pathD = points
        .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
        .join(' ');

    const areaD = pathD + ` L 100 100 L 0 100 Z`;

    return (
        <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ width: '100%', height, display: 'block' }}
        >
            <defs>
                <linearGradient id={`grad-${dataKey}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
            </defs>
            <path d={areaD} fill={`url(#grad-${dataKey})`} />
            <path d={pathD} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" />
            {/* Last point dot */}
            <circle
                cx={points[points.length - 1].x}
                cy={points[points.length - 1].y}
                r="3"
                fill={color}
                style={{ filter: `drop-shadow(0 0 4px ${color})` }}
            />
        </svg>
    );
}

export default function AnalyticsPreview() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.stat-card', {
                y: 30,
                opacity: 0,
                duration: 0.7,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 65%',
                    toggleActions: 'play none none reverse',
                },
            });

            gsap.from('.chart-section', {
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.chart-section',
                    start: 'top 70%',
                    toggleActions: 'play none none reverse',
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="analytics" className="section">
            <div className="section-container">
                <SectionHeading
                    label="Analytics Intelligence"
                    title="Know what's"
                    titleAccent="working."
                    description="Real-time analytics across all platforms. AI identifies trends, predicts outcomes, and recommends strategy adjustments."
                />

                {/* Stats Grid */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: 16,
                        maxWidth: 1000,
                        margin: '0 auto 32px',
                    }}
                >
                    {STATS.map((stat) => (
                        <GlassCard key={stat.label} className="stat-card" hoverable style={{ padding: 24 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                                <div
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 'var(--radius-sm)',
                                        background: `${stat.color}15`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <stat.icon size={18} color={stat.color} />
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 4,
                                        fontSize: 12,
                                        fontWeight: 600,
                                        color: '#4ade80',
                                        fontFamily: 'var(--font-mono)',
                                    }}
                                >
                                    <ArrowUpRight size={14} />
                                    {stat.change}
                                </div>
                            </div>
                            <div
                                style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: 28,
                                    fontWeight: 700,
                                    letterSpacing: '-0.02em',
                                    marginBottom: 4,
                                }}
                            >
                                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                            </div>
                            <div style={{ fontSize: 13, color: 'var(--color-muted)' }}>{stat.label}</div>
                        </GlassCard>
                    ))}
                </div>

                {/* Charts */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: 16,
                        maxWidth: 1000,
                        margin: '0 auto',
                    }}
                >
                    <GlassCard className="chart-section" style={{ padding: 28 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Engagement Rate</div>
                                <div style={{ fontSize: 12, color: 'var(--color-muted)' }}>Last 7 months</div>
                            </div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 700, color: 'var(--color-accent)' }}>
                                92%
                            </div>
                        </div>
                        <MiniChart data={CHART_DATA} dataKey="engagement" color="var(--color-accent)" height={140} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                            {CHART_DATA.map(d => (
                                <span key={d.month} style={{ fontSize: 10, color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}>
                                    {d.month}
                                </span>
                            ))}
                        </div>
                    </GlassCard>

                    <GlassCard className="chart-section" style={{ padding: 28 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Follower Growth</div>
                                <div style={{ fontSize: 12, color: 'var(--color-muted)' }}>Last 7 months</div>
                            </div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 700, color: '#4ade80' }}>
                                +340%
                            </div>
                        </div>
                        <MiniChart data={CHART_DATA} dataKey="followers" color="#4ade80" height={140} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                            {CHART_DATA.map(d => (
                                <span key={d.month} style={{ fontSize: 10, color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}>
                                    {d.month}
                                </span>
                            ))}
                        </div>
                    </GlassCard>
                </div>
            </div>
        </section>
    );
}
