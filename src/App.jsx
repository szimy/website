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
  
  return (
    <>
    {/* Particle Background */}
  <Particles
    particleColors={['#ffffff', '#ffffff']}
    particleCount={200}
    particleSpread={10}
    speed={0.1}
    particleBaseSize={100}
    moveParticlesOnHover={true}
    alphaParticles={false}
    disableRotation={false}
    className="full-screen-bg"
  />
   {/* 2. Coming Soon Text (Layer 2) */}
      <div className="comingsoon">
        <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
          <h1>Coming<br /> Soon</h1>
        </FadeContent>
      </div>
      {/* 3. Logo Loop (Layer 3) */}
      <LogoLoop
        logos={techLogos}
        speed={120}
        direction="left"
        logoHeight={48}
        gap={40}
        pauseOnHover
        scaleOnHover
        fadeOut
        fadeOutColor="#ffffff"
        ariaLabel="Technology partners"
      />
      {/* Background Music Component */}
      <BackgroundMusic />
    </>
  );
}

export default App;