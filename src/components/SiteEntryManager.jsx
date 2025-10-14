import React, { useEffect, useRef } from 'react';

// IMPORTANT: Use import.meta.env.BASE_URL for deployment path correctness
const BASE_URL = import.meta.env.BASE_URL;

// List of your audio tracks with the deployment prefix
const trackList = [
    `${BASE_URL}audio/track1.mp3`,
    `${BASE_URL}audio/track2.mp3`,
    `${BASE_URL}audio/track3.mp3`,
];

function SiteEntryManager({ isBlocked, onUnlock }) {
    const audioRef = useRef(null);

    // Function to handle moving to the next track in the playlist loop
    const playNextTrack = () => {
        const audio = audioRef.current;
        if (!audio) return;
        
        // Simple logic to move to the next track index
        const currentIndex = trackList.findIndex(track => audio.src.includes(track));
        let nextIndex = (currentIndex + 1) % trackList.length;
        
        audio.src = trackList[nextIndex];
        audio.play().catch(e => console.error("Loop play failed:", e));
    };

    // Function to handle the full-screen click to unlock the site and start music
    const unlockSiteAndAudio = () => {
        const audio = audioRef.current;
        
        // 1. Attempt to play audio
        audio.play().then(() => {
            // 2. If audio successfully starts, call the unlock callback
            onUnlock(); 
        }).catch(e => {
            console.error("Audio unlock failed, but proceeding:", e);
            // 3. Even if audio fails (rare), proceed to unlock the site content
            onUnlock();
        });
    };


    useEffect(() => {
        const audio = audioRef.current;
        
        // 1. Initial Setup: Randomly select a starting track
        const randomIndex = Math.floor(Math.random() * trackList.length);
        audio.src = trackList[randomIndex];
        audio.volume = 0.5;

        // 2. Initial Play Attempt (will likely be blocked)
        audio.play().catch(e => {
            console.log("Autoplay blocked. Prompting user to enter.");
        });

        // 3. Set up the 'ended' event for continuous looping
        audio.addEventListener('ended', playNextTrack);

        // 4. Cleanup
        return () => {
            audio.removeEventListener('ended', playNextTrack);
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
            
            {/* Full-screen overlay shown ONLY if the site is blocked */}
            {isBlocked && (
                <div 
                    onClick={unlockSiteAndAudio} // Single click unlocks site and music
                    className="audio-prompt-overlay" 
                >
                    <div className="enter-page-content">
                        <p>Welcome.</p>
                        <h1>E N T E R &nbsp; S I T E</h1>
                        <p className="small-text">Click anywhere to proceed and enable sound.</p>
                    </div>
                </div>
            )}
        </>
    );
}

export default SiteEntryManager;