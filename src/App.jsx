import React, { useState } from 'react'; // Added missing React/useState import
import { loadSlim } from 'tsparticles-slim'; // Added missing loadSlim import
import LogoLoop from './components/LogoLoop';
import SiteEntryManager from './components/SiteEntryManager'; // Keeps the current name
import Particles from './components/Particles';

// Icon Imports
import { FaDiscord, FaGithub, FaYoutube } from 'react-icons/fa';
// Removed unused imports

import './App.css'; 
import './fonts.css'; 
import './components/Particles.css'; 

// IMPORTANT: Use Vite's BASE_URL for deployed asset paths
const BASE_URL = import.meta.env.BASE_URL;

const socialLogos = [ 
    { node: <FaDiscord/>, title: "Discord", href: "https://www.discordapp.com/users/508340160455245832" },
    { node: <FaYoutube />, title: "YouTube", href: "https://www.youtube.com/@szimyyyy" },
    { node: <FaGithub />, title: "GitHub", href: "https://github.com/szimy" },
    { 
        src: `${BASE_URL}logos/gsblue.png`, 
        alt: "GS Blue", 
        href: "https://discord.gg/ZBQezgQEpy"
    } 
];

function App() {
    // Note: We don't need 'isBlocked' state here anymore, but keeping particlesInit
    const particlesInit = async (main) => {
        await loadSlim(main);
    };

    return (
        <>
            {/* 1. Audio Manager: It will display its own small prompt if sound is blocked */}
            <SiteEntryManager /> 
            
            {/* 2. The main content renders UNCONDITIONALLY */}
            <main className="comingsoon">
                {/* Particle Background */}
                <Particles
                    id="tsparticles"
                    init={particlesInit}
                    options={{
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
                        className="logoloop-fixed"
                        style={{ 
                            position: 'fixed', 
                            bottom: '20px', 
                            right: '20px',
                        }}
                    />
                </div>
            </main>
        </>
    );
}

export default App;