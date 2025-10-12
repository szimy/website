// src/components/BackgroundMusic.jsx

import React, { useEffect, useRef, useState } from 'react';

const trackList = [
    '/audio/track1.mp3',
    '/audio/track2.mp3',
    '/audio/track3.mp3',
];

function BackgroundMusic() {
    const audioRef = useRef(null);
    // 💥 NEW STATE: Tracks if the audio is currently playing
    const [isPlaying, setIsPlaying] = useState(false);
    
    // Function to handle playing the audio when the user clicks
    const handleUserInteraction = () => {
        const audio = audioRef.current;
        if (audio && audio.paused) {
            audio.play().then(() => {
                setIsPlaying(true);
            }).catch(e => console.error("Play failed after interaction:", e));
        }
    };

    useEffect(() => {
        const audio = audioRef.current;
        
        const randomIndex = Math.floor(Math.random() * trackList.length);
        let currentTrackIndex = randomIndex;
        
        const playNextTrack = () => {
            currentTrackIndex = (currentTrackIndex + 1) % trackList.length;
            audio.src = trackList[currentTrackIndex];
            audio.play().catch(e => console.error("Loop failed:", e));
        };

        // Set the initial random track
        audio.src = trackList[randomIndex];
        
        // 💥 MODIFIED: Check if autoplay fails and update state
        audio.play().then(() => {
            setIsPlaying(true); // Autoplay succeeded
        }).catch(e => {
            console.log("Autoplay blocked. Waiting for user interaction.");
            // Keep isPlaying as false to show the click prompt
        });

        audio.addEventListener('ended', playNextTrack);

        return () => {
            audio.removeEventListener('ended', playNextTrack);
            document.removeEventListener('click', handleUserInteraction);
            audio.pause();
        };
    }, []); 
    
    // We add the click handler to the body if not playing
    useEffect(() => {
        if (isPlaying) {
            document.removeEventListener('click', handleUserInteraction);
        }
    }, [isPlaying]);

    return (
        <>
            <audio
                ref={audioRef}
                autoPlay
                controls={false}
                style={{ display: 'none' }}
                volume={0.5} 
            />
            
            {/* 💥 VISIBLE PROMPT: Show only if audio is NOT playing */}
            {!isPlaying && (
                <div 
                    onClick={handleUserInteraction}
                    className="audio-prompt" // We will style this next
                >
                    CLICK ANYWHERE TO ENABLE SOUND 🔈
                </div>
            )}
        </>
    );
}

export default BackgroundMusic;