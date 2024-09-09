<script setup lang="ts">
import { Badge } from "~/components/ui/badge";
import type { D3VersionInfo } from "~/lib/disguise/types";
import { settings } from "~/lib/settings";
import { useToast } from "@/components/ui/toast";
import UidDisplay from "~/components/UidDisplay.vue";

interface Props {
  uid: string;
  version: D3VersionInfo;
}

const props = defineProps<Props>();
const toast = useToast();

const copyVersion = () => {
  const versionString = `${props.version.major}.${props.version.minor}.${props.version.hotfix}.${props.version.revision}`;
  navigator.clipboard.writeText(versionString).then(() => {
    toast.toast({
      title: "Version copied",
      description: h('p', {}, [
        'Version number has been copied to clipboard',
        h('br'),
        h('span', { class: 'font-mono' }, versionString),
      ]),
    });
  }).catch((err) => {
    console.error('Failed to copy version: ', err);
    toast.toast({
      title: "Copy failed",
      description: "Failed to copy version number",
      variant: "destructive",
    });
  });
};

const copyUid = () => {
  navigator.clipboard.writeText(props.uid).then(() => {
    toast.toast({
      title: "UID copied",
      description: "UID has been copied to clipboard",
    });
  });
};
</script>

<template>
  <div v-if="settings.statsForNerds" class="grid grid-cols-1 gap-2 mt-2">
    <div>
      <Badge 
        class="font-mono cursor-pointer hover:bg-primary/80" 
        @click="copyVersion"
      >
        {{ props.version.major }}.{{ props.version.minor }}.{{ props.version.hotfix }}.{{ props.version.revision }}
      </Badge>
    </div>
    <UidDisplay :uid="props.uid" label="UID" />
  </div>
</template>
