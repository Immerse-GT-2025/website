"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

// Dynamically import ReactPlayer with no SSR to avoid hydration issues
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false })

interface VideoEmbedProps {
  nowPlaying: string
  lyrics: string
}

export default function VideoEmbed({ nowPlaying, lyrics }: VideoEmbedProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="phone-frame mx-auto bg-black/20">
        <div className="absolute top-0 left-0 w-full p-4 text-center bg-gradient-to-b from-black/50 to-transparent z-10">
          <p className="text-sm font-medium">{nowPlaying}</p>
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-white/50">Loading video...</p>
        </div>
        <div className="absolute bottom-0 left-0 w-full p-4 text-center bg-gradient-to-t from-black/50 to-transparent z-10">
          <p className="text-xl">{lyrics}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="phone-frame mx-auto">
      <div className="absolute top-0 left-0 w-full p-4 text-center bg-gradient-to-b from-black/50 to-transparent z-10">
        <p className="text-sm font-medium">{nowPlaying}</p>
      </div>
      <ReactPlayer
        url="/placeholder-video.mp4"
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
              },
            },
          },
        }}
      />
      <div className="absolute bottom-0 left-0 w-full p-4 text-center bg-gradient-to-t from-black/50 to-transparent z-10">
        <p className="text-xl">{lyrics}</p>
      </div>
    </div>
  )
}

