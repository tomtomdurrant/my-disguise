import { expect, test, describe, it } from "vitest";
import { consolidateSystemInfo } from "~/lib/disguise/consolidate";
import type { StatusGetSessionResponse, DetectSystemsResponse, StatusListHealthResponse } from "~/lib/disguise/types";

const mockSessionResponse: StatusGetSessionResponse = {
  status: {
    code: 0,
    message: "",
    details: [],
  },
  result: {
    isRunningSolo: false,
    isDirectorDedicated: false,
    director: {
      uid: "6045413402460544786",
      name: "dis101",
      hostname: "DIS101",
      type: "SoloV1",
    },
    actors: [],
    understudies: [
      {
        uid: "9235345221634255976",
        name: "dis102",
        hostname: "DIS102",
        type: "SoloV1",
      },
    ],
  },
};

const mockSystemsResponse: DetectSystemsResponse = {
  status: {
    code: 1000,
    message: "Not every system was populated.",
    details: [
      {
        "@type": "type.googleapis.com/d3api.ExStatusDetail",
        uid: "DIS101",
        message: "Cannot get the runningProject for hostname: DIS101",
      },
      {
        "@type": "type.googleapis.com/d3api.ExStatusDetail",
        uid: "DIS102",
        message: "Cannot get the runningProject for hostname: DIS102",
      },
    ],
  },
  result: [
    {
      hostname: "DIS101",
      type: "Solo",
      version: {
        major: 27,
        minor: 4,
        hotfix: 3,
        revision: 186729,
      },
      runningProject: "",
      ipAddress: "127.0.0.1",
      isDesignerRunning: true,
      isServiceRunning: true,
      isManagerRunning: true,
      isNotchHostRunning: false,
    },
    {
      hostname: "DIS102",
      type: "Solo",
      version: {
        major: 27,
        minor: 4,
        hotfix: 1,
        revision: 185492,
      },
      runningProject: "",
      ipAddress: "10.101.1.2",
      isDesignerRunning: true,
      isServiceRunning: true,
      isManagerRunning: true,
      isNotchHostRunning: false,
    },
    {
      hostname: "SPC101",
      type: "Designer",
      version: {
        major: 18,
        minor: 1,
        hotfix: 12,
        revision: 171491,
      },
      runningProject: "",
      ipAddress: "10.101.1.6",
      isDesignerRunning: false,
      isServiceRunning: false,
      isManagerRunning: false,
      isNotchHostRunning: false,
    },
  ],
};

const mockHealthResponse: StatusListHealthResponse = {
  status: {
    code: 0,
    message: "",
    details: [],
  },
  result: [
    {
      machine: {
        uid: "6045413402460544786",
        name: "dis101",
        hostname: "DIS101",
      },
      runningAsMachine: {
        uid: "6045413402460544786",
        name: "dis101",
        hostname: "DIS101",
      },
      status: {
        averageFPS: 49.9994507,
        videoDroppedFrames: 25,
        videoMissedFrames: 1,
        states: [
          {
            name: "Live Update",
            detail: "Director",
            category: "connection",
            severity: "ready",
          },
          {
            name: "Osc",
            detail: "Idle",
            category: "devices",
            severity: "ready",
          },
          {
            name: "Framelock",
            detail: "OK",
            category: "output",
            severity: "ready",
          },
          {
            name: "Settings",
            detail: "OK",
            category: "output",
            severity: "ready",
          },
          {
            name: "Genlock",
            detail: "Not supported",
            category: "genlock",
            severity: "offline",
          },
        ],
      },
    },
    {
      machine: {
        uid: "9235345221634255976",
        name: "dis102",
        hostname: "DIS102",
      },
      runningAsMachine: {
        uid: "9235345221634255976",
        name: "dis102",
        hostname: "DIS102",
      },
      status: {
        averageFPS: 49.9990387,
        videoDroppedFrames: 25,
        videoMissedFrames: 1,
        states: [
          {
            name: "Live Update",
            detail: "Connected",
            category: "connection",
            severity: "ready",
          },
          {
            name: "Project Sync",
            detail: "OK",
            category: "connection",
            severity: "ready",
          },
          {
            name: "Transport Control",
            detail: "In sync",
            category: "connection",
            severity: "ready",
          },
          {
            name: "Osc",
            detail: "Idle",
            category: "devices",
            severity: "ready",
          },
          {
            name: "Framelock",
            detail: "OK",
            category: "output",
            severity: "ready",
          },
          {
            name: "Settings",
            detail: "OK",
            category: "output",
            severity: "ready",
          },
          {
            name: "Genlock",
            detail: "Not supported",
            category: "genlock",
            severity: "offline",
          },
        ],
      },
    },
  ],
};

