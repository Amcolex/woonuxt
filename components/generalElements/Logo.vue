<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const img = useImage();

const logoUrl = runtimeConfig?.public?.LOGO ? img(runtimeConfig?.public?.LOGO) : null;
</script>

<template>
  <NuxtLink to="/">
    <img src="/images/naviq_logo.svg" alt="Logo" class="object-contain h-10" />
  </NuxtLink>
</template>
