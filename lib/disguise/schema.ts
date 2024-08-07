import { z } from "zod";

const rpcStatusSchema = z.object({
    code: z.number(),
    message: z.string(),
    details: z.array(
        z.object({ "@type": z.string(), uid: z.string(), message: z.string() })
    ),
});

const d3apiVec3FloatSchema = z.object({
    x: z.number(),
    y: z.number(),
    z: z.number(),
});

const d3apiLocatorSchema = z.object({
    uid: z.string(),
    name: z.string(),
});

const colourCDLInfoSchema = z.object({
    uid: z.string(),
    name: z.string(),
    slope: d3apiVec3FloatSchema,
    offset: d3apiVec3FloatSchema,
    power: d3apiVec3FloatSchema,
    saturation: z.number(),
});

const colourListCDLsResponseSchema = z.object({
    status: rpcStatusSchema,
    result: z.array(colourCDLInfoSchema),
});

const colourSetCDLRequestSchema = z.object({
    cdl: colourCDLInfoSchema,
});

const d3apiEmptyResponseSchema = z.object({
    status: rpcStatusSchema,
});

const d3apiBoolResponseSchema = z.object({
    status: rpcStatusSchema,
    result: z.boolean(),
});

const mixedrealityCameraInfoSchema = z.object({
    uid: z.string(),
    name: z.string(),
    spatialCalibration: z.object({
        uid: z.string(),
        name: z.string(),
    }),
});

const mixedrealityGetCamerasResponseSchema = z.object({
    status: rpcStatusSchema,
    result: z.array(mixedrealityCameraInfoSchema),
});

const mixedrealityCaptureObservationRequestSchema = z.object({
    camera: d3apiLocatorSchema,
    spatialCalibration: d3apiLocatorSchema.optional(),
});

const mixedrealityDeleteAllObservationsRequestSchema = z.object({
    spatialCalibration: d3apiLocatorSchema,
});

const mixedrealityDeleteObservationsRequestSchema = z.object({
    observations: z.array(z.string()),
});

const mixedrealityEnableObservationParamsSchema = z.object({
    uid: z.string(),
    enable: z.boolean(),
});

const mixedrealityEnableObservationsRequestSchema = z.object({
    observations: z.array(mixedrealityEnableObservationParamsSchema),
});

const mixedrealityGetMRSetsResponseSchema = z.object({
    status: rpcStatusSchema,
    result: z.array(
        z.object({
            uid: z.string(),
            name: z.string(),
            currentCamera: z.object({
                uid: z.string(),
                name: z.string(),
            }),
            isCameraOverride: z.boolean(),
        })
    ),
});

const mixedrealityListSpatialCalibrationsResponseSchema = z.object({
    status: rpcStatusSchema,
    result: z.array(
        z.object({
            uid: z.string(),
            name: z.string(),
            mrsets: z.array(
                z.object({
                    uid: z.string(),
                    name: z.string(),
                })
            ),
            observations: z.array(
                z.object({
                    uid: z.string(),
                    name: z.string(),
                    trackedPose: z.object({
                        position: d3apiVec3FloatSchema,
                        rotation: d3apiVec3FloatSchema,
                    }),
                    solvedPose: z.object({
                        position: d3apiVec3FloatSchema,
                        rotation: d3apiVec3FloatSchema,
                    }),
                    isEnabled: z.boolean(),
                    zoom: z.number(),
                    focus: z.number(),
                    type: z.enum(["Primary", "Secondary"]),
                    rmsError: z.number(),
                })
            ),
        })
    ),
});

const mixedrealitySelectCameraRequestSchema = z.object({
    mrSet: d3apiLocatorSchema,
    cameraOverride: d3apiLocatorSchema.optional(),
});

const mixedrealitySelectSpatialCalibrationRequestSchema = z.object({
    camera: d3apiLocatorSchema,
    spatialCalibration: d3apiLocatorSchema,
});

