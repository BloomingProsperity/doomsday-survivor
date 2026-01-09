/*
 * 音效管理Hook
 * 提供游戏音效播放功能
 */

import { useCallback, useRef, useState } from 'react';

// 音效类型定义
type SoundType = 'click' | 'attack' | 'defense' | 'skill' | 'victory' | 'defeat' | 'card_draw' | 'upgrade';

// 使用Web Audio API生成简单的合成音效
const createOscillator = (
  audioContext: AudioContext,
  frequency: number,
  duration: number,
  type: OscillatorType = 'sine',
  volume: number = 0.3
) => {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
  
  gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);
};

// 音效配置
const soundConfigs: Record<SoundType, { frequencies: number[]; duration: number; type: OscillatorType }> = {
  click: { frequencies: [800, 1000], duration: 0.1, type: 'sine' },
  attack: { frequencies: [200, 150, 100], duration: 0.2, type: 'sawtooth' },
  defense: { frequencies: [400, 500, 600], duration: 0.15, type: 'triangle' },
  skill: { frequencies: [600, 800, 1000, 1200], duration: 0.3, type: 'sine' },
  victory: { frequencies: [523, 659, 784, 1047], duration: 0.5, type: 'sine' },
  defeat: { frequencies: [400, 300, 200, 100], duration: 0.6, type: 'sawtooth' },
  card_draw: { frequencies: [1000, 1200], duration: 0.08, type: 'sine' },
  upgrade: { frequencies: [400, 600, 800, 1000, 1200], duration: 0.4, type: 'triangle' },
};

export function useSound() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playSound = useCallback((soundType: SoundType) => {
    if (isMuted) return;
    
    try {
      const audioContext = initAudioContext();
      const config = soundConfigs[soundType];
      
      config.frequencies.forEach((freq, index) => {
        setTimeout(() => {
          createOscillator(
            audioContext,
            freq,
            config.duration,
            config.type,
            0.2
          );
        }, index * 50);
      });
    } catch (error) {
      console.warn('Audio playback failed:', error);
    }
  }, [isMuted, initAudioContext]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  return {
    playSound,
    isMuted,
    toggleMute,
  };
}

export default useSound;
