'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Calendar, Trash2, Edit3, Clock, Loader2, Sparkles, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function ScheduledPostsPage() {
    const { token } = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    const fetchPosts = useCallback(async () => {
        if (!token) return;
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
    }, [token]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this scheduled post?')) return;
        setDeletingId(id);
        try {
            const res = await fetch(`/api/scheduled-posts/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!res.ok && res.status !== 204) throw new Error('Failed to delete');
            setPosts(prev => prev.filter(p => p.id !== id));
        } catch (err) {
            setError(err.message);
        } finally {
            setDeletingId(null);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'rgba(201, 168, 76, 0.8)';
            case 'published': return 'rgba(34, 197, 94, 0.8)';
            case 'failed': return 'rgba(239, 68, 68, 0.8)';
            default: return 'var(--color-muted)';
        }
    };

    const getPlatformColor = (platform) => {
        const map = { Instagram: '#E4405F', Twitter: '#1DA1F2', LinkedIn: '#0A66C2' };
        return map[platform] || 'var(--color-accent)';
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                <div>
                    <h1 style={{ fontSize: 32, fontWeight: 600, color: 'var(--color-bg-light)', marginBottom: 8, letterSpacing: '-0.02em' }}>
                        Scheduled Posts
                    </h1>
                    <p style={{ color: 'var(--color-muted)', fontSize: 16 }}>
                        Manage and review your upcoming automated content.
                    </p>
                </div>

                <Link href="/dashboard/create-post" className="magnetic-btn" style={{ textDecoration: 'none', padding: '10px 20px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Sparkles size={16} /> New Post
                </Link>
            </div>

            {error && (
                <div style={{ padding: '12px 16px', backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 'var(--radius-sm)', color: '#ef4444', fontSize: 13 }}>
                    {error}
                </div>
            )}

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
                ) : posts.length === 0 ? (
                    <div style={{ padding: 64, textAlign: 'center', color: 'var(--color-muted)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                        <Calendar size={48} opacity={0.2} />
                        <p>No posts scheduled yet. Ready to automate?</p>
                        <Link href="/dashboard/create-post" style={{ color: 'var(--color-accent)', fontSize: 14, textDecoration: 'none', fontWeight: 500 }}>
                            → Create your first post
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
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
                                    <tr key={sp.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.02)', transition: 'background 0.15s' }}
                                        onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.01)'}
                                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                                        <td style={{ ...TdStyle }}>
                                            <span style={{ fontWeight: 500, color: getPlatformColor(sp.post?.platform) }}>
                                                {sp.post?.platform}
                                            </span>
                                        </td>
                                        <td style={{ ...TdStyle, color: 'var(--color-muted)', maxWidth: 300 }}>
                                            <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {sp.post?.content}
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
                                                textTransform: 'capitalize',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: 4
                                            }}>
                                                {sp.status === 'published' && <CheckCircle size={10} />}
                                                {sp.status}
                                            </span>
                                        </td>
                                        <td style={{ ...TdStyle, textAlign: 'right' }}>
                                            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                                                <button
                                                    onClick={() => handleDelete(sp.id)}
                                                    disabled={deletingId === sp.id}
                                                    style={{
                                                        ...ActionBtnStyle,
                                                        color: '#ef4444',
                                                        opacity: deletingId === sp.id ? 0.5 : 1
                                                    }}>
                                                    {deletingId === sp.id
                                                        ? <Loader2 size={14} className="animate-spin" />
                                                        : <Trash2 size={14} />}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
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
