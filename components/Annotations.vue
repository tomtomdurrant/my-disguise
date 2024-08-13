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

function getVariant(noteTime: number, index: number) {
  return getMatchingTag(noteTime, index) ? "default" : "secondary";
}
</script>

<template>
  <ClientOnly>
    <div class="grid grid-cols-1 col-span-4 gap-4 md:grid-cols-2">
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
            <div class="space-y-4">
              <div v-for="note in annotation.result.annotations.notes">
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
                        getMatchingTag(note.time, index)
                          ? Control.goToCue(getMatchingTag(note.time, index)!.value)
                          : Control.goToNote(httpData.active?.result[0].uid, note.text);
                      }
                    "
                    >{{ getMatchingTag(note.time, index) ? "Go to cue" : "Go to note" }}
                  </Button>
                </div>
                <Separator class="my-2" />
              </div>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  </ClientOnly>
</template>

<style scoped></style>
<!--<template v-if="getMatchingTag(note.time, index)">-->
<!--  <div class="">-->
<!--    <p class="font-medium">{{ note.text }}</p>-->
<!--    <p>LX cue {{ getMatchingTag(note.time, index)!.value }}</p>-->
<!--    <Button @click="Control.goToCue(getMatchingTag(note.time, index)!.value)" variant="destructive">-->
<!--      Go to Cue-->
<!--    </Button>-->
<!--  </div>-->
<!--</template>-->
<!--<div v-else>-->
<!--{{ note.text }} - -->
<!--<Button @click="Control.goToNote(httpData.active?.result[0].uid, note.text)"-->
<!--&gt;no lx cue associated - go to the note?-->
<!--</Button>-->
<!--</div>-->
<!--</div>-->
