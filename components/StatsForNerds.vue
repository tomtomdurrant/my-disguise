<script setup lang="ts">
import { Badge } from "~/components/ui/badge";
import { settings } from "~/lib/settings";

interface Props {
  uid: string;
  version: {
    major: number;
    minor: number;
    hotfix: number;
    revision: number;
  };
}

const props = defineProps<Props>();
</script>

<template>
  <div v-if="settings.statsForNerds">
    <code class="text-sm font-mono block">uid: {{ props.uid }}</code>
    <Badge class="font-mono">
      {{ props.version.major }}.{{ props.version.minor }}.{{ props.version.hotfix }}.{{ props.version.revision }}
    </Badge>
  </div>
</template>
