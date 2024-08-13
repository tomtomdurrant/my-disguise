<!-- OSCCommandForm.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const address = ref('')
const args = ref('')

const emit = defineEmits(['submitCommand'])

const submitCommand = () => {
  emit('submitCommand', { address: address.value, args: args.value.split(',') })
  address.value = ''
  args.value = ''
}
</script>

<template>
  <form @submit.prevent="submitCommand" class="space-y-4">
    <div>
      <Label for="address">OSC Address</Label>
      <Input id="address" v-model="address" placeholder="/example/address" required />
    </div>
    <div>
      <Label for="args">Arguments (comma-separated)</Label>
      <Input id="args" v-model="args" placeholder="1,2,3,hello" />
    </div>
    <Button type="submit">Create Command</Button>
  </form>
</template>