'use client';

import Sidebar from '@/components/dashboard/Sidebar';

export default function DashboardLayout({ children }) {
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
