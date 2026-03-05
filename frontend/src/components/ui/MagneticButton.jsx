'use client';

import { useRef, useState } from 'react';

export default function MagneticButton({ children, className = '', style = {}, onClick, variant = 'primary' }) {
    const btnRef = useRef(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const rect = btnRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        setOffset({ x: x * 0.3, y: y * 0.3 });
    };

    const handleMouseLeave = () => {
        setOffset({ x: 0, y: 0 });
    };

    const variantClass = variant === 'outline' ? 'magnetic-btn magnetic-btn-outline' : 'magnetic-btn';

    return (
        <button
            ref={btnRef}
            className={`${variantClass} ${className}`}
            style={{
                ...style,
                transform: `translate(${offset.x}px, ${offset.y}px)`,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
