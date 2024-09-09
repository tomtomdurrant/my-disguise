import type { HttpData, OscData } from '~/lib/ws/types';
import { consolidateSystemInfo } from '~/lib/disguise/consolidate';
import type { ListProjectsResponse } from '~/lib/disguise/schema';

export const httpData = reactive<HttpData>({
  active: null,
  time: null,
  systems: null,
  session: null,
  tracks: null,
  annotations: null,
  health: null,
  projects: null,
});

export const oscData = reactive<OscData>({
  osc_trackposition: null,
  osc_timecodeposition: null,
  osc_sectionhint: null,
  osc_heartbeat: null,
  osc_trackname: null,
  osc_currentsectionname: null,
  osc_brightness: null,
});

export const inSession = ref(false);
export const currentSection = ref<string | null>(null);
export const nextSection = ref<string | null>(null);
// export const projects = ref<ListProjectsResponse>();

export const consolidated = computed(() => {
  if (!httpData.session || !httpData.systems || !httpData.health) {
    return null;
  }
  return consolidateSystemInfo(httpData.session, httpData.systems, httpData.health, httpData.projects);
});
