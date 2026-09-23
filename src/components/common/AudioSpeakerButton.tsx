import React from 'react';
import { Volume2, Square } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface AudioSpeakerButtonProps {
  textToRead: string;
  label?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AudioSpeakerButton: React.FC<AudioSpeakerButtonProps> = ({
  textToRead,
  label,
  className = '',
  size = 'md'
}) => {
  const { readAloud, stopAudio, isAudioPlaying } = useApp();

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAudioPlaying) {
      stopAudio();
    } else {
      readAloud(textToRead);
    }
  };

  const sizeClasses =
    size === 'sm'
      ? 'h-8 px-2.5 text-xs'
      : size === 'lg'
      ? 'h-12 px-4 text-base'
      : 'h-10 px-3 text-sm';

  return (
    <button
      type="button"
      onClick={handleToggle}
      title="Listen in your language"
      className={`inline-flex items-center gap-1.5 font-medium rounded-lg transition-colors border ${
        isAudioPlaying
          ? 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse'
          : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
      } ${sizeClasses} ${className}`}
      aria-label="Listen audio"
    >
      {isAudioPlaying ? (
        <>
          <Square className="w-4 h-4 fill-current text-amber-700" />
          <span>{label || 'Stop'}</span>
        </>
      ) : (
        <>
          <Volume2 className="w-4 h-4 text-emerald-700" />
          <span>{label || 'Listen'}</span>
        </>
      )}
    </button>
  );
};
