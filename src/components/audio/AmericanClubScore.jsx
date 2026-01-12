import React, { useEffect, useRef, useState } from "react";

const SCORE_SOURCE = "media/canon_in_d.mp4";

export default function AmericanClubScore() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return undefined;
    }
    audio.volume = 0.35;
    const attemptAutoplay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        setAutoplayBlocked(false);
      } catch (error) {
        setIsPlaying(false);
        setAutoplayBlocked(true);
      }
    };
    attemptAutoplay();
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
        setAutoplayBlocked(false);
      } catch (error) {
        setAutoplayBlocked(true);
      }
      return;
    }
    audio.pause();
    setIsPlaying(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      <audio
        ref={audioRef}
        src={SCORE_SOURCE}
        preload="auto"
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <div className="club-panel flex items-center gap-4 px-4 py-3 shadow-xl">
        <div className="font-club-body text-[9px] uppercase tracking-[0.35em] club-muted">
          Canon in D
        </div>
        <button
          type="button"
          onClick={togglePlayback}
          className="club-action-accent text-[10px] uppercase tracking-[0.3em] px-3 py-2"
        >
          {autoplayBlocked && !isPlaying ? "Play score" : isPlaying ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  );
}
