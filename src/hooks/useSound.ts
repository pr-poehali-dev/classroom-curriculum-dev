import { useRef, useCallback } from 'react';

const SOUNDS = {
  correct: 'https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3',
  wrong: 'https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3',
  click: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
  success: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
  flip: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
};

export const useSound = () => {
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

  const preloadSounds = useCallback(() => {
    Object.entries(SOUNDS).forEach(([key, url]) => {
      if (!audioRefs.current[key]) {
        const audio = new Audio(url);
        audio.preload = 'auto';
        audioRefs.current[key] = audio;
      }
    });
  }, []);

  const play = useCallback((soundName: keyof typeof SOUNDS, volume = 0.3) => {
    const audio = audioRefs.current[soundName];
    if (audio) {
      audio.volume = volume;
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }
  }, []);

  const playCustom = useCallback((url: string, volume = 0.3) => {
    const audio = new Audio(url);
    audio.volume = volume;
    audio.play().catch(() => {});
  }, []);

  const playCorrectSound = useCallback(() => play('correct'), [play]);
  const playWrongSound = useCallback(() => play('wrong'), [play]);
  const playClickSound = useCallback(() => play('click'), [play]);

  return { 
    play, 
    playCustom, 
    preloadSounds,
    playCorrectSound, 
    playWrongSound, 
    playClickSound 
  };
};