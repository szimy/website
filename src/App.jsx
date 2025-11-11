import LogoLoop from './components/LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';

const techLogos = [
  { node: <FaDiscord/>, title: "Discord", href: "https://www.discordapp.com/users/508340160455245832" },
  { node: <FaYoutube />, title: "YouTube", href: "https://www.youtube.com/@szimyyyy" },
  { node: <FaGithub />, title: "GitHub", href: "https://github.com/szimy" },
  { src: `${import.meta.env.BASE_URL}gsblue.png`, alt: "GS Blue", href: "https://discord.gg/ZBQezgQEpy"} 
];
//Background Music import
import SiteEntryManager from './components/SiteEntryManager';
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