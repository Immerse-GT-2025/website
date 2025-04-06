"use client"

import { useEffect, useState, useRef } from "react"
import dynamic from "next/dynamic"
import { Languages, ArrowLeft, Type, ZoomIn, Eye, ToggleLeft } from "lucide-react"

// Dynamically import ReactPlayer with no SSR to avoid hydration issues
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false })

interface VideoEmbedProps {
  nowPlaying: string
  lyrics: string
}

// Language options
const languageOptions = [
  { code: 'en', name: 'English', lyrics: 'And here we are together' },
  { code: 'es', name: 'Español', lyrics: 'Y aquí estamos juntos' },
  { code: 'fr', name: 'Français', lyrics: 'Et nous voilà ensemble' }
]

export default function VideoEmbed({ nowPlaying, lyrics }: VideoEmbedProps) {
  const [isClient, setIsClient] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const [showLangMenu, setShowLangMenu] = useState(false)
  const [showAccessibility, setShowAccessibility] = useState(false)
  const [dyslexiaMode, setDyslexiaMode] = useState(false)
  const [highContrast, setHighContrast] = useState(false)
  const [performerTracking, setPerformerTracking] = useState(true)
  const [textSize, setTextSize] = useState(1)
  const [lyricsPosition, setLyricsPosition] = useState({ x: 50, y: 85 })
  const [gestureStartX, setGestureStartX] = useState(0)
  const [currentLyric, setCurrentLyric] = useState(languageOptions[0].lyrics)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const [isZoomed, setIsZoomed] = useState(false)
  const [touchStartTime, setTouchStartTime] = useState(0)
  
  // Simulate performer tracking with zoom effect
  useEffect(() => {
    if (performerTracking) {
      const interval = setInterval(() => {
        setIsZoomed(prev => !prev);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [performerTracking]);

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

  const handleTouchStart = (e: React.TouchEvent) => {
    setGestureStartX(e.touches[0].clientX)
    setTouchStartTime(Date.now())
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX
    const touchDuration = Date.now() - touchStartTime
    
    // Swipe detection
    if (touchDuration < 300) {
      const diff = touchEndX - gestureStartX
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          // Swipe right - previous language
          const currentIndex = languageOptions.findIndex(l => l.code === currentLanguage)
          const prevIndex = (currentIndex - 1 + languageOptions.length) % languageOptions.length
          setCurrentLanguage(languageOptions[prevIndex].code)
        } else {
          // Swipe left - next language
          const currentIndex = languageOptions.findIndex(l => l.code === currentLanguage)
          const nextIndex = (currentIndex + 1) % languageOptions.length
          setCurrentLanguage(languageOptions[nextIndex].code)
        }
      }
    }
  }

  const handleDoubleTap = () => {
    // Toggle accessibility menu on double tap
    setShowAccessibility(prev => !prev)
  }

  if (!isClient) {
    return (
      <div className="phone-frame mx-auto bg-black/20">
        <div className="absolute top-0 left-0 w-full p-4 text-center bg-gradient-to-b from-black/50 to-transparent z-10">
          <p className="text-sm font-medium">{nowPlaying}</p>
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-white/50">Loading video...</p>
        </div>
      </div>
    )
  }

  return (
    <div 
      ref={videoContainerRef}
      className={`phone-frame mx-auto relative ar-mode ${dyslexiaMode ? 'dyslexia-mode' : ''} ${highContrast ? 'high-contrast' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onDoubleClick={handleDoubleTap}
    >
      <div className={`relative w-full h-full overflow-hidden ${isZoomed && performerTracking ? 'zoom-effect' : ''}`}>
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
            <p className="text-sm font-medium">{nowPlaying}</p>
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
        
        {/* AR Controls - activated by gestures */}
        <div className="absolute bottom-24 right-4 flex flex-col space-y-3 z-20">
          <button 
            onClick={() => setShowLangMenu(!showLangMenu)} 
            className="ar-control-button"
          >
            <Languages className="w-5 h-5" />
          </button>
          
          <button 
            onClick={() => setShowAccessibility(!showAccessibility)} 
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
        
        {/* Language Menu Dropdown */}
        {showLangMenu && (
          <div className="absolute top-12 right-4 bg-black/70 backdrop-blur-md rounded-lg p-3 z-30">
            {languageOptions.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setCurrentLanguage(lang.code);
                  setShowLangMenu(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded ${
                  currentLanguage === lang.code ? 'bg-blue-500/30 text-white' : 'text-white/70 hover:bg-black/30'
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        )}
        
        {/* Accessibility Menu */}
        {showAccessibility && (
          <div className="absolute top-12 left-4 bg-black/70 backdrop-blur-md rounded-lg p-3 z-30">
            <div className="flex justify-between items-center mb-3">
              <span className="text-white">Dyslexia Mode</span>
              <button 
                onClick={() => setDyslexiaMode(!dyslexiaMode)}
                className={`w-10 h-5 rounded-full ${dyslexiaMode ? 'bg-blue-500' : 'bg-gray-700'} relative`}
              >
                <span className={`absolute w-4 h-4 rounded-full bg-white top-0.5 transform transition-transform ${dyslexiaMode ? 'translate-x-5' : 'translate-x-1'}`}></span>
              </button>
            </div>
            
            <div className="flex justify-between items-center mb-3">
              <span className="text-white">High Contrast</span>
              <button 
                onClick={() => setHighContrast(!highContrast)}
                className={`w-10 h-5 rounded-full ${highContrast ? 'bg-blue-500' : 'bg-gray-700'} relative`}
              >
                <span className={`absolute w-4 h-4 rounded-full bg-white top-0.5 transform transition-transform ${highContrast ? 'translate-x-5' : 'translate-x-1'}`}></span>
              </button>
            </div>
            
            <div className="mb-3">
              <span className="text-white block mb-2">Text Size</span>
              <div className="flex justify-between items-center">
                <button 
                  onClick={() => setTextSize(Math.max(0.8, textSize - 0.1))}
                  className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full"
                >
                  -
                </button>
                <div className="mx-2 text-white">{Math.round(textSize * 100)}%</div>
                <button 
                  onClick={() => setTextSize(Math.min(1.5, textSize + 0.1))}
                  className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Lyrics Display */}
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
        
        {/* Usage Instructions - fades out after 5 seconds */}
        <div className="absolute inset-0 flex items-center justify-center instruction-overlay">
          <div className="bg-black/50 backdrop-blur-sm px-6 py-4 rounded-xl max-w-xs text-center">
            <p className="text-white text-sm mb-2">Swipe left/right to change language</p>
            <p className="text-white text-sm mb-2">Double tap to access settings</p>
            <p className="text-white text-sm">Tap icons for additional controls</p>
          </div>
        </div>
      </div>
    </div>
  )
}

