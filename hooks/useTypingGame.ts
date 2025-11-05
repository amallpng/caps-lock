import { useState, useEffect, useCallback } from 'react';

export type GameStatus = 'waiting' | 'started' | 'finished';

export interface TypingStats {
  wpm: number;
  accuracy: number;
  time: number;
}

const useTypingGame = (textToType: string, timeLimit: number) => {
  const [status, setStatus] = useState<GameStatus>('waiting');
  const [typedText, setTypedText] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [errors, setErrors] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [wpm, setWpm] = useState(0);

  // Reset hook state when text or time limit changes
  useEffect(() => {
    setTimeLeft(timeLimit);
    reset();
  }, [textToType, timeLimit]);

  // Main game timer
  useEffect(() => {
    if (status !== 'started') {
      return;
    }

    // End condition: time runs out (for timed tests)
    if (timeLeft <= 0) {
      setStatus('finished');
      setEndTime(Date.now());
      setWpm(0);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
      if (startTime) {
        const elapsedSeconds = (Date.now() - startTime) / 1000;
        const correctCharsSoFar = typedText
          .split('')
          .filter((char, index) => char === textToType[index])
          .length;
        // Standard WPM is (characters / 5) / minutes
        const currentWpm = elapsedSeconds > 0 
          ? Math.round((correctCharsSoFar / 5) / (elapsedSeconds / 60))
          : 0;
        setWpm(currentWpm);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [status, timeLeft, startTime, typedText, textToType]);

  const handleKeyDown = (key: string) => {
    if (status === 'finished' || (key.length > 1 && key !== 'Backspace')) return;
    
    if (status === 'waiting' && key !== 'Backspace' && key.length === 1) {
      setStatus('started');
      setStartTime(Date.now());
    }

    if (key === 'Backspace') {
      setTypedText(prev => prev.slice(0, -1));
    } else if (key.length === 1) { // Only handle single character keys
      const newTypedText = typedText + key;
      if (newTypedText.length <= textToType.length) {
        setTypedText(newTypedText);
        if (key !== textToType[typedText.length]) { // Check against current character
          setErrors(prev => prev + 1);
        }
      }
    }
  };
  
  // End condition: text is fully typed
  useEffect(() => {
    if (status === 'started' && typedText.length === textToType.length) {
      setStatus('finished');
      setEndTime(Date.now());
      setWpm(0); // Clear live WPM
    }
  }, [typedText, textToType, status]);


  const getStats = useCallback((): TypingStats => {
    if (!startTime || status !== 'finished') return { wpm: 0, accuracy: 0, time: 0 };
    
    const finalTime = endTime || Date.now();
    const durationInSeconds = (finalTime - startTime) / 1000;
    const durationInMinutes = durationInSeconds / 60;
    
    const correctChars = typedText.split('').filter((char, index) => char === textToType[index]).length;
    // Standard WPM calculation based on characters (word = 5 chars)
    const finalWpm = durationInMinutes > 0 ? Math.round((correctChars / 5) / durationInMinutes) : 0;
    
    const totalTypedChars = typedText.length;
    // Calculate accuracy based on correct characters vs total typed characters
    const accuracy = totalTypedChars > 0 ? Math.round((correctChars / totalTypedChars) * 100) : 0;

    return { wpm: finalWpm, accuracy, time: durationInSeconds };
  }, [startTime, endTime, typedText, textToType, status]);

  const reset = useCallback(() => {
    setStatus('waiting');
    setTypedText('');
    setStartTime(null);
    setEndTime(null);
    setErrors(0);
    setTimeLeft(timeLimit);
    setWpm(0);
  }, [timeLimit]);

  return { status, typedText, textToType, timeLeft, wpm, handleKeyDown, stats: getStats(), reset };
};

export default useTypingGame;
