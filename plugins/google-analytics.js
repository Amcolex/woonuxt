export default defineNuxtPlugin(nuxtApp => {
    if (process.client) {
      const gaId = useRuntimeConfig().public.gaId; // Use the GA ID from runtime config
      const scriptUrl = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      loadScript(scriptUrl, () => {
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', gaId);
      });
    }
  });
  
  function loadScript(src, callback) {
    const script = document.createElement('script');
    script.async = true;
    script.src = src;
    script.onload = () => callback();
    document.head.appendChild(script);
  }
  