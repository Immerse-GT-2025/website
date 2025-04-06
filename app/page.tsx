"use client"

import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import { Languages, Type, ZoomIn } from "lucide-react"
import { useState, useEffect, useRef } from "react"

// Dynamically import ReactPlayer with no SSR to avoid hydration issues
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false })

// Language options
const languageOptions = [
  { code: 'en', name: 'English', lyrics: 'And here we are together' },
  { code: 'es', name: 'Español', lyrics: 'Y aquí estamos juntos' },
  { code: 'fr', name: 'Français', lyrics: 'Et nous voilà ensemble' }
]

export default function Home() {
  const [isClient, setIsClient] = useState(false)
  const [currentView, setCurrentView] = useState<'language' | 'accessibility' | 'video'>('video')
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const [dyslexiaMode, setDyslexiaMode] = useState(false)
  const [showLyrics, setShowLyrics] = useState(true)
  const [performerTracking, setPerformerTracking] = useState(true)
  const [textSize, setTextSize] = useState(1)
  const [lyricsPosition, setLyricsPosition] = useState({ x: 50, y: 85 })
  const [currentLyric, setCurrentLyric] = useState(languageOptions[0].lyrics)
  const videoContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsClient(true)
    
    // Update lyrics based on language
    const currentLang = languageOptions.find(l => l.code === currentLanguage)
    if (currentLang) {
      setCurrentLyric(currentLang.lyrics)
    }
    
    // Animate lyrics position with a subtle movement
    const interval = setInterval(() => {
      setLyricsPosition({
        x: 50 + Math.sin(Date.now() / 2000) * 3,
        y: 85 + Math.cos(Date.now() / 2500) * 2
      })
    }, 50)
    
    return () => clearInterval(interval)
  }, [currentLanguage])

  if (!isClient) {
    return (
      <div className="phone-frame mx-auto bg-black/20">
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-white/50">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-6xl font-bold text-center">clarifiAI</h1>
        <p className="text-center text-xl mt-4">Your concert, your way</p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* AR Video Experience */}
        {currentView === 'video' && (
          <div 
            ref={videoContainerRef}
            className={`phone-frame mx-auto relative ar-mode ${dyslexiaMode ? 'dyslexia-mode' : ''}`}
          >
            <div className={`relative w-full h-full overflow-hidden ${performerTracking ? 'zoom-effect' : ''}`}>
              <ReactPlayer
                url="/13112850_1080_1920_30fps.mp4"
                width="100%"
                height="100%"
                playing
                muted
                loop
                playsinline
                config={{
                  file: {
                    attributes: {
                      style: {
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: 'transform 1.5s ease-in-out',
                      },
                    },
                  },
                }}
              />
              
              {/* AR Interface Elements */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Top status bar */}
                <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent z-10">
                  <p className="text-sm font-medium">Now Playing</p>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-blue-400/80 rounded-full"></div>
                    <div className="text-xs text-blue-200">{languageOptions.find(l => l.code === currentLanguage)?.name || 'English'}</div>
                  </div>
                </div>
                
                {/* Scan line effect */}
                <div className="scan-line"></div>
                
                {/* AR tracking markers */}
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400/50 rounded-full animate-pulse"></div>
                  <div className="w-16 h-0.5 bg-blue-400/30"></div>
                </div>
                
                {/* Side AR elements */}
                <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex flex-col items-center space-y-2">
                  <div className="w-1 h-16 bg-blue-400/30"></div>
                  <div className="w-2 h-2 bg-blue-400/50 rounded-full animate-pulse"></div>
                </div>
              </div>
              
              {/* AR Controls */}
              <div className="absolute bottom-24 right-4 flex flex-col space-y-3 z-20">
                <button 
                  onClick={() => setCurrentView('language')}
                  className="ar-control-button"
                >
                  <Languages className="w-5 h-5" />
                </button>
                
                <button 
                  onClick={() => setCurrentView('accessibility')}
                  className="ar-control-button"
                >
                  <Type className="w-5 h-5" />
                </button>
                
                <button 
                  onClick={() => setPerformerTracking(!performerTracking)}
                  className="ar-control-button"
                >
                  <ZoomIn className={`w-5 h-5 ${performerTracking ? 'text-blue-400' : 'text-white/70'}`} />
                </button>
              </div>
              
              {/* Lyrics Display */}
              {showLyrics && (
                <div 
                  className="ar-lyrics-container"
                  style={{
                    left: `${lyricsPosition.x}%`,
                    top: `${lyricsPosition.y}%`,
                    transform: `translate(-50%, -50%) scale(${textSize})`,
                  }}
                >
                  <div className="ar-lyrics-text">
                    {currentLyric}
                  </div>
                  <div className="ar-lyrics-marker"></div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Language selection menu */}
        {currentView === 'language' && (
          <div className="phone-frame mx-auto flex flex-col items-center justify-center bg-[#0a0e1a] relative">
            <div className="absolute top-4 left-4">
              <button 
                className="text-white/70 hover:text-white"
                onClick={() => setCurrentView('video')}
              >
                Back
              </button>
            </div>
            
            <h2 className="text-3xl font-bold mb-12">Select Language</h2>
            
            <div className="flex flex-col gap-6 w-4/5">
              {languageOptions.map((lang) => (
                <button
                  key={lang.code}
                  className={`language-button text-2xl py-3 ${lang.code === currentLanguage ? 'bg-[#1a3a6e] border-white/40' : ''}`}
                  onClick={() => {
                    setCurrentLanguage(lang.code);
                    setCurrentView('video');
                  }}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Accessibility settings menu */}
        {currentView === 'accessibility' && (
          <div className="phone-frame mx-auto flex flex-col items-center justify-center bg-[#0a0e1a] relative">
            <div className="absolute top-4 left-4">
              <button 
                className="text-white/70 hover:text-white"
                onClick={() => setCurrentView('video')}
              >
                Back
              </button>
            </div>
            
            <h2 className="text-3xl font-bold mb-12">Accessibility</h2>
            
            <div className="w-4/5 space-y-8">
              <div className="flex justify-between items-center">
                <span className="text-xl">Dyslexia-friendly mode</span>
                <button 
                  onClick={() => setDyslexiaMode(!dyslexiaMode)}
                  className={`w-12 h-6 rounded-full ${dyslexiaMode ? 'bg-blue-500' : 'bg-gray-700'} relative`}
                >
                  <span className={`absolute w-5 h-5 rounded-full bg-white top-0.5 transform transition-transform ${dyslexiaMode ? 'translate-x-6' : 'translate-x-1'}`}></span>
                </button>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xl">Show lyrics</span>
                <button 
                  onClick={() => setShowLyrics(!showLyrics)}
                  className={`w-12 h-6 rounded-full ${showLyrics ? 'bg-blue-500' : 'bg-gray-700'} relative`}
                >
                  <span className={`absolute w-5 h-5 rounded-full bg-white top-0.5 transform transition-transform ${showLyrics ? 'translate-x-6' : 'translate-x-1'}`}></span>
                </button>
              </div>
              
              <div>
                <span className="text-xl block mb-3">Text Size</span>
                <div className="flex justify-between items-center">
                  <button 
                    onClick={() => setTextSize(Math.max(0.8, textSize - 0.1))}
                    className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full"
                  >
                    -
                  </button>
                  <div className="mx-2 text-white text-xl">{Math.round(textSize * 100)}%</div>
                  <button 
                    onClick={() => setTextSize(Math.min(1.5, textSize + 0.1))}
                    className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </main>
  )
}

