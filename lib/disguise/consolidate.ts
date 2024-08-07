import {z} from "zod";
import {
    detectSystemsResponseSchema,
    statusGetSessionResponseSchema,
    statusListHealthResponseSchema,
} from "./schema";

type StatusGetSessionResponse = z.infer<typeof statusGetSessionResponseSchema>;
type DetectSystemsResponse = z.infer<typeof detectSystemsResponseSchema>;
type StatusListHealthResponse = z.infer<typeof statusListHealthResponseSchema>;

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
    health?: {
        averageFPS: number;
        videoDroppedFrames: number;
        videoMissedFrames: number;
        states: Array<{
            name: string;
            detail: string;
            category: string;
            severity: string;
        }>;
    };
    status: {
        code: number;
        message: string;
        details: Array<{ uid: string; message: string }>;
    };
}

interface ConsolidatedInfo {
    director: ConsolidatedSystemInfo & { isDirectorDedicated: boolean };
    actors: ConsolidatedSystemInfo[];
    understudies: ConsolidatedSystemInfo[];
    isRunningSolo: boolean;
}

const detailSchema = z
    .object({
        uid: z.string().optional(),
        "@type": z.string().optional(),
        message: z.string(),
    })
    .transform(({uid, "@type": type, message}) => ({
        uid: uid || type || "unknown",
        message,
    }));

const detailsArraySchema = z
    .array(
        z.union([
            z.string(),
            detailSchema,
            z
                .unknown()
                .transform((d) => ({uid: "unknown", message: JSON.stringify(d)})),
        ]),
    )
    .transform((details) =>
        details.map((d) => {
            if (typeof d === "string") return {uid: "unknown", message: d};
            return d;
        }),
    );

const extractDetails = (
    details: any[],
): Array<{ uid: string; message: string }> => {
    return details.map((d) => {
        if (typeof d === "string") {
            return {uid: "unknown", message: d};
        } else if (d && typeof d === "object") {
            return {
                uid: d.uid || d["@type"] || "unknown",
                message: d.message || JSON.stringify(d),
            };
        }
        return {uid: "unknown", message: String(d)};
    });
};

export function consolidateSystemInfo(
    sessionResponse: StatusGetSessionResponse,
    systemsResponse: DetectSystemsResponse,
    healthResponse: StatusListHealthResponse,
): ConsolidatedInfo {
    const systemsMap = new Map(
        systemsResponse.result.map((s) => [s.hostname.toLowerCase(), s]),
    );
    const healthMap = new Map(
        healthResponse.result.map((h) => [h.machine.hostname.toLowerCase(), h]),
    );
    // Helper function to find the solo system
    const findSoloSystem = (): ConsolidatedSystemInfo | null => {
        const soloSystem = systemsResponse.result.find((s) => s.isDesignerRunning);
        if (soloSystem) {
            return processSystem(
                {
                    uid: soloSystem.hostname,
                    name: soloSystem.hostname,
                    hostname: soloSystem.hostname,
                    type: soloSystem.type,
                },
                "director",
            );
        }
        return null;
    };

    const processSystem = (
        system: { uid: string; name: string; hostname: string; type: string },
        role: "director" | "actor" | "understudy",
    ): ConsolidatedSystemInfo => {
        const systemInfo = systemsMap.get(system.hostname.toLowerCase());
        const healthInfo = healthMap.get(system.hostname.toLowerCase());
        const sessionDetails = detailsArraySchema
            .parse(sessionResponse.status.details)
            .filter((d) => d.uid === system.hostname);
        const systemDetails = detailsArraySchema
            .parse(systemsResponse.status.details)
            .filter((d) => d.uid === system.hostname);
        const healthDetails = detailsArraySchema
            .parse(healthResponse.status.details)
            .filter((d) => d.uid === system.hostname);

        const x = {
            ...system,
            role,
            ...(systemInfo && {
                version: systemInfo.version,
                ipAddress: systemInfo.ipAddress,
                runningProject: systemInfo.runningProject,
                isDesignerRunning: systemInfo.isDesignerRunning,
                isServiceRunning: systemInfo.isServiceRunning,
                isManagerRunning: systemInfo.isManagerRunning,
                isNotchHostRunning: systemInfo.isNotchHostRunning,
            }),
            ...(healthInfo && {
                health: {
                    averageFPS: healthInfo.status.averageFPS,
                    videoDroppedFrames: healthInfo.status.videoDroppedFrames,
                    videoMissedFrames: healthInfo.status.videoMissedFrames,
                    states: healthInfo.status.states,
                },
            }),
            status: {
                code: Math.max(
                    sessionResponse.status.code,
                    systemsResponse.status.code,
                    healthResponse.status.code,
                ),
                message: [
                    sessionResponse.status.message,
                    systemsResponse.status.message,
                    healthResponse.status.message,
                ]
                    .filter(Boolean)
                    .join("; "),
                details: [...sessionDetails, ...systemDetails, ...healthDetails],
            },
        };
        return x;
    };
    if (sessionResponse.result.isRunningSolo) {
        const soloSystem = findSoloSystem();
        return {
            director: soloSystem
                ? {
                    ...soloSystem,
                    isDirectorDedicated: false,
                }
                : {
                    uid: "unknown",
                    name: "Unknown Solo System",
                    hostname: "unknown",
                    type: "Unknown",
                    role: "director",
                    isDirectorDedicated: false,
                    status: {
                        code: sessionResponse.status.code,
                        message: sessionResponse.status.message,
                        details: [],
                    },
                },
            actors: [],
            understudies: [],
            isRunningSolo: true,
        };
    }

    return {
        director: {
            ...processSystem(sessionResponse.result.director!, "director"),
            isDirectorDedicated: sessionResponse.result.isDirectorDedicated,
        },
        actors: sessionResponse.result.actors.map((a) => processSystem(a, "actor")),
        understudies: sessionResponse.result.understudies.map((u) =>
            processSystem(u, "understudy"),
        ),
        isRunningSolo: sessionResponse.result.isRunningSolo,
    };
}