const quickcalLineUpCurrentPoseRequestSchema = z.object({
    projector: d3apiLocatorSchema,
    referencePoint: d3apiLocatorSchema,
    position: z.object({
        x: z.number(),
        y: z.number(),
    }),
});

const quickcalListReferencePointsResponseSchema = z.object({
    status: rpcStatusSchema,
    result: z.array(
        z.object({
            uid: z.string(),
            name: z.string(),
        })
    ),
});

const quickcalResetLineUpRequestSchema = z.object({
    projector: d3apiLocatorSchema,
});

const renderstreamGetAssignersResponseSchema = z.object({
    status: rpcStatusSchema,
    result: z.array(
        z.object({
            uid: z.string(),
            name: z.string(),
            transport: z.object({
                type: z.string(),
                format: z.string(),
                bitDepth: z.number(),
            }),
            alpha: z.boolean(),
            overlapPixels: z.number(),
            paddingPixels: z.number(),
            preferredNetwork: z.object({
                ip: z.string(),
                name: z.string(),
            }),
        })
    ),
});

const renderstreamFailoverRequestSchema = z.object({
    machine: d3apiLocatorSchema,
});

const renderstreamGetLayerConfigResponseSchema = z.object({
    status: rpcStatusSchema,
    result: z.object({
        framerateFractionDivisor: z.number(),
        asset: z.object({
            uid: z.string(),
            name: z.string(),
        }),
        pool: z.object({
            uid: z.string(),
            name: z.string(),
        }),
        channelMappings: z.array(
            z.object({
                channel: z.string(),
                mapping: z.object({
                    uid: z.string(),
                    name: z.string(),
                }),
                assigner: z.object({
                    uid: z.string(),
                    name: z.string(),
                }),
            })
        ),
        defaultAssigner: z.object({
            uid: z.string(),
            name: z.string(),
        }),
    }),
});

const renderstreamGetLayerStatusResponseSchema = z.object({
    status: rpcStatusSchema,
    result: z.object({
        reference: z.object({
            tNow: z.number(),
        }),
        workload: z.object({
            uid: z.string(),
            name: z.string(),
            instances: z.array(
                z.object({
                    machineUid: z.string(),
                    machineName: z.string(),
                    state: z.string(),
                    healthMessage: z.string(),
                    healthDetails: z.string(),
                })
            ),
        }),
        streams: z.array(
            z.object({
                uid: z.string(),
                name: z.string(),
                sourceMachine: z.string(),
                receiverMachine: z.string(),
                status: z.object({
                    subscriptionWanted: z.boolean(),
                    subscribeSuccessful: z.boolean(),
                    tLastDropped: z.number(),
                    tLastError: z.number(),
                    lastErrorMessage: z.string(),
                }),
                statusString: z.string(),
            })
        ),
        assetErrors: z.array(z.string()),
    }),
});

const renderstreamGetLayersResponseSchema = z.object({
    status: rpcStatusSchema,
    result: z.array(
        z.object({
            uid: z.string(),
            name: z.string(),
        })
    ),
});

const renderstreamGetPoolsResponseSchema = z.object({
    status: rpcStatusSchema,
    result: z.array(
        z.object({
            uid: z.string(),
            name: z.string(),
            machines: z.array(
                z.object({
                    uid: z.string(),
                    name: z.string(),
                    preferredSyncAdapter: z.string(),
                    adapters: z.array(
                        z.object({
                            name: z.string(),
                            ipAddress: z.string(),
                            subnet: z.string(),
                        })
                    ),
                })
            ),
            understudies: z.array(
                z.object({
                    uid: z.string(),
                    name: z.string(),
                    preferredSyncAdapter: z.string(),
                    adapters: z.array(
                        z.object({
                            name: z.string(),
                            ipAddress: z.string(),
                            subnet: z.string(),
                        })
                    ),
                })
            ),
        })
    ),
});

