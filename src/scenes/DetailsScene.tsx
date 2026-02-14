
import React from 'react';
import { AppConfig } from '../config';
import { MapPin, Calendar, Clock, Copy } from 'lucide-react';

export const DetailsScene: React.FC = () => {
    const copyDetails = () => {
        const text = `Petrecere: ${AppConfig.locationName}\nData: ${AppConfig.dateDisplay}\nOra: ${AppConfig.timeDisplay}`;
        navigator.clipboard.writeText(text);
        alert('Detaliile au fost copiate!');
    };

    return (
        <div className="full-screen center-content" style={{ background: '#000' }}>
            <h2 style={{ marginBottom: '40px', color: 'var(--neon-green)', fontSize: '2.5rem' }}>
                {AppConfig.details.title}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', textAlign: 'left', background: 'rgba(255,255,255,0.1)', padding: '30px', borderRadius: '20px', backdropFilter: 'blur(10px)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <MapPin size={32} color="var(--neon-pink)" />
                    <div>
                        <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>LOCAȚIE</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{AppConfig.locationName}</div>
                        <a href={AppConfig.addressLink} target="_blank" rel="noreferrer" style={{ color: 'var(--neon-blue)', fontSize: '0.8rem' }}>Vezi pe hartă</a>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <Calendar size={32} color="var(--neon-yellow)" />
                    <div>
                        <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>DATA</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{AppConfig.dateDisplay}</div>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <Clock size={32} color="var(--neon-blue)" />
                    <div>
                        <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>ORA</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{AppConfig.timeDisplay}</div>
                    </div>
                </div>
            </div>

            <button
                onClick={copyDetails}
                style={{ marginTop: '40px', background: 'transparent', border: '2px solid white', color: 'white', padding: '10px 20px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}
            >
                <Copy size={18} /> {AppConfig.details.copyButton}
            </button>
        </div>
    );
};
