'use client'

import { useRef, useState } from 'react'
import SectionHeading from '@/components/ui/SectionHeading'

// TO ADD YOUR VIDEO: replace the src paths below with your actual video filenames
// Place your video files in the /public/videos/ folder
// Then change src="/videos/placeholder.mp4" to src="/videos/your-actual-video.mp4"
const VIDEOS = [
  {
    src: '/videos/placeholder.mp4', // REPLACE with your actual video path
    title: 'Understanding Your Bail Rights',
    meta: 'Legal Insights • 3 min',
  },
  {
    src: '/videos/placeholder.mp4', // REPLACE with your actual video path
    title: 'How to File an FIR Correctly',
    meta: 'Legal Insights • 4 min',
  },
  {
    src: '/videos/placeholder.mp4', // REPLACE with your actual video path
    title: 'Know Your Rights in a Civil Dispute',
    meta: 'Legal Insights • 5 min',
  },
]

function VideoCard({ src, title, meta }: { src: string; title: string; meta: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.style.display = 'block'
      videoRef.current.play().catch(() => {
        // No video source set — expected in dev
      })
      setPlaying(true)
    }
  }

  return (
    <div
      className="bg-dark-card border border-[#252525] rounded-xl overflow-hidden group cursor-pointer"
      data-aos="fade-up"
    >
      <div
        className="relative bg-black/80"
        style={{ aspectRatio: '16/9' }}
        onClick={handlePlay}
      >
        <video
          ref={videoRef}
          src={src}
          preload="none"
          controls
          style={{ display: playing ? 'block' : 'none', width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-gold/90 flex items-center justify-center group-hover:bg-gold group-hover:scale-110 transition-all duration-300 shadow-lg">
              <i className="fas fa-play text-black text-base ml-1" aria-hidden="true" />
            </div>
          </div>
        )}
      </div>
      <div className="p-5">
        <p className="font-serif text-white text-base mb-1">{title}</p>
        <p className="text-text-gray text-xs">{meta}</p>
      </div>
    </div>
  )
}

export default function VideoInsightsSection() {
  return (
    <section className="section-padding bg-black">
      <div className="site-container">
        <SectionHeading
          tag="Courtroom Insights"
          title="Insights from the Courtroom"
          subtitle="Real updates, legal awareness, and courtroom insights."
          center
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          {VIDEOS.map((v, i) => (
            <VideoCard key={i} {...v} />
          ))}
        </div>
      </div>
    </section>
  )
}
