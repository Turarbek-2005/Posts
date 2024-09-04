<script setup lang="ts">
import { DialogClose, type DialogCloseProps } from "radix-vue";

const props = defineProps</* @vue-ignore */ DialogCloseProps>();
</script>

<template>
  <DialogClose v-bind="props">
    <slot />
  </DialogClose>
</template>