describe("consolidateSystemInfo", () => {
  it("should consolidate system info correctly", () => {
    const result = consolidateSystemInfo(mockSessionResponse, mockSystemsResponse, mockHealthResponse);

    expect(result.director).toBeDefined();
    expect(result.director.hostname).toBe("DIS101");
    expect(result.director.isDirectorDedicated).toBe(false);
    expect(result.director.version).toEqual({ major: 27, minor: 4, hotfix: 3, revision: 186729 });
    expect(result.director.health).toBeDefined();
    expect(result.director.health?.averageFPS).toBe(49.9994507);

    expect(result.actors).toHaveLength(0);

    expect(result.understudies).toHaveLength(1);
    expect(result.understudies[0].hostname).toBe("DIS102");
    expect(result.understudies[0].health?.averageFPS).toBe(49.9990387);

    expect(result.isRunningSolo).toBe(false);
    expect(result.director.status).toBeDefined();
    expect(result.director.status.message).toBe("Not every system was populated.");
    console.log(result.director.status);
    // expect(result.designers).toBeDefined();
  });

  it("should handle solo system correctly", () => {
    const soloSessionResponse: StatusGetSessionResponse = {
      ...mockSessionResponse,
      result: { ...mockSessionResponse.result, isRunningSolo: true, director: undefined, actors: [], understudies: [] },
    };

    const result = consolidateSystemInfo(soloSessionResponse, mockSystemsResponse, mockHealthResponse);

    expect(result.director).toBeDefined();
    expect(result.director.hostname).toBe("DIS101");
    expect(result.director.isDirectorDedicated).toBe(false);
    expect(result.actors).toHaveLength(0);
    expect(result.understudies).toHaveLength(0);
    expect(result.isRunningSolo).toBe(true);
  });

  it.skip("should handle missing director correctly", () => {
    const noDirectorSessionResponse: StatusGetSessionResponse = {
      ...mockSessionResponse,
      result: { ...mockSessionResponse.result, director: undefined },
    };

    const result = consolidateSystemInfo(noDirectorSessionResponse, mockSystemsResponse, mockHealthResponse);

    expect(result.director).toBeDefined();
    expect(result.director.uid).toBe("unknown");
    expect(result.director.name).toBe("Unknown Solo System");
    expect(result.director.hostname).toBe("unknown");
    expect(result.director.type).toBe("Unknown");
    expect(result.director.isDirectorDedicated).toBe(false);
  });

  it("should handle missing system info correctly", () => {
    const result = consolidateSystemInfo(
      mockSessionResponse,
      {
        status: { code: 0, message: "OK", details: [] },
        result: [],
      },
      mockHealthResponse
    );

    expect(result.director).toBeDefined();
    expect(result.director.hostname).toBe("DIS101");
    expect(result.director.version).toBeUndefined();
    expect(result.director.ipAddress).toBeUndefined();
    expect(result.director.runningProject).toBeUndefined();
    expect(result.director.systemError).toBe("something went wrong with the system info");
  });

  it("should handle missing health info correctly", () => {
    const result = consolidateSystemInfo(mockSessionResponse, mockSystemsResponse, {
      status: {
        code: 0,
        message: "OK",
        details: [],
      },
      result: [],
    });

    expect(result.director).toBeDefined();
    expect(result.director.hostname).toBe("DIS101");
    expect(result.director.health).toBeDefined();
    expect(result.director.health.error).toBeDefined();

  });
});
