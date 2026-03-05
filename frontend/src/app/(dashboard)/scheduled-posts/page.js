'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Calendar, Trash2, Edit3, Clock, Loader2, Sparkles } from 'lucide-react';

export default function ScheduledPostsPage() {
    const { token } = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch('/api/scheduled-posts', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (!res.ok) throw new Error('Failed to fetch posts');
                const data = await res.json();
                setPosts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (token) fetchPosts();
    }, [token]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'rgba(201, 168, 76, 0.8)';
            case 'published': return 'rgba(34, 197, 94, 0.8)';
            case 'failed': return 'rgba(239, 68, 68, 0.8)';
            default: return 'var(--color-muted)';
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: 32, fontWeight: 600, color: 'var(--color-bg-light)', marginBottom: 8, letterSpacing: '-0.02em' }}>
                        Scheduled Posts
                    </h1>
                    <p style={{ color: 'var(--color-muted)', fontSize: 16 }}>
                        Manage and review your upcoming automated content.
                    </p>
                </div>

                <a href="/app/create-post" className="magnetic-btn" style={{ textDecoration: 'none', padding: '10px 20px', fontSize: 13 }}>
                    <Sparkles size={16} /> New Post
                </a>
            </div>

            <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden'
            }}>
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: 64, color: 'var(--color-accent)' }}>
                        <Loader2 className="animate-spin" />
                    </div>
                ) : error ? (
                    <div style={{ padding: 32, color: '#ef4444', textAlign: 'center' }}>
                        {error}
                    </div>
                ) : posts.length === 0 ? (
                    <div style={{ padding: 64, textAlign: 'center', color: 'var(--color-muted)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                        <Calendar size={48} opacity={0.2} />
                        <p>No posts scheduled yet. Ready to automate?</p>
                    </div>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{
                                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                                backgroundColor: 'rgba(0,0,0,0.2)'
                            }}>
                                <th style={ThStyle}>Platform</th>
                                <th style={ThStyle}>Content Snippet</th>
                                <th style={ThStyle}>Scheduled For</th>
                                <th style={ThStyle}>Status</th>
                                <th style={{ ...ThStyle, textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((sp) => (
                                <tr key={sp.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.02)' }}>
                                    <td style={{ ...TdStyle, fontWeight: 500, color: 'var(--color-bg-light)' }}>
                                        {sp.post.platform}
                                    </td>
                                    <td style={{ ...TdStyle, color: 'var(--color-muted)', maxWidth: 300 }}>
                                        <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {sp.post.content}
                                        </div>
                                    </td>
                                    <td style={TdStyle}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <Clock size={14} color="var(--color-muted)" />
                                            {new Date(sp.scheduled_time).toLocaleString()}
                                        </div>
                                    </td>
                                    <td style={TdStyle}>
                                        <span style={{
                                            padding: '4px 10px',
                                            borderRadius: 20,
                                            fontSize: 12,
                                            fontWeight: 500,
                                            backgroundColor: 'rgba(255,255,255,0.05)',
                                            color: getStatusColor(sp.status),
                                            textTransform: 'capitalize'
                                        }}>
                                            {sp.status}
                                        </span>
                                    </td>
                                    <td style={{ ...TdStyle, textAlign: 'right' }}>
                                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                                            <button style={ActionBtnStyle}>
                                                <Edit3 size={14} />
                                            </button>
                                            <button style={{ ...ActionBtnStyle, color: '#ef4444' }}>
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

const ThStyle = {
    padding: '16px 24px',
    textAlign: 'left',
    fontSize: 13,
    fontWeight: 500,
    color: 'var(--color-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
};

const TdStyle = {
    padding: '20px 24px',
    fontSize: 14,
    color: 'var(--color-bg-light)'
};

const ActionBtnStyle = {
    background: 'none',
    border: 'none',
    color: 'var(--color-muted)',
    cursor: 'pointer',
    padding: 6,
    borderRadius: 4,
    transition: 'background-color 0.2s, color 0.2s',
};
