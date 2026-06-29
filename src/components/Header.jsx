import React from 'react';
import MusicPlayer from './MusicPlayer';

export default function Header({ isPlaying, isMuted, statusText, togglePlay, toggleMute, seekRelative }) {
  return (
    <header className="glass">
      <div className="header-logo">
        <svg className="bts-logo-header" width="16" height="18" viewBox="0 0 32 35" fill="var(--purple-neon)" style={{ marginRight: '8px', verticalAlign: 'middle', filter: 'drop-shadow(0 0 5px var(--purple-neon))' }}>
          <path d="M0 0 L12 4 L12 31 L0 35 Z" />
          <path d="M20 4 L32 0 L32 35 L20 31 Z" />
        </svg>
        ARLY's Day
      </div>
      
      <MusicPlayer 
        isPlaying={isPlaying}
        isMuted={isMuted}
        statusText={statusText}
        togglePlay={togglePlay}
        toggleMute={toggleMute}
        seekRelative={seekRelative}
      />
    </header>
  );
}
