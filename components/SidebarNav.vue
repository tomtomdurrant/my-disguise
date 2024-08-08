<script setup lang="ts">
import { cn } from "@/lib/utils";
import { Button } from "~/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~/components/ui/collapsible";
import { ChevronLeftCircle } from "lucide-vue-next";

interface Item {
  title: string;
  href: string;
}

const $route = useRoute();
const isOpen = ref(false);

const sidebarNavItems: Item[] = [
  {
    title: "Systems",
    href: "/systems",
  },
  {
    title: "Cues",
    href: "/cues",
  },
  {
    title: "Appearance",
    href: "/examples/forms/appearance",
  },
  {
    title: "Notifications",
    href: "/examples/forms/notifications",
  },
  {
    title: "Display",
    href: "/examples/forms/display",
  },
];
</script>

<template>
  <nav class="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
    <Button
      v-for="item in sidebarNavItems"
      :key="item.title"
      as-child
      variant="ghost"
      :class="cn('w-full text-left justify-start', $route.path === item.href && 'bg-muted hover:bg-muted')"
    >
      <NuxtLink :to="item.href">
        {{ item.title }}
      </NuxtLink>
    </Button>
  </nav>
</template>
