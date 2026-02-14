
import React from 'react';
import { AppConfig } from '../config';
import confetti from 'canvas-confetti';

export const TeaserScene: React.FC = () => {
    const fireConfetti = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    };

    return (
        <div
            className="full-screen center-content"
            onClick={fireConfetti}
            style={{ background: 'linear-gradient(135deg, #000000, #0a0a20)' }}
        >
            {AppConfig.teaser.lines.map((line, i) => (
                <p
                    key={i}
                    style={{
                        fontSize: '2rem',
                        margin: '10px 0',
                        color: i === 3 ? 'var(--neon-yellow)' : 'white',
                        fontWeight: i === 3 ? 'bold' : 'normal',
                        cursor: 'pointer'
                    }}
                >
                    {line}
                </p>
            ))}
            <p style={{ marginTop: '30px', opacity: 0.5, fontSize: '0.9rem' }}>
                (Click oriunde pentru confetti!)
            </p>
        </div>
    );
};
