import React, { useEffect, useRef, useState } from 'react';

// IMPORTANT: Use import.meta.env.BASE_URL for deployment path correctness
const BASE_URL = import.meta.env.BASE_URL;

const trackList = [
    `${BASE_URL}audio/track1.mp3`,
    `${BASE_URL}audio/track2.mp3`,
    `${BASE_URL}audio/track3.mp3`,
    // Add/remove tracks as needed
];

function SiteEntryManager() {
    const audioRef = useRef(null);
    // State is now internal, just controlling the small notification
    const [isBlocked, setIsBlocked] = useState(true); 

    // Function to handle moving to the next track in the playlist loop
    const playNextTrack = () => {
        const audio = audioRef.current;
        if (!audio) return;
        
        const currentIndex = trackList.findIndex(track => audio.src.includes(track));
        let nextIndex = (currentIndex + 1) % trackList.length;
        
        audio.src = trackList[nextIndex];
        audio.play().catch(e => console.error("Loop play failed:", e));
    };

    // Handler for the small 'Click to Play' prompt
    const handleUserInteraction = () => {
        const audio = audioRef.current;
        if (audio && audio.paused) {
            audio.play().then(() => {
                // If playback is successful, hide the prompt
                setIsBlocked(false); 
            }).catch(e => {
                console.error("Manual audio play failed:", e);
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
            // If play succeeds, set blocked to false immediately
            setIsBlocked(false); 
        }).catch(e => {
            // If play fails, we remain blocked (true) to show the prompt
            console.log("Autoplay blocked. Showing small prompt.");
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
            
            {/* Small prompt shown only when audio is blocked */}
            {isBlocked && (
                <div className="audio-prompt">
                    CLICK ANYWHERE TO ENABLE SOUND 🔈
                </div>
            )}
        </>
    );
}

export default SiteEntryManager;