<script lang="ts" setup>
const { data } = await useAsyncGql('getProductCategories', { first: 6 });
const productCategories = data.value?.productCategories?.nodes || [];

useSeoMeta({
  title: `Home`,
  ogTitle: `Naviq`,
  description: `This is an example of a WooNuxt store. It provides a modern, fast, and SEO friendly ecommerce store built with Nuxt and WooCommerce.`,
  ogDescription: `This is an example of a WooNuxt store. It provides a modern, fast, and SEO friendly ecommerce store built with Nuxt and WooCommerce.`,
  ogImage: `https://user-images.githubusercontent.com/5116925/218879668-f4c1f9fd-bef4-44b0-bc7f-e87d994aa3a1.png`,
  twitterCard: `summary_large_image`,
});
</script>

<template>
  <main>
    <HeroBanner />
    <NewsletterSignup/>
  </main>
</template>

<style scoped>
.brand img {
  max-height: min(8vw, 120px);
  object-fit: contain;
  object-position: center;
}
</style>
