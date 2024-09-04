<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Transition, TransitionGroup } from 'vue';
import { getErrors, removeError } from "~/lib/errorStore";
const errors = getErrors();
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Error Log</h1>
    <ScrollArea class="h-[600px]">
      <TransitionGroup name="list" tag="ul" class="space-y-4">
        <LazyDevOnly>
          <Button @click="() => {
            throw new Error('Test Error');
          }">
            Cick for Error
          </Button>
        </LazyDevOnly>
        <p v-if="errors.length === 0">
          No Errors
        </p>

        <li v-for="error in errors" :key="error.id" class="bg-red-100 p-4 rounded-md relative">
          <div class="flex justify-between items-start">
            <div>
              <p class="font-semibold">{{ error.name }} - <span class="font-normal">{{error.message}}</span></p>
              <p class="text-sm text-gray-500">{{ error.timestamp.toLocaleString() }}</p>
              <pre class="text-sm text-gray-400">{{error.stack}}</pre>
            </div>
            <Button @click="removeError(error.id)" variant="destructive" size="sm">
              Dismiss
            </Button>
          </div>
        </li>
      </TransitionGroup>
    </ScrollArea>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-leave-to,
.list-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
</style>
