"use client"

import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import { Languages, Type, ZoomIn } from "lucide-react"
import { useState, useEffect, useRef } from "react"

// Dynamically import ReactPlayer with no SSR to avoid hydration issues
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false })

interface ARElement {
  id: number
  type: 'marker' | 'line' | 'dot'
  x: number
  y: number
}

export default function Home() {
  const [isClient, setIsClient] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const [showLyrics, setShowLyrics] = useState(true)
  const [performerTracking, setPerformerTracking] = useState(true)
  const [textSize, setTextSize] = useState(1)
  const [lyricsPosition, setLyricsPosition] = useState({ x: 50, y: 85 })
  const [arElements, setArElements] = useState<ARElement[]>([
    { id: 1, type: 'marker', x: 50, y: 12 },
    { id: 2, type: 'line', x: 80, y: 50 },
    { id: 3, type: 'dot', x: 20, y: 30 }
  ])
  const videoContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsClient(true)
    
    // Animate AR elements
    const interval = setInterval(() => {
      setArElements((elements: ARElement[]) => elements.map((el: ARElement) => ({
        ...el,
        x: el.x + Math.sin(Date.now() / 2000 + el.id) * 0.5,
        y: el.y + Math.cos(Date.now() / 2500 + el.id) * 0.5
      })))
      
      setLyricsPosition({
        x: 50 + Math.sin(Date.now() / 2000) * 3,
        y: 85 + Math.cos(Date.now() / 2500) * 2
      })
    }, 50)
    
    return () => clearInterval(interval)
  }, [])

  if (!isClient) return null

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div 
          ref={videoContainerRef}
          className="phone-frame mx-auto relative ar-mode"
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
            
            {/* Dynamic AR Elements */}
            <div className="absolute inset-0 pointer-events-none">
              {arElements.map((element) => (
                <div
                  key={element.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${element.x}%`, top: `${element.y}%` }}
                >
                  {element.type === 'marker' && (
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400/50 rounded-full animate-pulse"></div>
                      <div className="w-16 h-0.5 bg-blue-400/30"></div>
                    </div>
                  )}
                  {element.type === 'line' && (
                    <div className="w-1 h-16 bg-blue-400/30"></div>
                  )}
                  {element.type === 'dot' && (
                    <div className="w-2 h-2 bg-blue-400/50 rounded-full animate-pulse"></div>
                  )}
                </div>
              ))}
              
              {/* Scan line effect */}
              <div className="scan-line"></div>
            </div>
            
            {/* AR Controls */}
            <div className="absolute bottom-24 right-4 flex flex-col space-y-3 z-20">
              <button 
                onClick={() => setCurrentLanguage(currentLanguage === 'en' ? 'es' : 'en')}
                className="ar-control-button"
              >
                <Languages className="w-5 h-5" />
              </button>
              
              <button 
                onClick={() => setShowLyrics(!showLyrics)}
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
                  {currentLanguage === 'en' ? 'And here we are together' : 'Y aquí estamos juntos'}
                </div>
                <div className="ar-lyrics-marker"></div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </main>
  )
}

