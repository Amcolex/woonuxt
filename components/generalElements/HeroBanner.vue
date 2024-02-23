<template>
  <div class="relative mx-auto">
    <NuxtImg
      width="1400"
      height="800"
      class="object-cover w-full h-[420px] lg:h-[560px] xl:h-[640px]"
      src="/images/agv.webp"
      alt="Hero image"
      loading="eager"
      format="webp"
      fit="outside"
      sizes="sm:100vw lg:1400px"
      fetchpriority="high"
      preload />
    <div class="container absolute inset-0 flex flex-col items-start justify-center bg-gradient-to-l from-gray-200 md:bg-none p-8">
      <h1 class="text-3xl font-bold md:mb-4 md:text-4xl lg:text-6xl ">AGV Navigation.</h1>
      <h2 class="text-lg font-bold md:mb-4 lg:text-3xl text-red-600"> Perfected.</h2>
      <div class="max-w-sm mb-8 text-md font-light lg:max-w-md text-balance text-white">
        <p>Discover our next-gen magnetic guide solution</p>
      </div>
      <NuxtLink class="px-6 py-3 font-bold text-white bg-gray-800 rounded-xl hover:bg-gray-800" to="/product/mts160">Products</NuxtLink>
    </div>
  </div>
</template>
