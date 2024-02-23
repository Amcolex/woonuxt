<script setup lang="ts">
const { isShowingSearch } = useSearching();
</script>

<template>
  <header class="sticky top-0 z-40 bg-white shadow-sm shadow-light-500">
    <div class="container flex items-center justify-between py-4">
      <!-- Logo and menu trigger container -->
      <div class="flex items-center justify-start flex-initial">
        <MenuTrigger class="lg:hidden" />
        <Logo class="md:w-[160px]" />
      </div>

      <!-- Main menu centered -->
      <!-- Use flex-auto to allow it to grow and consume available space -->
      <MainMenu class="items-center hidden gap-6 text-sm text-gray-500 lg:flex lg:px-4 flex-auto justify-center" />

      <!-- Sign in and cart container -->
      <div class="flex gap-4 justify-end items-center md:w-[160px] flex-initial">
        <SignInLink class="hidden sm:block" />
        <CartTrigger />
      </div>
    </div>
  </header>
</template>
