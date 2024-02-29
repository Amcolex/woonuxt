<template>
  <div>
    <iframe
      id="checkoutIframe"
      src="https://shop.naviq.com/checkout"
      frameborder="0"
      style="width: 100%; border: none;"
      @load="setupIframeCommunication"
    ></iframe>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

const setupIframeCommunication = () => {
  const iframe = document.getElementById('checkoutIframe');
  const url = new URL(iframe.src);

  const receiveMessage = (event) => {
    if (event.origin === url.origin && event.data.action === 'adjustHeight') {
      iframe.style.height = `${event.data.height+20}px`;
    }
  };

  window.addEventListener('message', receiveMessage, false);

  // Listen for resize events
  const onResize = () => {
    if (iframe.contentWindow) {
      iframe.contentWindow.postMessage({ action: 'requestHeight' }, url.origin);
    }
  };
  window.addEventListener('resize', onResize);

  // Cleanup
  onUnmounted(() => {
    window.removeEventListener('message', receiveMessage);
    window.removeEventListener('resize', onResize);
  });
};

onMounted(() => {
  setupIframeCommunication();
});
</script>
