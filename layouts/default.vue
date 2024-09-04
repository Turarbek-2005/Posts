<script setup lang="ts">
const colorMode = useColorMode();
colorMode.preference = "light";
</script>
<template>
  <section>
    <slot />
  </section>
</template>
<style scoped></style>
