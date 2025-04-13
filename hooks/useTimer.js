import { useState, useEffect } from 'react';

export const useTimer = (initialTime = 0, taskId) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => {
          const newTime = prev + 1;
          localStorage.setItem(`timer_${taskId}`, newTime);
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, taskId]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setTime(0);
    localStorage.setItem(`timer_${taskId}`, '0');
  };

  return { time, isRunning, start, pause, reset };
};