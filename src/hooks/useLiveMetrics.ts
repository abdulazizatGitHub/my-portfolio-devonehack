// src/hooks/useLiveMetrics.ts
'use client';

import { useEffect, useState, useRef } from 'react';
import { LiveMetrics } from '@/types';

export function useLiveMetrics(pollInterval = 5000) {
  const [liveMetrics, setLiveMetrics] = useState<LiveMetrics>({
    cpuUsage: 4.0,
    memoryUsage: 10.0,
    neuralActivity: 3.0,
    taskQueue: 0,
  });
  const [visitorCount, setVisitorCount] = useState<number>(0);
  const [commitsInfo, setCommitsInfo] = useState<any>(null);

  const intervalRef = useRef<number | null>(null);

  const fetchAll = async () => {
    try {
      // system
      const sysRes = await fetch('/api/system');
      if (sysRes.ok) {
        const sys = await sysRes.json();
        setLiveMetrics({
          cpuUsage: Number(sys.cpuUsage ?? 0),
          memoryUsage: Number(sys.memoryUsage ?? 0),
          neuralActivity: Number(sys.neuralActivity ?? 0),
          taskQueue: Number(sys.taskQueue ?? 0),
        });
      }

      // visitors
      const visRes = await fetch('/api/visitors');
      if (visRes.ok) {
        const json = await visRes.json();
        setVisitorCount(Number(json.count ?? 0));
      }

      // commits (cached server-side)
      const commitsRes = await fetch('/api/commits');
      if (commitsRes.ok) {
        const data = await commitsRes.json();
        setCommitsInfo(data);
      }
    } catch (err) {
      // ignore network glitches — keep old values
      console.warn('useLiveMetrics fetch error', err);
    }
  };

  useEffect(() => {
    // initial fetch
    fetchAll();

    // increment visitor once per session (fire-and-forget)
    (async () => {
      try {
        await fetch('/api/visitors', { method: 'POST' });
        const r = await fetch('/api/visitors');
        const json = await r.json();
        setVisitorCount(Number(json.count ?? 0));
      } catch (e) {
        // ignore
      }
    })();

    // start interval
    intervalRef.current = window.setInterval(fetchAll, pollInterval);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return { liveMetrics, visitorCount, commitsInfo, refresh: fetchAll };
}
