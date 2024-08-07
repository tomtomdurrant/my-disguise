import type {
    ActiveTransport, HealthResponse, ListProjectsResponse,
    SessionResponse,
    SystemsResponse, TransportListAnnotations,
    TransportListTracksResponse
} from "~/lib/disguise/schema";
export interface SocketStateType {
    connected: boolean;
    transport: string;
    lastMessageTime: Date | null;
}


export interface ServerToClientEvents {
    systems: (systems: SystemsResponse) => void;
    session: (session: SessionResponse) => void;
    tracks: (tracks: TransportListTracksResponse) => void;
    annotations: (annotations: Array<TransportListAnnotations>) => void;
    active: (active: ActiveTransport) => void;
    health: (health: HealthResponse) => void;
    projects: (projects: ListProjectsResponse) => void;
    confirmation: (confirmation: "connected!") => void;
    engageStatus: (status: "engaged" | "disengaged") => void;
    osc_trackposition: (data: string | number) => void;
    osc_timecodeposition: (data: string) => void;
    osc_sectionhint: (data: string) => void;
    osc_heartbeat: (data: number) => void;
    osc_trackname: (data: string) => void;
    osc_currentsectionname: (data: string) => void;
    osc_nextsectionname: (data: string) => void;
    osc_playmode: (data: string) => void;
    osc_brightness: (data: string) => void;
    osc_volume: (data: string) => void;
    osc_bpm: (data: string) => void;
    time: (data: string) => void;
}

export interface ClientToServerEvents {
    powerOn: (arg0: any) => void;
    disengage: (arg0: any) => void;
    "/session/transport/engage": (data: string) => void;
    "/d3/showcontrol/cue": (data: string) => void;
}


export interface HttpData {
    active: ActiveTransport | null;
    time: string | null;
    systems: SystemsResponse | null;
    session: SessionResponse | null;
    tracks: TransportListTracksResponse | null;
    annotations: Array<TransportListAnnotations> | null;
    health: HealthResponse | null;
    projects: ListProjectsResponse | null;
}

export interface OscData {
    osc_trackposition: string | null;
    osc_timecodeposition: string | null,
    osc_sectionhint: string | null,
    osc_heartbeat: string | null,
    osc_trackname: string | null,
    osc_currentsectionname: string | null,
    osc_brightness: string | null
}


