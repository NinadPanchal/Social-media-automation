'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function DashboardLayout({ children }) {
    const { token, loading } = useAuth();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted && !loading && !token) {
            router.push('/');
        }
    }, [token, loading, router, mounted]);

    // Don't render dashboard UI until we know auth state
    if (!mounted || loading) {
        return (
            <div style={{ display: 'flex', height: '100vh', width: '100vw', alignItems: 'center', justifyContent: 'center' }}>
                <Loader2 className="animate-spin" size={32} color="var(--color-accent)" />
            </div>
        );
    }

    // Safety check in case redirect hasn't happened yet
    if (!token) return null;

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
            <Sidebar />
            <main style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                overflow: 'auto'
            }}>
                <div style={{ maxWidth: 1200, width: '100%', margin: '0 auto', padding: '40px' }}>
                    {children}
                </div>
            </main>
        </div>
    );
}
