import { useState, useEffect } from 'react';

export const useVisitorCount = () => {
  const [visitorCount, setVisitorCount] = useState(1337);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorCount(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return visitorCount;
};