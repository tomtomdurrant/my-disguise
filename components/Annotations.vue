<script setup lang="ts">
import { httpData } from "~/lib/ws/socket";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import { settings } from "~/lib/settings";
import { Control } from "~/lib/disguise/control";

function getAnnotationTrack(uid: string) {
  return httpData.tracks?.result.find((x) => x.uid === uid);
}

function getMatchingTag(noteTime: number, index: number) {
  if (httpData.annotations == null) {
    return null;
  }
  return httpData.annotations[index].result.annotations.tags.find((tag) => tag.time === noteTime);
}
</script>

<template>
  <ClientOnly>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card v-for="(annotation, index) in httpData.annotations">
        <CardHeader>
          <div class="flex items-center justify-between">
            <CardTitle>{{ annotation.result.name }}</CardTitle>

            <div class="text-sm font-mono" v-if="settings.statsForNerds">
              <p>uid:<span>{{ annotation.result.uid }}</span></p>
              <p>length: {{ getAnnotationTrack(annotation.result.uid)?.length }}</p>
            </div>
          </div>
        </CardHeader>
        <ScrollArea class="h-72 rounded-md border-2 p-4">
          <div class="p-4">
            <h4 class="mb-4 text-sm font-medium leading-none">Marks on the timeline</h4>
            <template v-for="note in annotation.result.annotations.notes">
              <div class="flex justify-between">
                <div class="flex justify-between" v-if="getMatchingTag(note.time, index)">
                  {{ note.text }}
                  <p>LX cue {{ getMatchingTag(note.time, index)!.value }}</p>
                  <Button @click="Control.goToCue(getMatchingTag(note.time, index)!.value)" variant="destructive">
                    Go to Cue
                  </Button>
                </div>
                <div v-else>
                  {{ note.text }} -
                  <Button @click="Control.goToNote(httpData.active?.result[0].uid, note.text)"
                    >no lx cue associated - go to the note?
                  </Button>
                </div>
              </div>
              <Separator class="my-4" />
            </template>
          </div>
        </ScrollArea>
      </Card>
    </div>
  </ClientOnly>
</template>

<style scoped></style>
