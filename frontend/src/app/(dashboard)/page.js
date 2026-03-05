'use client';

import { Activity, Users, CalendarDays, FileText } from 'lucide-react';

export default function DashboardPage() {

    const stats = [
        { label: 'Total Posts Generated', value: '24', icon: FileText, change: '+12% this week' },
        { label: 'Scheduled Content', value: '8', icon: CalendarDays, change: 'Next post in 2h' },
        { label: 'Audience Reach', value: '1.2k', icon: Users, change: '+5% this month' },
        { label: 'Engagement Rate', value: '4.8%', icon: Activity, change: '+1.2% this week' },
    ];

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
                {stats.map((stat, i) => {
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
                    minHeight: 400
                }}>
                    <h2 style={{ fontSize: 18, fontWeight: 500, color: 'var(--color-bg-light)', marginBottom: 24 }}>
                        Recent Activity
                    </h2>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200, color: 'var(--color-muted)' }}>
                        Analytics coming soon...
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
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200, color: 'var(--color-muted)' }}>
                        No posts scheduled yet.
                    </div>
                </div>
            </div>
        </div>
    );
}
