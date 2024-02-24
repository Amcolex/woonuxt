// plugins/clarity-tracking.js

export default defineNuxtPlugin(nuxtApp => {
  const { public: { clarityTrackingId } } = useRuntimeConfig();

  const clarityFunction = `(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "${clarityTrackingId}");`

  // Inject the script into the head with async attribute
  useHead({
    script: [
      { children: clarityFunction, type: 'text/javascript', async: true }
    ]
  });
});
