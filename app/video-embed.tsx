"use client"

import { useEffect, useState, useRef } from "react"
import dynamic from "next/dynamic"
import { Camera } from "lucide-react"

// Dynamically import ReactPlayer with no SSR to avoid hydration issues
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false })

interface VideoEmbedProps {
  nowPlaying: string
  lyrics: string
}

export default function VideoEmbed({ nowPlaying, lyrics }: VideoEmbedProps) {
  const [isClient, setIsClient] = useState(false)
  const [isARMode, setIsARMode] = useState(true)
  const [lastClickTime, setLastClickTime] = useState(0)
  const [lyricsPosition, setLyricsPosition] = useState({ x: 50, y: 85 })
  const videoContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsClient(true)
    // Animate lyrics position with a more subtle movement
    const interval = setInterval(() => {
      setLyricsPosition({
        x: 50 + Math.sin(Date.now() / 2000) * 3, // Reduced movement range
        y: 85 + Math.cos(Date.now() / 2500) * 2  // Reduced movement range
      })
    }, 50)

    return () => clearInterval(interval)
  }, [])

  const handleClick = () => {
    const currentTime = Date.now()
    if (currentTime - lastClickTime < 300) {
      if (!isARMode) {
        return
      }
    }
    setLastClickTime(currentTime)
  }

  const toggleARMode = () => {
    setIsARMode(!isARMode)
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
      className={`phone-frame mx-auto relative transition-transform duration-300 ${isARMode ? 'scale-105' : ''}`}
      onClick={handleClick}
    >
      <div className="absolute top-0 left-0 w-full p-4 text-center bg-gradient-to-b from-black/50 to-transparent z-10">
        <p className="text-sm font-medium">{nowPlaying}</p>
      </div>
      
      {/* AR Mode Button */}
      <button
        onClick={toggleARMode}
        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
        aria-label="Toggle AR mode"
      >
        <Camera className={`w-5 h-5 ${isARMode ? 'text-blue-400' : 'text-white/70'}`} />
      </button>

      <div className={`relative w-full h-full ${isARMode ? 'ar-mode' : ''}`}>
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
                  transform: isARMode ? 'scale(1.05)' : 'none',
                  transition: 'transform 0.3s ease-in-out',
                },
              },
            },
          }}
        />
        {isARMode && (
          <>
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent"></div>
              <div className="scan-line"></div>
            </div>
            {/* Gemini-style AR Lyrics */}
            <div 
              className="ar-lyrics-container"
              style={{
                left: `${lyricsPosition.x}%`,
                top: `${lyricsPosition.y}%`,
              }}
            >
              <div className="ar-lyrics-text">
                {lyrics}
              </div>
              <div className="ar-lyrics-marker"></div>
            </div>
            {/* AR Interface Elements */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Top AR Elements */}
              <div className="absolute top-12 left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400/50 rounded-full animate-pulse"></div>
                <div className="w-16 h-0.5 bg-blue-400/30"></div>
              </div>
              {/* Side AR Elements */}
              <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex flex-col items-center space-y-2">
                <div className="w-1 h-16 bg-blue-400/30"></div>
                <div className="w-2 h-2 bg-blue-400/50 rounded-full animate-pulse"></div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

