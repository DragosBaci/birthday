
import React from 'react';
import { AppConfig } from '../config';
import { Link } from 'lucide-react';

export const FinalScene: React.FC = () => {


    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('Link-ul a fost copiat!');
    };

    return (
        <div className="full-screen center-content" style={{ background: 'linear-gradient(to top, #000000, #1a0b2e)' }}>
            <h2 className="glitch-text" style={{ fontSize: '3rem', color: 'var(--neon-pink)', marginBottom: '20px' }}>
                {AppConfig.final.title}
            </h2>

            <p style={{ fontSize: '1.5rem', marginBottom: '50px', color: 'var(--neon-blue)' }}>
                {AppConfig.final.subtitle}
            </p>

            <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>


                <button
                    onClick={copyLink}
                    style={{ width: '250px', padding: '15px', background: 'transparent', border: '2px solid white', color: 'white', borderRadius: '30px', fontSize: '1.2rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                >
                    <Link size={24} /> {AppConfig.final.shareLink}
                </button>
            </div>

            <div style={{ marginTop: '50px', opacity: 0.5, fontSize: '0.9rem' }}>
                Creat cu ❤️ pentru {AppConfig.celebrantName}
            </div>
        </div>
    );
};
