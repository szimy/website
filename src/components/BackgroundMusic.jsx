import React, { useEffect, useRef, useState } from 'react';

// IMPORTANT: Use import.meta.env.BASE_URL to correctly load assets from 
// the /your-repo-name/ subdirectory on GitHub Pages.
const BASE_URL = import.meta.env.BASE_URL;

// List of your audio tracks with the deployment prefix
const trackList = [
    `${BASE_URL}audio/track1.mp3`,
    `${BASE_URL}audio/track2.mp3`,
    `${BASE_URL}audio/track3.mp3`,
];

function BackgroundMusic() {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    
    // Function to handle moving to the next track in the playlist loop
    const playNextTrack = () => {
        const audio = audioRef.current;
        if (!audio) return;
        
        // Find the index of the currently playing track
        const currentIndex = trackList.findIndex(track => audio.src.includes(track));
        
        // Calculate the index for the next track (loops back to 0)
        let nextIndex = (currentIndex + 1) % trackList.length;
        
        // Assign the new track source and play
        audio.src = trackList[nextIndex];
        audio.play().catch(e => console.error("Loop play failed:", e));
    };


    // Function to handle user interaction (click) to start or resume music
    const handleUserInteraction = () => {
        const audio = audioRef.current;
        
        // 1. Check if audio is currently paused or stopped
        if (audio && audio.paused) {
            
            // 2. Immediately set state to true to hide the prompt
            // We assume the interaction will succeed.
            setIsPlaying(true); 

            // 3. Attempt to play the audio
            audio.play().catch(e => {
                console.error("Play failed after user interaction:", e);
                // If play fails (very rare after a click), you might revert the state
                // setIsPlaying(false); 
            });
            
            // 4. Remove the initial document listener
            document.removeEventListener('click', handleUserInteraction); 
        }
    };


    useEffect(() => {
        const audio = audioRef.current;
        
        // 1. Initial Setup: Randomly select a starting track
        const randomIndex = Math.floor(Math.random() * trackList.length);
        audio.src = trackList[randomIndex];
        audio.volume = 0.5; // Set your preferred volume (0.0 to 1.0)
        
        // 2. Initial Play Attempt (will likely be blocked by browser)
        audio.play().then(() => {
            setIsPlaying(true); // Autoplay succeeded
        }).catch(e => {
            console.log("Autoplay blocked. Waiting for user interaction.");
        });

        // 3. Set up the 'ended' event for continuous looping
        audio.addEventListener('ended', playNextTrack);

        // 4. Attach initial click listener to the entire document as a reliable fallback
        document.addEventListener('click', handleUserInteraction, { once: true });


        // 5. Cleanup function
        return () => {
            audio.removeEventListener('ended', playNextTrack);
            document.removeEventListener('click', handleUserInteraction);
            audio.pause();
        };
    }, []); // Runs only once on mount

    return (
        <>
            {/* The hidden HTML5 audio element */}
            <audio
                ref={audioRef}
                autoPlay 
                controls={false}
                style={{ display: 'none' }}
                // Note: The 'loop' attribute is NOT used; looping is handled by playNextTrack
            />
            
            {/* The visible prompt, shown only if audio is NOT playing */}
            {!isPlaying && (
                <div 
                    onClick={handleUserInteraction} // Explicitly clickable
                    className="audio-prompt" 
                >
                    CLICK ANYWHERE TO ENABLE SOUND 🔈
                </div>
            )}
        </>
    );
}

export default BackgroundMusic;