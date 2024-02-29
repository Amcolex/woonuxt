<script setup>

</script>

<template>
  <div class="checkout-container">
    <iframe
      src="https://shop.naviq.com/checkout"
      frameborder="0"
      width="100%"
      height="100%"
      allowfullscreen>
    </iframe>
  </div>
</template>

<script setup>
// You can add your JavaScript logic here if needed
</script>

<style scoped>
/* Add styles for your checkout container or iframe as necessary */
.checkout-container {
  max-width: 800px; /* Adjust the width as necessary */
  margin: auto;
}
iframe {
  width: 100%; /* Ensure iframe occupies the container width */
  border: none; /* Optional: Remove the border */
}
</style>