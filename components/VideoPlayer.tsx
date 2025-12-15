"use client"

import React, { useState } from "react"
import ReactPlayer from "react-player"
import { Play } from "lucide-react"

interface VideoPlayerProps {
  url: string
  thumbnail?: string
  title?: string
  className?: string
}

export default function VideoPlayer({ url, thumbnail, title, className = "" }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false)
  const [showPlayer, setShowPlayer] = useState(false)

  const handlePlay = () => {
    setShowPlayer(true)
    setPlaying(true)
  }

  return (
    <div className={`relative rounded-xl overflow-hidden ${className}`}>
      {!showPlayer ? (
        <div className="relative cursor-pointer group" onClick={handlePlay}>
          <img
            src={thumbnail || "/placeholder-video.jpg"}
            alt={title || "Video thumbnail"}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
            <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Play className="h-10 w-10 text-blue-600 ml-1" />
            </div>
          </div>
          {title && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-white font-semibold">{title}</p>
            </div>
          )}
        </div>
      ) : (
        <ReactPlayer
          url={url}
          playing={playing}
          controls
          width="100%"
          height="100%"
          className="react-player"
        />
      )}
    </div>
  )
}
