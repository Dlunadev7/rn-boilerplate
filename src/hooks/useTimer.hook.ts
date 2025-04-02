/* eslint-disable no-undef */
import { useState, useEffect } from 'react';

interface UseTimerReturn {
  formattedTime: string;
  start: () => void;
  reset: () => void;
  stop: () => void;
}
const useTimer = (initialSeconds: number = 120): UseTimerReturn => {
  const [seconds, setSeconds] = useState<number>(initialSeconds);
  const [isActive, setIsActive] = useState<boolean>(false);
  let interval: NodeJS.Timeout | null = null;

  useEffect(() => {
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds <= 1) {
            clearInterval(interval!);
            setIsActive(false);
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval!);
    }
    return () => clearInterval(interval!);
  }, [isActive]);

  const start = () => setIsActive(true);
  const reset = () => {
    setSeconds(initialSeconds);
    setIsActive(true);
  };
  const stop = () => {
    setIsActive(false);
    clearInterval(interval!);
  };

  const formatTime = (secs: number): string => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return {
    formattedTime: formatTime(seconds),
    start,
    reset,
    stop,
  };
};

export default useTimer;
