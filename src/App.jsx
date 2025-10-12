import LogoLoop from './components/LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';

const techLogos = [
  { node: <FaDiscord/>, title: "Discord", href: "https://www.discordapp.com/users/508340160455245832" },
  { node: <FaYoutube />, title: "YouTube", href: "https://www.youtube.com/@szimyyyy" },
  { node: <FaGithub />, title: "GitHub", href: "https://github.com/szimy" },
  { src: "/gsblue.png", alt: "GS Blue", href: "https://discord.gg/ZBQezgQEpy"} 
];
//Background Music import
import BackgroundMusic from './components/BackgroundMusic';
// src/App.jsx
import './App.css'; 
// You will need this line to import your custom Google Font styles
import './fonts.css'; 
// FadeContent import
import FadeContent from './components/FadeContent';
//Particles import
import Particles from './components/Particles';
import './components/Particles.css'; 
import { FaDiscord, FaGithub, FaYoutube } from 'react-icons/fa';
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