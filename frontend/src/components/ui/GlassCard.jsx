'use client';

export default function GlassCard({ children, className = '', style = {}, hoverable = false }) {
    return (
        <div
            className={`glass-card ${className}`}
            style={{
                ...style,
                transition: hoverable
                    ? 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                    : undefined,
                cursor: hoverable ? 'pointer' : undefined,
            }}
            onMouseEnter={hoverable ? (e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.3), 0 0 1px rgba(201,168,76,0.3)';
            } : undefined}
            onMouseLeave={hoverable ? (e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
            } : undefined}
        >
            {children}
        </div>
    );
}
