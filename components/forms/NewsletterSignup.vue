<template>
    <form @submit.prevent="submitForm" id="Newsletter">
      <input v-model="formData.email" type="email" placeholder="Your email" required />
      <button type="submit">Subscribe</button>
      <p v-if="message">{{ message }}</p>
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Replace these with your actual HubSpot portal ID and form ID
  const HUBSPOT_PORTAL_ID = '144207713';
  const HUBSPOT_FORM_ID = '84e10cf5-c8cd-46a5-9902-15b915b0a7b0';
  
  const formData = ref({
    email: '',
  });
  
  const message = ref('');
  
  const submitToHubSpot = async (formData) => {
    const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`;
  
    const headers = {
      "Content-Type": "application/json",
    };
  
    const body = JSON.stringify({
      fields: [
        {
          name: "email",
          value: formData.email,
        },
        // Add other form fields here
      ],
      context: {
        pageUri: window.location.href,
        pageName: document.title,
      },
    });
  
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: headers,
        body: body,
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      // Handle success
      message.value = "Thank you for subscribing!";
    } catch (error) {
      console.error("Error submitting form to HubSpot", error);
      // Handle error
      message.value = "There was a problem with your subscription. Please try again.";
    }
  };
  
  const submitForm = () => {
    submitToHubSpot(formData.value);
  };
  </script>
  
  