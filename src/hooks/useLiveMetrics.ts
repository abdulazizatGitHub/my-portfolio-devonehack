import { useState, useEffect } from 'react';
import { LiveMetrics } from '@/types';

export const useLiveMetrics = () => {
  const [liveMetrics, setLiveMetrics] = useState<LiveMetrics>({
    cpuUsage: 45,
    memoryUsage: 62,
    neuralActivity: 78,
    taskQueue: 12
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics(prev => ({
        cpuUsage: Math.max(20, Math.min(90, prev.cpuUsage + (Math.random() - 0.5) * 10)),
        memoryUsage: Math.max(30, Math.min(85, prev.memoryUsage + (Math.random() - 0.5) * 8)),
        neuralActivity: Math.max(40, Math.min(95, prev.neuralActivity + (Math.random() - 0.5) * 12)),
        taskQueue: Math.max(0, Math.min(50, prev.taskQueue + Math.floor((Math.random() - 0.5) * 6)))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return liveMetrics;
};