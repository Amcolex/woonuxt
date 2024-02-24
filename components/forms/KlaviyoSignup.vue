<template>
    <div id="klaviyo-form">
      <!-- Klaviyo form will be injected here -->
    </div>
  </template>
  
  <script>
  export default {
    mounted() {
      // Inject Klaviyo form script
      const klaviyoScript = document.createElement('script');
      klaviyoScript.setAttribute('type', 'text/javascript');
      klaviyoScript.innerHTML = `https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=UHnW5P`;
      document.getElementById('klaviyo-form').appendChild(klaviyoScript);
    }
  }
  </script>