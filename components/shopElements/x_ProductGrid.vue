<script setup lang="ts">
import { computed, ref } from 'vue';
const route = useRoute();
const { productsPerPage } = useHelpers();
const { products } = useProducts();
const page = ref(parseInt(route.params.pageNumber as string) || 1);

// Original productsToShow
const productsToShow = computed(() => products.value.slice((page.value - 1) * productsPerPage, page.value * productsPerPage));

// New computed property to group products by categories
const productsGroupedByCategory = computed(() => {
  const grouped = {};
  productsToShow.value.forEach(product => {
    const categoryName = product.productCategories.nodes[0]?.name || 'Uncategorized';
    if (!grouped[categoryName]) {
      grouped[categoryName] = [];
    }
    grouped[categoryName].push(product);
  });
  return grouped;
});
</script>

<template>
  <Transition name="fade" mode="out-in">
    <section v-if="Object.keys(productsGroupedByCategory).length" class="relative w-full">
      <div v-for="(products, category) in productsGroupedByCategory" :key="category" class="category-section">
        <h2 class="text-lg font-bold mb-4">{{ category }}</h2>
        <hr>
        <TransitionGroup name="shrink" tag="div" mode="in-out" class="product-grid">
          <ProductCard v-for="(node, i) in products" :key="node.id || i" :node="node" :index="i" />
        </TransitionGroup>
      </div>
      <Pagination />
    </section>
    <NoProductsFound v-else />
  </Transition>
</template>


<style lang="postcss" scoped>
.product-grid {
  @apply my-4 grid transition-all gap-8 lg:my-8;

  grid-template-columns: repeat(2, 1fr);
}
.product-grid:empty {
  display: none;
}

@media (min-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  }
}

.shrink-move {
  transition: all 400ms;
}

.shrink-leave-active {
  transition: transform 300ms;
  position: absolute;
  opacity: 0;
}

.shrink-enter-active {
  transition:
    opacity 400ms ease-out 200ms,
    transform 400ms ease-out;
  will-change: opacity, transform;
}

.shrink-enter,
.shrink-leave-to,
.shrink-enter-from {
  opacity: 0;
  transform: scale(0.75) translateY(25%);
}
</style>
