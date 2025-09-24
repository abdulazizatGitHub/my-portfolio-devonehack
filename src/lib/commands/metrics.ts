import { Command } from "@/types";

export const metricsCommands: Record<string, Command> = {
  metrics: {
    description: "Shows live system metrics.",
    run: (_args: string[] = [], { liveMetrics }: any) => {
      return {
        type: "output",
        content: [
          `CPU Usage: ${liveMetrics.cpuUsage.toFixed(1)}%`,
          `Memory: ${liveMetrics.memoryUsage.toFixed(1)}%`,
          `Neural Activity: ${liveMetrics.neuralActivity.toFixed(1)}%`,
          `Task Queue: ${liveMetrics.taskQueue} pending`,
        ].join("\n"),
      };
    },
  },
};
