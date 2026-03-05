'use client';

import { Sparkles } from 'lucide-react';

const footerLinks = {
    Product: ['Features', 'Pricing', 'Changelog', 'API'],
    Company: ['About', 'Blog', 'Careers', 'Press'],
    Resources: ['Documentation', 'Community', 'Support', 'Status'],
    Legal: ['Privacy', 'Terms', 'Security'],
};

export default function Footer() {
    return (
        <footer
            style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.04)',
                padding: '64px 0 32px',
            }}
        >
            <div className="section-container">
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                        gap: 40,
                        marginBottom: 48,
                    }}
                >
                    {/* Brand */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
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
                            <span style={{ fontWeight: 700, fontSize: 16 }}>AutoSocial</span>
                        </div>
                        <p style={{ fontSize: 13, color: 'var(--color-muted)', lineHeight: 1.6, maxWidth: 200 }}>
                            AI-powered social media automation for modern brands.
                        </p>
                    </div>

                    {/* Link columns */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <div
                                style={{
                                    fontSize: 12,
                                    fontWeight: 600,
                                    color: 'var(--color-bg-light)',
                                    letterSpacing: '0.05em',
                                    textTransform: 'uppercase',
                                    marginBottom: 16,
                                }}
                            >
                                {category}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {links.map((link) => (
                                    <a
                                        key={link}
                                        href={link === 'Documentation' ? "https://github.com/NinadPanchal/Social-media-automation#readme" : "#"}
                                        style={{
                                            fontSize: 13,
                                            color: 'var(--color-muted)',
                                            textDecoration: 'none',
                                            transition: 'color 0.2s ease',
                                        }}
                                        onMouseEnter={(e) => (e.target.style.color = 'var(--color-bg-light)')}
                                        onMouseLeave={(e) => (e.target.style.color = 'var(--color-muted)')}
                                    >
                                        {link}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div
                    style={{
                        borderTop: '1px solid rgba(255, 255, 255, 0.04)',
                        paddingTop: 24,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: 16,
                    }}
                >
                    <span style={{ fontSize: 12, color: 'var(--color-muted)' }}>
                        © 2026 AutoSocial AI. All rights reserved.
                    </span>
                    <div style={{ display: 'flex', gap: 20 }}>
                        {['Twitter', 'LinkedIn', 'GitHub'].map((social) => (
                            <a
                                key={social}
                                href={social === 'GitHub' ? "https://github.com/NinadPanchal/Social-media-automation" : "#"}
                                style={{
                                    fontSize: 12,
                                    color: 'var(--color-muted)',
                                    textDecoration: 'none',
                                    transition: 'color 0.2s ease',
                                }}
                                onMouseEnter={(e) => (e.target.style.color = 'var(--color-accent)')}
                                onMouseLeave={(e) => (e.target.style.color = 'var(--color-muted)')}
                            >
                                {social}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
