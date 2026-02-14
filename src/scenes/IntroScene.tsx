
import React from 'react';
import { AppConfig } from '../config';

export const IntroScene: React.FC = () => {
    return (
        <div className="full-screen center-content" style={{ background: 'linear-gradient(45deg, #1a0b2e, #4a0e4e)' }}>
            <h1
                className="glitch-text"
                style={{
                    fontSize: '4rem',
                    fontWeight: 900,
                    color: 'var(--neon-pink)',
                    textShadow: '0 0 20px var(--neon-pink)',
                    marginBottom: '1rem',
                    lineHeight: 1.1
                }}
            >
                {AppConfig.intro.title}
            </h1>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--neon-blue)' }}>
                {AppConfig.intro.subtitle}
            </h2>
            <div style={{ marginTop: '50px', fontSize: '3rem' }}>
                🎉 🎂 🍾
            </div>
        </div>
    );
};