const renderstreamRestartLayersRequestSchema = z.object({
    layers: z.array(d3apiLocatorSchema),
});

const renderstreamStartLayersRequestSchema = z.object({
    layers: z.array(d3apiLocatorSchema),
});

const renderstreamStopLayersRequestSchema = z.object({
    layers: z.array(d3apiLocatorSchema),
});

const renderstreamSyncLayersRequestSchema = z.object({
    layers: z.array(d3apiLocatorSchema),
});

const sequencingChangeIndirectionsRequestSchema = z.object({
    changes: z.array(
        z.object({
            indirection: d3apiLocatorSchema,
            resource: d3apiLocatorSchema,
        })
    ),
});

const sequencingListAvailableResourcesResponseSchema = z.object({
    status: rpcStatusSchema,
    result: z.array(
        z.object({
            uid: z.string(),
            name: z.string(),
        })
    ),
});

const sequencingListIndirectionsResponseSchema = z.object({
    status: rpcStatusSchema,
    result: z.array(
        z.object({
            uid: z.string(),
            name: z.string(),
            resourceType: z.string(),
            currentResource: z.object({
                uid: z.string(),
                name: z.string(),
            }),
        })
    ),
});

const statusD3VersionInfoSchema = z.object({
    major: z.number(),
    minor: z.number(),
    hotfix: z.number(),
    revision: z.number(),
});

const statusGetProjectResponseSchema = z.object({
    status: rpcStatusSchema,
    result: z.object({
        projectPath: z.string(),
        version: statusD3VersionInfoSchema,
    }),
});

export type SessionResponse = z.infer<typeof statusGetSessionResponseSchema>;
const statusGetSessionResponseSchema = z.object({
    status: rpcStatusSchema,
    result: z.object({
        isRunningSolo: z.boolean(),
        isDirectorDedicated: z.boolean(),
        director: z
            .object({
                uid: z.string(),
                name: z.string(),
                hostname: z.string(),
                type: z.enum([
                    "Unknown",
                    "Designer",
                    "V2_5",
                    "Pro4x2",
                    "Pro4x4",
                    "Plus2x2",
                    "Pro4x4NoVfcs",
                    "Node",
                    "Pro2x4",
                    "Gx1",
                    "Gx2",
                    "SoloV1",
                    "Vx4",
                    "Gx2c",
                    "Rx",
                    "RxII",
                    "Vx1",
                    "Vx2",
                    "Vx4Plus",
                    "Gx3",
                    "Vx4n",
                    "EX3",
                    "Vx2Plus",
                    "CustomRenderNode",
                    "Vx3",
                ]),
            })
            .optional(),
        actors: z.array(
            z.object({
                uid: z.string(),
                name: z.string(),
                hostname: z.string(),
                type: z.enum([
                    "Unknown",
                    "Designer",
                    "V2_5",
                    "Pro4x2",
                    "Pro4x4",
                    "Plus2x2",
                    "Pro4x4NoVfcs",
                    "Node",
                    "Pro2x4",
                    "Gx1",
                    "Gx2",
                    "SoloV1",
                    "Vx4",
                    "Gx2c",
                    "Rx",
                    "RxII",
                    "Vx1",
                    "Vx2",
                    "Vx4Plus",
                    "Gx3",
                    "Vx4n",
                    "EX3",
                    "Vx2Plus",
                    "CustomRenderNode",
                    "Vx3",
                ]),
            })
        ),
        understudies: z.array(
            z.object({
                uid: z.string(),
                name: z.string(),
                hostname: z.string(),
                type: z.enum([
                    "Unknown",
                    "Designer",
                    "V2_5",
                    "Pro4x2",
                    "Pro4x4",
                    "Plus2x2",
                    "Pro4x4NoVfcs",
                    "Node",
                    "Pro2x4",
                    "Gx1",
                    "Gx2",
                    "SoloV1",
                    "Vx4",
                    "Gx2c",
                    "Rx",
                    "RxII",
                    "Vx1",
                    "Vx2",
                    "Vx4Plus",
                    "Gx3",
                    "Vx4n",
                    "EX3",
                    "Vx2Plus",
                    "CustomRenderNode",
                    "Vx3",
                ]),
            })
        ),
    }),
});

