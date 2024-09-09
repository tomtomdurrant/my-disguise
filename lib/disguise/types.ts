import { z } from "zod";
import { detectSystemsResponseSchema, statusD3VersionInfoSchema, statusGetSessionResponseSchema, statusListHealthResponseSchema } from "./schema";

export type StatusGetSessionResponse = z.infer<typeof statusGetSessionResponseSchema>;
export type DetectSystemsResponse = z.infer<typeof detectSystemsResponseSchema>;
export type StatusListHealthResponse = z.infer<typeof statusListHealthResponseSchema>;

export interface ConsolidatedSystemInfo {
  uid: string;
  name: string;
  hostname: string;
  type: string;
  role: "director" | "actor" | "understudy";
  version?: {
    major: number;
    minor: number;
    hotfix: number;
    revision: number;
  };
  ipAddress?: string;
  runningProject?: string;
  isDesignerRunning?: boolean;
  isServiceRunning?: boolean;
  isManagerRunning?: boolean;
  isNotchHostRunning?: boolean;
  health: {
    averageFPS?: number;
    videoDroppedFrames?: number;
    videoMissedFrames?: number;
    states?: Array<{
      name: string;
      detail: string;
      category: string;
      severity: string;
    }>;
    error?: string;
  };
  systemError?: string;
  status: {
    message: string;
    details: Array<{ uid: string; message: string }>;
  };
}

export interface ConsolidatedInfo {
  director: ConsolidatedSystemInfo & { isDirectorDedicated: boolean };
  actors: ConsolidatedSystemInfo[];
  understudies: ConsolidatedSystemInfo[];
  isRunningSolo: boolean;
}


export type D3VersionInfo = z.infer<typeof statusD3VersionInfoSchema>;
