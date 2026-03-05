'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Check, X, Sparkles, ArrowRight, Star,
    Instagram, Twitter, Linkedin, Zap,
} from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import MagneticButton from '@/components/ui/MagneticButton';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

/* ============================================
   Data
   ============================================ */
const PLANS = [
    {
        name: 'Starter',
        badge: 'Best for individuals',
        badgeColor: 'var(--color-muted)',
        monthlyPrice: 0,
        yearlyPrice: 0,
        features: [
            '10 AI generated posts per month',
            'Basic caption generator',
            'Manual posting',
            '1 connected social account',
            'Basic analytics',
        ],
        cta: 'Start Free',
        ctaVariant: 'outline',
        highlighted: false,
    },
    {
        name: 'Creator',
        badge: 'Most Popular',
        badgeColor: 'var(--color-accent)',
        monthlyPrice: 12,
        yearlyPrice: 10,
        features: [
            'Unlimited AI caption generation',
            'AI hashtag suggestions',
            'Post scheduling',
            '5 social accounts',
            'Advanced analytics',
            'Campaign builder',
            'Content calendar',
        ],
        cta: 'Start Free Trial',
        ctaVariant: 'primary',
        highlighted: true,
    },
    {
        name: 'Pro',
        badge: 'For teams & agencies',
        badgeColor: '#4ade80',
        monthlyPrice: 29,
        yearlyPrice: 23,
        features: [
            'Unlimited AI posts',
            'Multi-platform publishing',
            'Campaign automation',
            'AI performance insights',
            'Unlimited social accounts',
            'Priority processing',
            'Team collaboration tools',
        ],
        cta: 'Get Started',
        ctaVariant: 'primary',
        highlighted: false,
    },
];

const COMPARISON_FEATURES = [
    { name: 'AI caption generator', starter: true, creator: true, pro: true },
    { name: 'AI hashtag suggestions', starter: false, creator: true, pro: true },
    { name: 'Post scheduling', starter: false, creator: true, pro: true },
    { name: 'Campaign automation', starter: false, creator: false, pro: true },
    { name: 'Analytics', starter: 'Basic', creator: 'Advanced', pro: 'AI-powered' },
    { name: 'Connected accounts', starter: '1', creator: '5', pro: 'Unlimited' },
    { name: 'Team collaboration', starter: false, creator: false, pro: true },
];

const TESTIMONIALS = [
    {
        quote: 'This platform automated 80% of our social media workflow.',
        author: 'Sarah K.',
        role: 'Marketing Director',
    },
    {
        quote: 'Best AI content tool we\'ve used. Saves us 20 hours per week.',
        author: 'James L.',
        role: 'Agency Founder',
    },
    {
        quote: 'The campaign builder alone is worth the subscription.',
        author: 'Priya M.',
        role: 'Social Media Manager',
    },
];

/* ============================================
   Component
   ============================================ */