const statusListHealthResponseSchema = z.object({
    status: rpcStatusSchema,
    result: z.array(
        z.object({
            machine: z.object({
                uid: z.string(),
                name: z.string(),
                hostname: z.string(),
            }),
            runningAsMachine: z.object({
                uid: z.string(),
                name: z.string(),
                hostname: z.string(),
            }),
            status: z.object({
                averageFPS: z.number(),
                videoDroppedFrames: z.number(),
                videoMissedFrames: z.number(),
                states: z.array(
                    z.object({
                        name: z.string(),
                        detail: z.string(),
                        category: z.string(),
                        severity: z.string(),
                    })
                ),
            }),
        })
    ),
});
export type HealthResponse = z.infer<typeof statusListHealthResponseSchema>;

const statusListNotificationsResponseSchema = z.object({
    status: rpcStatusSchema,
    result: z.array(
        z.object({
            machine: z.object({
                uid: z.string(),
                name: z.string(),
                hostname: z.string(),
            }),
            notifications: z.array(
                z.object({
                    summary: z.string(),
                    detail: z.string(),
                })
            ),
        })
    ),
});

const transportListTracksResponseSchema = z.object({
    status: rpcStatusSchema,
    result: z.array(
        z
            .object({
                uid: z.string(),
                name: z.string(),
                length: z.number(),
                crossfade: z.enum(["Unknown", "Off", "Fade", "TrackSection"]),
            })
            .passthrough()
    ),
});
export type TransportListTracksResponse = z.infer<
    typeof transportListTracksResponseSchema
>;

const transportListAnnotationsResponseSchema = z.object({
    status: rpcStatusSchema,
    result: z.object({
        uid: z.string(),
        name: z.string(),
        annotations: z.object({
            notes: z.array(
                z.object({
                    time: z.number(),
                    text: z.string(),
                })
            ),
            tags: z.array(
                z.object({
                    time: z.number(),
                    type: z.enum(["TagType_Unknown", "TC", "MIDI", "CUE"]),
                    value: z.string(),
                })
            ),
            sections: z.array(
                z.object({
                    time: z.number(),
                    index: z.string(),
                })
            ),
        }),
    }),
});
export type TransportListAnnotations = z.infer<
    typeof transportListAnnotationsResponseSchema
>;

const transportSetBrightnessRequestSchema = z.object({
    transports: z.array(
        z.object({
            transport: d3apiLocatorSchema,
            brightness: z.number(),
        })
    ),
});

const transportSetEngagedRequestSchema = z.object({
    transports: z.array(
        z.object({
            transport: d3apiLocatorSchema,
            engaged: z.boolean(),
        })
    ),
});

const transportGoToFrameRequestSchema = z.object({
    transports: z.array(
        z.object({
            transport: d3apiLocatorSchema,
            frame: z.number(),
            playmode: z
                .enum(["NotSet", "Play", "PlaySection", "Loop", "Stop", "Unknown"])
                .optional(),
        })
    ),
});

const transportPlayRequestSchema = z.object({
    transports: z.array(d3apiLocatorSchema),
});

const transportStopRequestSchema = z.object({
    transports: z.array(d3apiLocatorSchema),
});

const transportGetActiveResponseSchema = z.object({
    status: rpcStatusSchema,
    result: z.array(
        z.object({
            uid: z.string(),
            name: z.string(),
            engaged: z.boolean(),
            volume: z.number(),
            brightness: z.number(),
            playmode: z.enum([
                "NotSet",
                "Play",
                "PlaySection",
                "Loop",
                "Stop",
                "Unknown",
            ]),
            currentTrack: z.object({
                uid: z.string(),
                name: z.string(),
            }),
        })
    ),
});
export type ActiveTransport = z.infer<typeof transportGetActiveResponseSchema>;

