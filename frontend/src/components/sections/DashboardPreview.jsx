'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    LayoutDashboard, PenSquare, Sparkles, CalendarClock,
    Target, BarChart3, Settings, Bell, Search,
    TrendingUp, Users, Heart, Eye,
    Instagram, Twitter, Linkedin,
    Plus, ChevronRight,
} from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const MENU_ITEMS = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: PenSquare, label: 'Create Post' },
    { icon: Sparkles, label: 'AI Generator' },
    { icon: CalendarClock, label: 'Scheduled Posts' },
    { icon: Target, label: 'Campaigns' },
    { icon: BarChart3, label: 'Analytics' },
    { icon: Settings, label: 'Settings' },
];

const RECENT_POSTS = [
    { platform: 'Instagram', icon: Instagram, color: '#E4405F', title: 'New product launch teaser', time: '2h ago', status: 'Published' },
    { platform: 'Twitter', icon: Twitter, color: '#1DA1F2', title: 'Industry trend commentary', time: '4h ago', status: 'Published' },
    { platform: 'LinkedIn', icon: Linkedin, color: '#0A66C2', title: 'Quarterly update post', time: '6h ago', status: 'Scheduled' },
];

export default function DashboardPreview() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.dashboard-wrapper', {
                y: 80,
                opacity: 0,
                scale: 0.95,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 65%',
                    toggleActions: 'play none none reverse',
                },
            });

            // 3D tilt on scroll
            gsap.to('.dashboard-wrapper', {
                rotateX: 0,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 65%',
                    end: 'center center',
                    scrub: 1,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="section" style={{ paddingBottom: 100 }}>
            <div className="section-container">
                <SectionHeading
                    label="Product Preview"
                    title="Your command"
                    titleAccent="center."
                    description="A clean, powerful dashboard that puts AI automation at your fingertips. Manage everything from one beautiful interface."
                />

                {/* Dashboard Shell */}
                <div
                    className="dashboard-wrapper"
                    style={{
                        perspective: '1200px',
                        maxWidth: 1100,
                        margin: '0 auto',
                    }}
                >
                    <div
                        className="dashboard-shell"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '240px 1fr',
                            minHeight: 540,
                            transform: 'rotateX(2deg)',
                            transformOrigin: 'center top',
                        }}
                    >
                        {/* Sidebar */}
                        <div className="dashboard-sidebar" style={{ padding: '24px 0' }}>
                            {/* Logo */}
                            <div style={{ padding: '0 20px', marginBottom: 32, display: 'flex', alignItems: 'center', gap: 10 }}>
                                <div
                                    style={{
                                        width: 32,
                                        height: 32,
                                        borderRadius: 'var(--radius-sm)',
                                        background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-dark) 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Sparkles size={15} color="var(--color-primary)" />
                                </div>
                                <span style={{ fontWeight: 700, fontSize: 15 }}>AutoSocial</span>
                            </div>

                            {/* Menu */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '0 12px' }}>
                                {MENU_ITEMS.map((item) => (
                                    <div
                                        key={item.label}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 12,
                                            padding: '10px 12px',
                                            borderRadius: 'var(--radius-sm)',
                                            background: item.active ? 'rgba(201, 168, 76, 0.1)' : 'transparent',
                                            color: item.active ? 'var(--color-accent)' : 'var(--color-muted)',
                                            fontSize: 13,
                                            fontWeight: item.active ? 600 : 500,
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                        }}
                                    >
                                        <item.icon size={16} />
                                        {item.label}
                                    </div>
                                ))}
                            </div>

                            {/* Create button */}
                            <div style={{ padding: '0 12px', marginTop: 24 }}>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 8,
                                        padding: '10px',
                                        borderRadius: 'var(--radius-sm)',
                                        background: 'var(--color-accent)',
                                        color: 'var(--color-primary)',
                                        fontSize: 13,
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                    }}
                                >
                                    <Plus size={15} />
                                    New Post
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="dashboard-content" style={{ padding: 28 }}>
                            {/* Top bar */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
                                <div>
                                    <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Dashboard</div>
                                    <div style={{ fontSize: 13, color: 'var(--color-muted)' }}>Welcome back, here&apos;s your overview</div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <div
                                        style={{
                                            width: 36,
                                            height: 36,
                                            borderRadius: 'var(--radius-sm)',
                                            background: 'rgba(255,255,255,0.04)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <Search size={15} color="var(--color-muted)" />
                                    </div>
                                    <div
                                        style={{
                                            width: 36,
                                            height: 36,
                                            borderRadius: 'var(--radius-sm)',
                                            background: 'rgba(255,255,255,0.04)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            position: 'relative',
                                        }}
                                    >
                                        <Bell size={15} color="var(--color-muted)" />
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: 8,
                                                right: 8,
                                                width: 6,
                                                height: 6,
                                                borderRadius: '50%',
                                                background: '#E4405F',
                                            }}
                                        />
                                    </div>
                                    <div
                                        style={{
                                            width: 36,
                                            height: 36,
                                            borderRadius: '50%',
                                            background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-dark) 100%)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: 13,
                                            fontWeight: 700,
                                            color: 'var(--color-primary)',
                                        }}
                                    >
                                        N
                                    </div>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
                                {[
                                    { icon: Eye, label: 'Impressions', value: '24.5K', change: '+12%', color: 'var(--color-accent)' },
                                    { icon: Heart, label: 'Likes', value: '8.2K', change: '+8%', color: '#E4405F' },
                                    { icon: Users, label: 'Followers', value: '15.2K', change: '+22%', color: '#4ade80' },
                                    { icon: TrendingUp, label: 'Engagement', value: '94%', change: '+5%', color: '#1DA1F2' },
                                ].map((stat) => (
                                    <div
                                        key={stat.label}
                                        style={{
                                            padding: '16px',
                                            borderRadius: 'var(--radius-md)',
                                            background: 'rgba(255,255,255,0.02)',
                                            border: '1px solid rgba(255,255,255,0.04)',
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                                            <stat.icon size={14} color={stat.color} />
                                            <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: '#4ade80', fontWeight: 600 }}>
                                                {stat.change}
                                            </span>
                                        </div>
                                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 700, marginBottom: 2 }}>
                                            {stat.value}
                                        </div>
                                        <div style={{ fontSize: 11, color: 'var(--color-muted)' }}>{stat.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Recent Posts */}
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                                    <span style={{ fontSize: 14, fontWeight: 700 }}>Recent Posts</span>
                                    <span style={{ fontSize: 12, color: 'var(--color-accent)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                                        View All <ChevronRight size={14} />
                                    </span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {RECENT_POSTS.map((post, i) => (
                                        <div
                                            key={i}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 12,
                                                padding: '12px 14px',
                                                borderRadius: 'var(--radius-sm)',
                                                background: 'rgba(255,255,255,0.02)',
                                                border: '1px solid rgba(255,255,255,0.03)',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: 28,
                                                    height: 28,
                                                    borderRadius: 6,
                                                    background: `${post.color}12`,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexShrink: 0,
                                                }}
                                            >
                                                <post.icon size={13} color={post.color} />
                                            </div>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                    {post.title}
                                                </div>
                                                <div style={{ fontSize: 11, color: 'var(--color-muted)' }}>{post.time}</div>
                                            </div>
                                            <span
                                                style={{
                                                    fontSize: 10,
                                                    fontFamily: 'var(--font-mono)',
                                                    padding: '3px 8px',
                                                    borderRadius: 8,
                                                    background: post.status === 'Published' ? 'rgba(74,222,128,0.08)' : 'rgba(201,168,76,0.1)',
                                                    color: post.status === 'Published' ? '#4ade80' : 'var(--color-accent)',
                                                    fontWeight: 600,
                                                    flexShrink: 0,
                                                }}
                                            >
                                                {post.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
