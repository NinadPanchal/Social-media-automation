'use client';

import { useState, useEffect } from 'react';
import { Activity, Users, CalendarDays, FileText, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function DashboardPage() {
    const { token } = useAuth();
    const [stats, setStats] = useState(null);
    const [upcomingPosts, setUpcomingPosts] = useState([]);

    useEffect(() => {
        if (!token) return;

        // Fetch real analytics
        fetch('/api/analytics', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(r => r.json())
            .then(data => setStats(data))
            .catch(() => { });

        // Fetch upcoming scheduled posts
        fetch('/api/scheduled-posts', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(r => r.json())
            .then(data => setUpcomingPosts(data.slice(0, 5)))
            .catch(() => { });
    }, [token]);

    const statCards = stats ? [
        { label: 'Total Posts Generated', value: stats.total_posts, icon: FileText, change: 'All time' },
        { label: 'Scheduled Content', value: stats.scheduled_count, icon: CalendarDays, change: 'Pending posts' },
        { label: 'Total Impressions', value: stats.impressions.toLocaleString(), icon: Users, change: 'Across all posts' },
        { label: 'Engagement Rate', value: `${stats.engagement_rate}%`, icon: Activity, change: 'Likes / Impressions' },
    ] : [
        { label: 'Total Posts Generated', value: '—', icon: FileText, change: 'Loading...' },
        { label: 'Scheduled Content', value: '—', icon: CalendarDays, change: 'Loading...' },
        { label: 'Total Impressions', value: '—', icon: Users, change: 'Loading...' },
        { label: 'Engagement Rate', value: '—', icon: Activity, change: 'Loading...' },
    ];

    const getPlatformColor = (platform) => {
        const map = { Instagram: '#E4405F', Twitter: '#1DA1F2', LinkedIn: '#0A66C2' };
        return map[platform] || 'var(--color-accent)';
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40, animation: 'fadeIn 0.5s ease-out' }}>
            {/* Header */}
            <div>
                <h1 style={{ fontSize: 32, fontWeight: 600, color: 'var(--color-bg-light)', marginBottom: 8, letterSpacing: '-0.02em' }}>
                    Dashboard
                </h1>
                <p style={{ color: 'var(--color-muted)', fontSize: 16 }}>
                    Welcome back. Here's what's happening with your social media today.
                </p>
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
                {statCards.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} style={{
                            padding: 24,
                            borderRadius: 'var(--radius-lg)',
                            backgroundColor: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                                <span style={{ color: 'var(--color-muted)', fontSize: 14 }}>{stat.label}</span>
                                <div style={{
                                    width: 32, height: 32, borderRadius: 8,
                                    backgroundColor: 'rgba(201, 168, 76, 0.1)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: 'var(--color-accent)'
                                }}>
                                    <Icon size={16} />
                                </div>
                            </div>
                            <div style={{ fontSize: 32, fontWeight: 600, color: 'var(--color-bg-light)', marginBottom: 8 }}>
                                {stat.value}
                            </div>
                            <div style={{ fontSize: 13, color: 'var(--color-accent)' }}>
                                {stat.change}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Recent & Scheduled Previews */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
                <div style={{
                    padding: 24,
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    minHeight: 300
                }}>
                    <h2 style={{ fontSize: 18, fontWeight: 500, color: 'var(--color-bg-light)', marginBottom: 24 }}>
                        Recent Activity
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {upcomingPosts.length > 0 ? upcomingPosts.map((sp, i) => (
                            <div key={i} style={{
                                padding: '12px 16px',
                                borderRadius: 'var(--radius-md)',
                                backgroundColor: 'rgba(255,255,255,0.02)',
                                border: '1px solid rgba(255,255,255,0.04)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 12,
                            }}>
                                <div style={{
                                    width: 8, height: 8, borderRadius: '50%',
                                    backgroundColor: getPlatformColor(sp.post?.platform),
                                    flexShrink: 0
                                }} />
                                <span style={{ fontSize: 13, color: 'var(--color-bg-light)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {sp.post?.content}
                                </span>
                                <span style={{ fontSize: 11, color: 'var(--color-muted)', flexShrink: 0 }}>
                                    {sp.post?.platform}
                                </span>
                            </div>
                        )) : (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 150, color: 'var(--color-muted)', gap: 12 }}>
                                <Sparkles size={24} opacity={0.3} />
                                <p style={{ fontSize: 14 }}>No posts yet. Create your first!</p>
                                <Link href="/dashboard/create-post" style={{
                                    color: 'var(--color-accent)', fontSize: 13,
                                    textDecoration: 'none', fontWeight: 500
                                }}>→ Create a post</Link>
                            </div>
                        )}
                    </div>
                </div>

                <div style={{
                    padding: 24,
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                }}>
                    <h2 style={{ fontSize: 18, fontWeight: 500, color: 'var(--color-bg-light)', marginBottom: 24 }}>
                        Upcoming Posts
                    </h2>
                    {upcomingPosts.length === 0 ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 150, color: 'var(--color-muted)', fontSize: 14 }}>
                            No posts scheduled yet.
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {upcomingPosts.slice(0, 4).map((sp, i) => (
                                <div key={i} style={{
                                    padding: '10px 14px',
                                    borderRadius: 'var(--radius-sm)',
                                    backgroundColor: 'rgba(255,255,255,0.02)',
                                    border: '1px solid rgba(255,255,255,0.04)',
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                        <span style={{ fontSize: 12, fontWeight: 500, color: getPlatformColor(sp.post?.platform) }}>
                                            {sp.post?.platform}
                                        </span>
                                        <span style={{ fontSize: 11, color: 'var(--color-muted)' }}>
                                            {new Date(sp.scheduled_time).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p style={{ fontSize: 12, color: 'var(--color-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {sp.post?.content}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
