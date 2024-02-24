// plugins/hubspot.js
export default defineNuxtPlugin(nuxtApp => {
    if (process.client) { // Ensure this code runs only in the client-side context
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.id = 'hs-script-loader';
      script.async = true;
      script.defer = true;
      script.src = '//js-eu1.hs-scripts.com/144207713.js'; // Use your HubSpot script source
      document.head.appendChild(script);
    }
  });
  