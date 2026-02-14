
import React, { useState } from 'react';
import { AppConfig } from '../config';
import confetti from 'canvas-confetti';
import { Calendar, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const RsvpScene: React.FC = () => {
    const [noBtnPos, setNoBtnPos] = useState({ top: '60%', left: '70%' });
    const [showModal, setShowModal] = useState(false);
    const [guestName, setGuestName] = useState('');

    const moveNoButton = () => {
        const randomTop = Math.random() * 60 + 20; // 20% to 80%
        const randomLeft = Math.random() * 80 + 10; // 10% to 90%
        setNoBtnPos({ top: `${randomTop}%`, left: `${randomLeft}%` });
    };

    const handleYes = () => {
        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6 }
        });
        // Fire more confetti after a delay
        setTimeout(() => confetti({ particleCount: 150, spread: 120, origin: { y: 0.6 } }), 500);
        setTimeout(() => confetti({ particleCount: 100, spread: 140, origin: { y: 0.6 } }), 1000);

        setShowModal(true);
    };

    // Generate .ics file content
    const downloadIcs = () => {
        const eventTime = AppConfig.eventDate.replace(/[-:]/g, '').split('.')[0]; // YYYYMMDDTHHMMSS
        const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${eventTime}
SUMMARY:Petrecere ${AppConfig.celebrantName}
DESCRIPTION:${AppConfig.extraJokeLine}
LOCATION:${AppConfig.locationName}
END:VEVENT
END:VCALENDAR`;

        const blob = new Blob([icsContent], { type: 'text/calendar' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'birthday_party.ics');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleConfirm = () => {
        if (!guestName.trim()) {
            alert('Te rog scrie-ți numele!');
            return;
        }

        const message = AppConfig.rsvp.whatsappMessage.replace('{NAME}', guestName);
        let phone = AppConfig.rsvpContact.replace(/\D/g, ''); // Clean phone number

        // Auto-format RO numbers: 07xx... -> 407xx...
        if (phone.startsWith('07') && phone.length === 10) {
            phone = '4' + phone;
        }

        // Check for mobile device
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if (isMobile) {
            // Use api.whatsapp.com for better deep link support
            window.location.href = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
        } else {
            // Desktop web whatsapp
            window.open(`https://web.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`, '_blank');
        }
    };

    return (
        <div className="full-screen center-content" style={{ background: 'radial-gradient(circle, #2a002a 0%, #000000 100%)' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '50px', color: 'white' }}>
                {AppConfig.rsvp.question}
            </h2>

            {/* YES Button */}
            <button
                onClick={handleYes}
                style={{
                    padding: '20px 40px',
                    fontSize: '2rem',
                    background: 'var(--neon-green)',
                    color: 'black',
                    fontWeight: 900,
                    borderRadius: '50px',
                    boxShadow: '0 0 30px var(--neon-green)',
                    zIndex: 10
                }}
            >
                {AppConfig.rsvp.yesButton}
            </button>

            {/* NO Button (Elusive) */}
            <div
                onMouseEnter={moveNoButton}
                onTouchStart={moveNoButton}
                style={{
                    position: 'absolute',
                    top: noBtnPos.top,
                    left: noBtnPos.left,
                    transition: 'all 0.2s ease-out'
                }}
            >
                <button
                    tabIndex={-1} // Prevent keyboard focus easily
                    onClick={moveNoButton} // Just in case they click it
                    style={{
                        padding: '10px 20px',
                        fontSize: '1rem',
                        background: '#333',
                        color: '#888',
                        borderRadius: '20px',
                    }}
                >
                    {AppConfig.rsvp.noButton}
                </button>
            </div>

            {/* Success Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'rgba(0,0,0,0.9)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 200
                        }}
                    >
                        <div style={{ background: '#1a1a1a', padding: '30px', borderRadius: '30px', textAlign: 'center', maxWidth: '90%', width: '400px', border: '2px solid var(--neon-pink)' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🎉</div>
                            <h3 style={{ color: 'var(--neon-pink)', fontSize: '2rem', marginBottom: '10px' }}>
                                {AppConfig.rsvp.successTitle}
                            </h3>
                            <p style={{ fontSize: '1rem', marginBottom: '20px', opacity: 0.8 }}>
                                {AppConfig.rsvp.successMessage}
                            </p>

                            {/* Name Input */}
                            <div style={{ marginBottom: '20px', textAlign: 'left' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: 'var(--neon-blue)' }}>
                                    {AppConfig.rsvp.inputLabel}
                                </label>
                                <input
                                    type="text"
                                    value={guestName}
                                    onChange={(e) => setGuestName(e.target.value)}
                                    placeholder={AppConfig.rsvp.inputPlaceholder}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        borderRadius: '10px',
                                        border: '1px solid #444',
                                        background: '#333',
                                        color: 'white',
                                        fontSize: '1rem',
                                        outline: 'none'
                                    }}
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <button onClick={handleConfirm} style={{ background: 'var(--neon-green)', color: 'black', padding: '15px', borderRadius: '15px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '1.1rem' }}>
                                    <Send size={20} /> {AppConfig.rsvp.confirmButton}
                                </button>

                                <button onClick={downloadIcs} style={{ background: 'transparent', border: '1px solid #666', color: '#ccc', padding: '12px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '0.9rem' }}>
                                    <Calendar size={18} /> {AppConfig.rsvp.addToCalendar}
                                </button>

                                <button onClick={() => setShowModal(false)} style={{ marginTop: '10px', background: 'none', color: '#666', border: 'none', textDecoration: 'underline' }}>
                                    Închide
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
