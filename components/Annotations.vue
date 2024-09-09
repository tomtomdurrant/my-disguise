<script setup lang="ts">
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import { settings } from "~/lib/settings";
import { httpData } from "~/stores/dataStore";


function getAnnotationTrack(uid: string) {
  return httpData.tracks?.result.find((x) => x.uid === uid);
}

function getMatchingTag(noteTime: number, index: number) {
  if (httpData.annotations == null) {
    return null;
  }
  return httpData.annotations[index].result.annotations.tags.find((tag) => tag.time === noteTime);
}

function getVariant(noteTime: number, index: number) {
  return getMatchingTag(noteTime, index) ? "default" : "secondary";
}
</script>

<template>
  <ClientOnly>
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-2 col-span-2">
      <Card v-for="(annotation, index) in httpData.annotations">
        <CardHeader>
          <div class="flex items-center justify-between">
            <CardTitle>{{ annotation.result.name }}</CardTitle>
            <div class="font-mono text-sm" v-if="settings.statsForNerds">
              <p>
                uid:<span>{{ annotation.result.uid }}</span>
              </p>
              <p>length: {{ getAnnotationTrack(annotation.result.uid)?.length }}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea class="h-[300px]">
            <div class="space-y-2">
              <div v-for="(note, i) in annotation.result.annotations.notes">
                <div class="flex items-center justify-between">
                  <div>
                    <p>{{ note.text }}</p>
                    <p v-if="getMatchingTag(note.time, index)" class="text-sm text-muted-foreground">
                      LX cue {{ getMatchingTag(note.time, index)!.value }}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    class="w-24"
                    :variant="getVariant(note.time, index)"
                    @click="
                      () => {
                        // getMatchingTag(note.time, index)
                        //   ? Control.goToCue(getMatchingTag(note.time, index)!.value)
                        //   : Control.goToNote(httpData.active?.result[0].uid, note.text);
                      }
                    "
                    >{{ getMatchingTag(note.time, index) ? "Go to cue" : "Go to note" }}
                  </Button>
                </div>
                <Separator v-if="i < annotation.result.annotations.notes.length - 1" class="my-2" />
              </div>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  </ClientOnly>
</template>
