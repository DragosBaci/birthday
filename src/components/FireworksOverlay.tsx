
import React, { useEffect, useRef, useState } from 'react';

const COLORS = ['#ff00ff', '#00ffff', '#ffff00', '#00ff00', '#ffffff'];

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    alpha: number;
    color: string;
    size: number;
}

export const FireworksOverlay: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [enabled, setEnabled] = useState(false);
    const particles = useRef<Particle[]>([]);
    const animationFrameId = useRef<number>(0);

    useEffect(() => {
        if (!enabled) {
            if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
            const ctx = canvasRef.current?.getContext('2d');
            if (ctx && canvasRef.current) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            return;
        }

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        const createFirework = (x: number, y: number) => {
            const particleCount = 30; // Reduced from 50
            for (let i = 0; i < particleCount; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 5 + 2;
                particles.current.push({
                    x,
                    y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    alpha: 0.6, // Reduced from 1
                    color: COLORS[Math.floor(Math.random() * COLORS.length)],
                    size: Math.random() * 3 + 1,
                });
            }
        };

        const loop = () => {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // Trail effect
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.globalCompositeOperation = 'lighter';

            // Random auto-spawn
            if (Math.random() < 0.05) {
                createFirework(
                    Math.random() * canvas.width,
                    Math.random() * canvas.height * 0.5
                );
            }

            for (let i = particles.current.length - 1; i >= 0; i--) {
                const p = particles.current[i];
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.05; // Gravity
                p.alpha -= 0.01;

                ctx.globalAlpha = p.alpha;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                if (p.alpha <= 0) {
                    particles.current.splice(i, 1);
                }
            }

            animationFrameId.current = requestAnimationFrame(loop);
        };

        loop();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId.current);
        };
    }, [enabled]);

    return (
        <>
            <canvas
                ref={canvasRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    zIndex: 1,
                }}
            />
            <button
                onClick={() => setEnabled(!enabled)}
                style={{
                    position: 'fixed',
                    top: '20px', // Moved from bottom
                    left: '20px', // Moved from right
                    zIndex: 1000,
                    background: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    padding: '8px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    border: '1px solid rgba(255,255,255,0.3)',
                    backdropFilter: 'blur(4px)',
                }}
            >
                Focuri: {enabled ? 'Pornit' : 'Oprit'}
            </button>
        </>
    );
};
