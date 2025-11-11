// src/components/BackgroundMusic.jsx

import React, { useEffect, useRef, useState } from 'react';

// IMPORTANT: Use import.meta.env.BASE_URL for deployment path correctness
const BASE_URL = import.meta.env.BASE_URL;

const trackList = [
    `${BASE_URL}audio/track1.mp3`,
    `${BASE_URL}audio/track2.mp3`,
    `${BASE_URL}audio/track3.mp3`,
    // Add/remove tracks as needed
];

function BackgroundMusic() {
    const audioRef = useRef(null);
    const [isBlocked, setIsBlocked] = useState(true); // Start assuming audio is blocked

    // Function to handle moving to the next track in the playlist loop
    const playNextTrack = () => {
        const audio = audioRef.current;
        if (!audio) return;
        
        const currentIndex = trackList.findIndex(track => audio.src.includes(track));
        let nextIndex = (currentIndex + 1) % trackList.length;
        
        audio.src = trackList[nextIndex];
        audio.play().catch(e => console.error("Loop play failed:", e));
    };

    // 💥 NEW: This runs on the *full-screen* click to unlock audio
    const unlockAudio = () => {
        const audio = audioRef.current;
        if (audio && audio.paused) {
            audio.play().then(() => {
                // Audio started successfully, now unblock the component
                setIsBlocked(false); 
            }).catch(e => {
                console.error("Audio unlock failed:", e);
                // If it fails here, the prompt will remain visible
            });
        }
    };

    useEffect(() => {
        const audio = audioRef.current;
        
        // 1. Initial Setup
        const randomIndex = Math.floor(Math.random() * trackList.length);
        audio.src = trackList[randomIndex];
        audio.volume = 0.5;

        // 2. Initial Play Attempt
        audio.play().then(() => {
            // If play succeeds (unlikely), set blocked to false immediately
            setIsBlocked(false); 
        }).catch(e => {
            // Play failed (likely), so we remain blocked (true)
            console.log("Autoplay blocked. Prompting user.");
        });

        // 3. Set up the 'ended' event for continuous looping
        audio.addEventListener('ended', playNextTrack);
        
        // 4. Clean up the event listener for the small prompt when the component unmounts
        // We will attach the listener directly to the body for a reliable click
        document.addEventListener('click', handleUserInteraction);
        
        // 5. Cleanup
        return () => {
            audio.removeEventListener('ended', playNextTrack);
            document.removeEventListener('click', handleUserInteraction);
            audio.pause();
        };
    }, []); 

    return (
        <>
            {/* The hidden HTML5 audio element */}
            <audio
                ref={audioRef}
                autoPlay 
                controls={false}
                style={{ display: 'none' }}
            />
            
            {/* 💥 NEW: Full-screen overlay shown ONLY when audio is blocked */}
            {isBlocked && (
                <div 
                    onClick={unlockAudio}
                    className="audio-prompt-overlay" // New class for full screen
                >
                    <div className="audio-prompt">
                        CLICK ANYWHERE TO ENABLE SOUND 🔈
                    </div>
                </div>
            )}
        </>
    );
}

export default BackgroundMusic;