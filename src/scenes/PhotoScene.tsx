
import React from 'react';
import { AppConfig } from '../config';

export const PhotoScene: React.FC = () => {
    return (
        <div className="full-screen center-content" style={{ background: 'linear-gradient(to bottom, #10002b, #240046)' }}>
            <h2 style={{ marginBottom: '20px', color: 'var(--neon-yellow)' }}>
                {AppConfig.photo.title}
            </h2>

            <div
                style={{
                    position: 'relative',
                    width: '300px',
                    height: '400px',
                    background: '#fff',
                    transform: 'rotate(-3deg)',
                    border: '10px solid white',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <img
                    src="/picture.png"
                    alt="Celebrant"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />

                {/* Sticker Overlay */}
                <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'var(--neon-pink)', color: 'white', padding: '5px 10px', fontSize: '12px', fontWeight: 'bold', transform: 'rotate(5deg)' }}>
                    #PARTY_MODE
                </div>
            </div>
        </div>
    );
};
