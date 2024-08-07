<script setup lang="ts">

import {httpData} from "~/lib/ws/socket";
import {ScrollArea} from "~/components/ui/scroll-area";
import {Separator} from "~/components/ui/separator";

function getMatchingTag(noteTime: number, index: number) {
  if (httpData.annotations == null) {
    return null;
  }
  return httpData.annotations[index].result.annotations.tags.find(tag => tag.time === noteTime);
}

function emitCue(cue: string | undefined) {
  if (cue == null) {
    console.log('No cue found');
    return;
  }
  console.log(cue);
}
</script>

<template>
  <ClientOnly>

    <div class="grid grid-cols-4 gap-12">
      <div v-for="(annotation, index) in httpData.annotations">
        <p>{{ annotation.result.name }}</p>

        <ScrollArea class="h-72 rounded-md border-2 p-4">
          <div class="p-4">
            <h4 class="mb-4 text-sm font-medium leading-none">
              Tags
            </h4>
            <template v-for="note in annotation.result.annotations.notes">
              <div class="flex justify-between">
                {{ note.text }}
                <div v-if="getMatchingTag(note.time, index)">
                  <p>LX cue {{ getMatchingTag(note.time, index)!.value }}</p>
                  <Button @click="emitCue(getMatchingTag(note.time, index)!.value)" variant="destructive">
                    Go to Cue
                  </Button>
                </div>
              </div>
              <Separator class="my-4"/>
            </template>
          </div>

        </ScrollArea>
      </div>
    </div>

  </ClientOnly>
</template>

<style scoped>

</style>