export const detectSystemsResponseSchema = z.object({
    status: rpcStatusSchema,
    result: z.array(
        z.object({
            hostname: z.string(),
            type: z.string(),
            version: z.object({
                major: z.number(),
                minor: z.number(),
                hotfix: z.number(),
                revision: z.number(),
            }),
            runningProject: z.string(),
            ipAddress: z.string(),
            isDesignerRunning: z.boolean(),
            isServiceRunning: z.boolean(),
            isManagerRunning: z.boolean(),
            isNotchHostRunning: z.boolean(),
        })
    ),
});
export type SystemsResponse = z.infer<typeof detectSystemsResponseSchema>;
export const systemD3VersionInfoSchema = z.object({
    major: z.number().int(),
    minor: z.number().int(),
    hotfix: z.number().int(),
    revision: z.number().int(),
});
export const systemProjectInfoSchema = z.object({
    path: z.string(),
    lastModified: z.string(),
    version: systemD3VersionInfoSchema,
});

export const systemProjectsInSystemInfoSchema = z.object({
    hostname: z.string(),
    lastProject: z.string(),
    projects: z.array(systemProjectInfoSchema),
});
export const systemListProjectsResponseSchema = z.object({
    status: rpcStatusSchema,
    result: z.array(systemProjectsInSystemInfoSchema),
});

export type ListProjectsResponse = z.infer<
    typeof systemListProjectsResponseSchema
>;

export {
    rpcStatusSchema,
    d3apiVec3FloatSchema,
    d3apiLocatorSchema,
    colourCDLInfoSchema,
    colourListCDLsResponseSchema,
    colourSetCDLRequestSchema,
    d3apiEmptyResponseSchema,
    d3apiBoolResponseSchema,
    mixedrealityCameraInfoSchema,
    mixedrealityGetCamerasResponseSchema,
    mixedrealityCaptureObservationRequestSchema,
    mixedrealityDeleteAllObservationsRequestSchema,
    mixedrealityDeleteObservationsRequestSchema,
    mixedrealityEnableObservationParamsSchema,
    mixedrealityEnableObservationsRequestSchema,
    mixedrealityGetMRSetsResponseSchema,
    mixedrealityListSpatialCalibrationsResponseSchema,
    mixedrealitySelectCameraRequestSchema,
    mixedrealitySelectSpatialCalibrationRequestSchema,
    quickcalLineUpCurrentPoseRequestSchema,
    quickcalListReferencePointsResponseSchema,
    quickcalResetLineUpRequestSchema,
    renderstreamGetAssignersResponseSchema,
    renderstreamFailoverRequestSchema,
    renderstreamGetLayerConfigResponseSchema,
    renderstreamGetLayerStatusResponseSchema,
    renderstreamGetLayersResponseSchema,
    renderstreamGetPoolsResponseSchema,
    renderstreamRestartLayersRequestSchema,
    renderstreamStartLayersRequestSchema,
    renderstreamStopLayersRequestSchema,
    renderstreamSyncLayersRequestSchema,
    sequencingChangeIndirectionsRequestSchema,
    sequencingListAvailableResourcesResponseSchema,
    sequencingListIndirectionsResponseSchema,
    statusD3VersionInfoSchema,
    statusGetProjectResponseSchema,
    statusGetSessionResponseSchema,
    statusListHealthResponseSchema,
    statusListNotificationsResponseSchema,
    transportListTracksResponseSchema,
    transportListAnnotationsResponseSchema,
    transportSetBrightnessRequestSchema,
    transportSetEngagedRequestSchema,
    transportGoToFrameRequestSchema,
    transportPlayRequestSchema,
    transportStopRequestSchema,
    transportGetActiveResponseSchema,
};
