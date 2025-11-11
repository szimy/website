import React, { useState } from 'react'; // 💥 FIX 1: Missing useState
import { loadSlim } from 'tsparticles-slim'; // 💥 FIX 1: Missing loadSlim
import LogoLoop from './components/LogoLoop';
import SiteEntryManager from './components/SiteEntryManager';
import Particles from './components/Particles';

// Icon Imports
import { FaDiscord, FaGithub, FaYoutube } from 'react-icons/fa';
// Removed unused imports: SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, FadeContent

import './App.css'; 
import './fonts.css'; 
import './components/Particles.css'; 

const socialLogos = [ // Renamed techLogos to socialLogos for consistency
  { node: <FaDiscord/>, title: "Discord", href: "https://www.discordapp.com/users/508340160455245832" },
  { node: <FaYoutube />, title: "YouTube", href: "https://www.youtube.com/@szimyyyy" },
  { node: <FaGithub />, title: "GitHub", href: "https://github.com/szimy" },
  { 
    src: `${import.meta.env.BASE_URL}logos/gsblue.png`, // 💥 FIX 2: Added 'logos/' folder
    alt: "GS Blue", 
    href: "https://discord.gg/ZBQezgQEpy"
} 
];

function App() {
    // State to manage whether the main content is blocked by the entry screen
    const [isBlocked, setIsBlocked] = useState(true);

    const particlesInit = async (main) => {
        await loadSlim(main);
    };

    return (
        <>
            {/* 1. The Manager handles audio and shows the overlay if blocked */}
            <SiteEntryManager 
                isBlocked={isBlocked} 
                onUnlock={() => setIsBlocked(false)}
            /> 
            
            {/* 2. The main content renders only when UNLOCKED */}
            {!isBlocked && (
                <main className="comingsoon">
                    {/* Particle Background */}
                    <Particles
                        id="tsparticles"
                        init={particlesInit}
                        options={{
                            // ... your particle options here ...
                            fullScreen: { enable: true, zIndex: -1 },
                            particles: {
                                number: { value: 50 },
                                opacity: { value: 0.5 },
                                shape: { type: "circle" },
                                size: { value: 3 },
                                links: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
                                move: { enable: true, speed: 1 },
                            },
                        }}
                    />

                    <div className="content-container">
                        <h1>S Z I M Y</h1>
                        <h2>Coming Soon.</h2>
                        <LogoLoop 
                            logos={socialLogos} 
                            logoHeight={32}
                            gap={20}
                            // Fixed positioning overrides
                            className="logoloop-fixed"
                            style={{ 
                                position: 'fixed', 
                                bottom: '20px', 
                                right: '20px',
                            }}
                        />
                    </div>
                </main>
            )}
        </>
    );
}

export default App;