<script setup lang="ts">
useSeoMeta({
  title: "Posts",
});

const colorMode = useColorMode();
colorMode.preference = "light";
</script>
<template>
  <section>
    <slot />
  </section>
</template>
<style scoped></style>
