<script setup lang="ts">
import { useToast } from "@/components/ui/toast";

interface Props {
  uid: string;
  label?: string;
}

const props = defineProps<Props>();
const toast = useToast();

const copyUid = () => {
  navigator.clipboard.writeText(props.uid).then(() => {
    toast.toast({
      title: "UID copied",
      description: h('p', {}, [
        'UID has been copied to clipboard',
        h('br'),
        h('span', { class: 'font-mono text-xs' }, props.uid),
      ]),
    });
  }).catch((err) => {
    console.error('Failed to copy UID: ', err);
    toast.toast({
      title: "Copy failed",
      description: "Failed to copy UID",
      variant: "destructive",
    });
  });
};
</script>

<template>
  <div class="flex items-center space-x-2">
    <span v-if="label" class="text-sm font-medium text-muted-foreground">{{ label }}:</span>
    <span 
      @click="copyUid" 
      class="font-mono font-semibold text-sm cursor-pointer hover:bg-primary/10 rounded px-1 py-0.5 transition-colors"
      :title="'Click to copy: ' + uid"
    >
      {{ uid }}
    </span>
  </div>
</template>