export default function PricingSection() {
    const sectionRef = useRef(null);
    const [isYearly, setIsYearly] = useState(false);
    const [expandedFeature, setExpandedFeature] = useState(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.pricing-card', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.pricing-cards-grid',
                    start: 'top 70%',
                    toggleActions: 'play none none reverse',
                },
            });

            gsap.from('.comparison-row', {
                y: 20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.06,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.comparison-table',
                    start: 'top 75%',
                    toggleActions: 'play none none reverse',
                },
            });

            gsap.from('.trust-item', {
                y: 20,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.trust-section',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const getPrice = (plan) => {
        const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
        if (price === 0) return 'Free';
        return `$${price}`;
    };

    return (
        <section ref={sectionRef} id="pricing" className="section" style={{ paddingTop: 140 }}>
            <div className="section-container">

                {/* ==========================================
            1. Section Header
           ========================================== */}
                <SectionHeading
                    label="Pricing"
                    title="Simple pricing for"
                    titleAccent="powerful automation."
                    description="Start free. Upgrade when you're ready to automate your entire social media workflow."
                />

                {/* Microtext */}
                <p style={{
                    textAlign: 'center',
                    marginTop: -40,
                    marginBottom: 48,
                    fontSize: 13,
                    color: 'var(--color-muted)',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.02em',
                }}>
                    No hidden fees · Cancel anytime
                </p>

                {/* ==========================================
            2. Pricing Toggle
           ========================================== */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 16,
                    marginBottom: 56,
                }}>
                    <span style={{
                        fontSize: 14,
                        fontWeight: isYearly ? 400 : 600,
                        color: isYearly ? 'var(--color-muted)' : 'var(--color-bg-light)',
                        transition: 'all 0.3s ease',
                    }}>
                        Monthly
                    </span>

                    {/* Toggle Switch */}
                    <button
                        onClick={() => setIsYearly(!isYearly)}
                        style={{
                            position: 'relative',
                            width: 56,
                            height: 30,
                            borderRadius: 15,
                            background: isYearly
                                ? 'var(--color-accent)'
                                : 'rgba(255,255,255,0.1)',
                            border: '1px solid ' + (isYearly ? 'var(--color-accent)' : 'rgba(255,255,255,0.12)'),
                            cursor: 'pointer',
                            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                            padding: 0,
                            flexShrink: 0,
                        }}
                    >
                        <div style={{
                            position: 'absolute',
                            top: 3,
                            left: isYearly ? 28 : 3,
                            width: 22,
                            height: 22,
                            borderRadius: '50%',
                            background: isYearly ? 'var(--color-primary)' : 'var(--color-bg-light)',
                            transition: 'left 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                        }} />
                    </button>

                    <span style={{
                        fontSize: 14,
                        fontWeight: isYearly ? 600 : 400,
                        color: isYearly ? 'var(--color-bg-light)' : 'var(--color-muted)',
                        transition: 'all 0.3s ease',
                    }}>
                        Yearly
                    </span>

                    {/* Save badge */}
                    <span style={{
                        fontSize: 11,
                        fontWeight: 600,
                        fontFamily: 'var(--font-mono)',
                        padding: '4px 10px',
                        borderRadius: 12,
                        background: isYearly ? 'rgba(74, 222, 128, 0.12)' : 'rgba(74, 222, 128, 0.06)',
                        color: '#4ade80',
                        letterSpacing: '0.03em',
                        transition: 'all 0.3s ease',
                        opacity: isYearly ? 1 : 0.5,
                    }}>
                        Save 20%
                    </span>
                </div>

                {/* ==========================================
            3. Pricing Cards
           ========================================== */}
                <div
                    className="pricing-cards-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: 20,
                        maxWidth: 1060,
                        margin: '0 auto 100px',
                        alignItems: 'stretch',
                    }}
                >
                    {PLANS.map((plan) => (
                        <div
                            key={plan.name}
                            className="pricing-card"
                            style={{
                                position: 'relative',
                                borderRadius: 'var(--radius-xl)',
                                background: plan.highlighted
                                    ? 'linear-gradient(135deg, rgba(201,168,76,0.08) 0%, rgba(255,255,255,0.04) 100%)'
                                    : 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                                border: plan.highlighted
                                    ? '1.5px solid rgba(201,168,76,0.3)'
                                    : '1px solid rgba(255,255,255,0.06)',
                                padding: 32,
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                                transform: plan.highlighted ? 'scale(1.03)' : 'scale(1)',
                                backdropFilter: 'blur(12px)',
                                WebkitBackdropFilter: 'blur(12px)',
                                cursor: 'pointer',
                                zIndex: plan.highlighted ? 2 : 1,
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = plan.highlighted ? 'scale(1.05) translateY(-4px)' : 'translateY(-6px)';
                                e.currentTarget.style.boxShadow = plan.highlighted
                                    ? '0 24px 60px rgba(201,168,76,0.2), 0 0 1px rgba(201,168,76,0.4)'
                                    : '0 20px 50px rgba(0,0,0,0.3), 0 0 1px rgba(255,255,255,0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = plan.highlighted ? 'scale(1.03)' : 'scale(1)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            {/* Highlighted glow */}
                            {plan.highlighted && (
                                <div style={{
                                    position: 'absolute',
                                    top: -1,
                                    left: '10%',
                                    right: '10%',
                                    height: 1,
                                    background: 'linear-gradient(90deg, transparent, var(--color-accent), transparent)',
                                }} />
                            )}

                            {/* Badge */}
                            <div style={{
                                display: 'inline-flex',
                                alignSelf: 'flex-start',
                                alignItems: 'center',
                                gap: 6,
                                padding: '5px 12px',
                                borderRadius: 14,
                                background: plan.highlighted ? 'rgba(201,168,76,0.12)' : 'rgba(255,255,255,0.05)',
                                marginBottom: 20,
                            }}>
                                {plan.highlighted && <Star size={11} color="var(--color-accent)" fill="var(--color-accent)" />}
                                <span style={{
                                    fontSize: 11,
                                    fontWeight: 600,
                                    fontFamily: 'var(--font-mono)',
                                    color: plan.badgeColor,
                                    letterSpacing: '0.03em',
                                    textTransform: 'uppercase',
                                }}>
                                    {plan.badge}
                                </span>
                            </div>

                            {/* Plan name */}
                            <h3 style={{
                                fontSize: 22,
                                fontWeight: 800,
                                letterSpacing: '-0.02em',
                                marginBottom: 12,
                            }}>
                                {plan.name}
                            </h3>

                            {/* Price */}
                            <div style={{ marginBottom: 24, display: 'flex', alignItems: 'baseline', gap: 4 }}>
                                <span style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: plan.monthlyPrice === 0 ? 40 : 44,
                                    fontWeight: 800,
                                    letterSpacing: '-0.03em',
                                    color: plan.highlighted ? 'var(--color-accent)' : 'var(--color-bg-light)',
                                    transition: 'color 0.3s ease',
                                }}>
                                    {getPrice(plan)}
                                </span>
                                {plan.monthlyPrice > 0 && (
                                    <span style={{
                                        fontSize: 14,
                                        color: 'var(--color-muted)',
                                        fontWeight: 500,
                                    }}>
                                        /month
                                    </span>
                                )}
                            </div>

                            {/* Features */}
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 12,
                                marginBottom: 32,
                                flex: 1,
                            }}>
                                {plan.features.map((feature) => (
                                    <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <div style={{
                                            width: 18,
                                            height: 18,
                                            borderRadius: '50%',
                                            background: plan.highlighted ? 'rgba(201,168,76,0.15)' : 'rgba(255,255,255,0.06)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0,
                                        }}>
                                            <Check size={10} color={plan.highlighted ? 'var(--color-accent)' : '#4ade80'} strokeWidth={3} />
                                        </div>
                                        <span style={{ fontSize: 13, color: 'rgba(250,248,245,0.75)', lineHeight: 1.4 }}>
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <button
                                className={plan.ctaVariant === 'outline' ? 'magnetic-btn magnetic-btn-outline' : 'magnetic-btn'}
                                style={{
                                    width: '100%',
                                    justifyContent: 'center',
                                    padding: '14px 24px',
                                    fontSize: 14,
                                }}
                            >
                                {plan.cta}
                                {plan.ctaVariant === 'primary' && <ArrowRight size={15} />}
                            </button>
                        </div>
                    ))}
                </div>

                {/* ==========================================
            4. Feature Comparison Table
           ========================================== */}
                <div style={{ maxWidth: 900, margin: '0 auto 100px' }}>
                    <h3 style={{
                        textAlign: 'center',
                        fontSize: 24,
                        fontWeight: 800,
                        letterSpacing: '-0.02em',
                        marginBottom: 40,
                    }}>
                        Compare Plans
                    </h3>

                    {/* Desktop Table */}
                    <div className="comparison-table hide-mobile">
                        {/* Header Row */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1.5fr repeat(3, 1fr)',
                            gap: 0,
                            padding: '0 0 16px',
                            borderBottom: '1px solid rgba(255,255,255,0.08)',
                            marginBottom: 8,
                        }}>
                            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                                Feature
                            </div>
                            {PLANS.map(p => (
                                <div key={p.name} style={{
                                    textAlign: 'center',
                                    fontSize: 13,
                                    fontWeight: 700,
                                    color: p.highlighted ? 'var(--color-accent)' : 'var(--color-bg-light)',
                                }}>
                                    {p.name}
                                </div>
                            ))}
                        </div>

                        {/* Rows */}
                        {COMPARISON_FEATURES.map((feature, i) => (
                            <div
                                key={feature.name}
                                className="comparison-row"
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1.5fr repeat(3, 1fr)',
                                    gap: 0,
                                    padding: '14px 0',
                                    borderBottom: i < COMPARISON_FEATURES.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                                    transition: 'background 0.2s ease',
                                    borderRadius: 8,
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                            >
                                <div style={{ fontSize: 14, color: 'var(--color-bg-light)', fontWeight: 500, paddingLeft: 8 }}>
                                    {feature.name}
                                </div>
                                {['starter', 'creator', 'pro'].map((tier) => (
                                    <div key={tier} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        {feature[tier] === true ? (
                                            <div style={{
                                                width: 22,
                                                height: 22,
                                                borderRadius: '50%',
                                                background: 'rgba(74,222,128,0.1)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                                <Check size={12} color="#4ade80" strokeWidth={3} />
                                            </div>
                                        ) : feature[tier] === false ? (
                                            <div style={{
                                                width: 22,
                                                height: 22,
                                                borderRadius: '50%',
                                                background: 'rgba(255,255,255,0.03)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                                <X size={10} color="var(--color-muted)" strokeWidth={2.5} />
                                            </div>
                                        ) : (
                                            <span style={{
                                                fontSize: 12,
                                                fontWeight: 600,
                                                fontFamily: 'var(--font-mono)',
                                                color: tier === 'pro' ? '#4ade80' : (tier === 'creator' ? 'var(--color-accent)' : 'var(--color-muted)'),
                                            }}>
                                                {feature[tier]}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* Mobile Accordion */}
                    <div className="hide-desktop" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {COMPARISON_FEATURES.map((feature) => (
                            <div key={feature.name}>
                                <button
                                    onClick={() => setExpandedFeature(expandedFeature === feature.name ? null : feature.name)}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: '14px 16px',
                                        borderRadius: 'var(--radius-md)',
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '1px solid rgba(255,255,255,0.06)',
                                        color: 'var(--color-bg-light)',
                                        fontSize: 14,
                                        fontWeight: 500,
                                        cursor: 'pointer',
                                        fontFamily: 'var(--font-heading)',
                                    }}
                                >
                                    {feature.name}
                                    <span style={{
                                        transform: expandedFeature === feature.name ? 'rotate(180deg)' : 'rotate(0deg)',
                                        transition: 'transform 0.3s ease',
                                        color: 'var(--color-muted)',
                                        fontSize: 12,
                                    }}>
                                        ▼
                                    </span>
                                </button>
                                {expandedFeature === feature.name && (
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(3, 1fr)',
                                        gap: 8,
                                        padding: '12px 8px',
                                    }}>
                                        {['starter', 'creator', 'pro'].map((tier, i) => (
                                            <div key={tier} style={{
                                                textAlign: 'center',
                                                padding: '10px 8px',
                                                borderRadius: 'var(--radius-sm)',
                                                background: 'rgba(255,255,255,0.02)',
                                            }}>
                                                <div style={{ fontSize: 10, color: 'var(--color-muted)', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                                    {PLANS[i].name}
                                                </div>
                                                {feature[tier] === true ? (
                                                    <Check size={14} color="#4ade80" />
                                                ) : feature[tier] === false ? (
                                                    <X size={14} color="var(--color-muted)" style={{ opacity: 0.4 }} />
                                                ) : (
                                                    <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--color-accent)' }}>
                                                        {feature[tier]}
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* ==========================================
            5. Trust Indicators
           ========================================== */}
                <div className="trust-section" style={{
                    maxWidth: 900,
                    margin: '0 auto 100px',
                    textAlign: 'center',
                }}>
                    <p style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: 'var(--color-muted)',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        marginBottom: 32,
                    }}>
                        Trusted by creators and marketers worldwide
                    </p>

                    {/* User avatars cluster */}
                    <div className="trust-item" style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 0,
                        marginBottom: 36,
                    }}>
                        {['#C9A84C', '#1DA1F2', '#E4405F', '#4ade80', '#0A66C2'].map((color, i) => (
                            <div key={i} style={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                background: `linear-gradient(135deg, ${color} 0%, ${color}99 100%)`,
                                border: '3px solid var(--color-primary)',
                                marginLeft: i > 0 ? -12 : 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 14,
                                fontWeight: 700,
                                color: 'var(--color-primary)',
                                position: 'relative',
                                zIndex: 5 - i,
                            }}>
                                {['S', 'J', 'M', 'K', 'A'][i]}
                            </div>
                        ))}
                        <span style={{
                            marginLeft: 12,
                            fontSize: 13,
                            color: 'var(--color-muted)',
                        }}>
                            12,000+ active users
                        </span>
                    </div>

                    {/* Testimonials */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: 16,
                    }}>
                        {TESTIMONIALS.map((t) => (
                            <GlassCard key={t.author} className="trust-item" hoverable style={{ padding: 24, textAlign: 'left' }}>
                                {/* Stars */}
                                <div style={{ display: 'flex', gap: 2, marginBottom: 12 }}>
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={13} color="var(--color-accent)" fill="var(--color-accent)" />
                                    ))}
                                </div>
                                <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(250,248,245,0.8)', marginBottom: 16, fontStyle: 'italic' }}>
                                    &ldquo;{t.quote}&rdquo;
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <div style={{
                                        width: 32,
                                        height: 32,
                                        borderRadius: '50%',
                                        background: 'rgba(201,168,76,0.15)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: 13,
                                        fontWeight: 700,
                                        color: 'var(--color-accent)',
                                    }}>
                                        {t.author[0]}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 13, fontWeight: 600 }}>{t.author}</div>
                                        <div style={{ fontSize: 11, color: 'var(--color-muted)' }}>{t.role}</div>
                                    </div>
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                </div>

                {/* ==========================================
            6. Final CTA
           ========================================== */}
                <div style={{
                    position: 'relative',
                    textAlign: 'center',
                    padding: '80px 0',
                    borderRadius: 'var(--radius-2xl)',
                    overflow: 'hidden',
                }}>
                    {/* BG gradient */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 60%)',
                        borderRadius: 'var(--radius-2xl)',
                    }} />

                    <div style={{ position: 'relative', zIndex: 2 }}>
                        <div style={{
                            width: 50,
                            height: 50,
                            borderRadius: 'var(--radius-md)',
                            background: 'rgba(201,168,76,0.12)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 24px',
                        }}>
                            <Zap size={22} color="var(--color-accent)" />
                        </div>

                        <h3 style={{
                            fontSize: 'clamp(24px, 4vw, 36px)',
                            fontWeight: 800,
                            letterSpacing: '-0.03em',
                            marginBottom: 16,
                        }}>
                            Start automating your
                            <br />
                            <span className="text-gradient-accent" style={{
                                fontFamily: 'var(--font-accent)',
                                fontStyle: 'italic',
                                fontWeight: 700,
                            }}>
                                social media today.
                            </span>
                        </h3>

                        <p style={{
                            fontSize: 15,
                            color: 'var(--color-muted)',
                            lineHeight: 1.7,
                            maxWidth: 420,
                            margin: '0 auto 32px',
                        }}>
                            Join thousands of creators who are saving hours every week with AI-powered automation.
                        </p>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
                            <MagneticButton>
                                Start Free <ArrowRight size={15} />
                            </MagneticButton>
                            <MagneticButton variant="outline">
                                View Demo
                            </MagneticButton>
                        </div>
                    </div>
                </div>
            </div>

            {/* ==========================================
          Responsive Overrides
         ========================================== */}
            <style jsx>{`
        @media (max-width: 767px) {
          .pricing-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .pricing-card {
            transform: scale(1) !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .pricing-cards-grid {
            grid-template-columns: 1fr !important;
            max-width: 440px !important;
          }
        }
      `}</style>
        </section>
    );
}
