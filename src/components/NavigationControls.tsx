
import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Props {
    onNext: () => void;
    onPrev: () => void;
    canNext: boolean;
    canPrev: boolean;
    step: number;
    totalSteps: number;
}

export const NavigationControls: React.FC<Props> = ({
    onNext,
    onPrev,
    canNext,
    canPrev,
    step,
    totalSteps,
}) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === 'Enter') {
                if (canNext) onNext();
            }
            if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
                if (canPrev) onPrev();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onNext, onPrev, canNext, canPrev]);

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '20px',
                alignItems: 'center',
                zIndex: 100,
            }}
        >
            <button
                onClick={onPrev}
                disabled={!canPrev}
                style={{
                    opacity: canPrev ? 1 : 0.3,
                    background: 'var(--neon-pink)',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '30px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: canPrev ? '0 0 15px var(--neon-pink)' : 'none',
                    transition: 'all 0.2s',
                }}
            >
                <ArrowLeft size={20} /> ÎNAPOI
            </button>

            <span style={{ fontSize: '14px', opacity: 0.7 }}>
                Pasul {step + 1}/{totalSteps}
            </span>

            <button
                onClick={onNext}
                disabled={!canNext}
                style={{
                    opacity: canNext ? 1 : 0.3,
                    background: 'var(--neon-blue)',
                    color: 'black',
                    padding: '12px 24px',
                    borderRadius: '30px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: canNext ? '0 0 15px var(--neon-blue)' : 'none',
                    transition: 'all 0.2s',
                }}
            >
                URMĂTORUL <ArrowRight size={20} />
            </button>
        </div>
    );
};
