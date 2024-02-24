<template>
    <form @submit.prevent="submitForm" class="max-w-md mx-auto my-10">
      <div class="mb-4">
        <input v-model="formData.email" type="email" placeholder="Email" required class="input" />
      </div>
      <div class="mb-4">
        <input v-model="formData.firstname" type="text" placeholder="First Name" required class="input" />
      </div>
      <div class="mb-4">
        <input v-model="formData.lastname" type="text" placeholder="Last Name" required class="input" />
      </div>
      <div class="mb-4">
        <textarea v-model="formData.message" placeholder="Your Message" required class="textarea"></textarea>
      </div>
      <div class="mb-4">
        <input v-model="formData.company" type="text" placeholder="Company" class="input" />
      </div>
      <div class="mb-4">
        <input v-model="formData.country" type="text" placeholder="Country" class="input" />
      </div>
      <button type="submit" class="btn">Send Message</button>
      <p v-if="message" class="mt-4 text-green-500">{{ message }}</p>
    </form>
  </template>

  
  
  <script setup>
  import { ref } from 'vue';
  
  const HUBSPOT_PORTAL_ID = '144207713';
  const HUBSPOT_FORM_ID = 'd64541d3-329e-45e9-abd2-83e77dd58cf8';
  
  const formData = ref({
    email: '',
    firstname: '',
    lastname: '',
    message: '',
    company: '',
    country: '',
  });
  
  const message = ref('');
  
  const submitToHubSpot = async (formData) => {
    const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`;
  
    const headers = {
      "Content-Type": "application/json",
    };
  
    const body = JSON.stringify({
      fields: [
        { name: "email", value: formData.email },
        { name: "firstname", value: formData.firstname },
        { name: "lastname", value: formData.lastname },
        { name: "message", value: formData.message },
        { name: "company", value: formData.company },
        { name: "country", value: formData.country },
        // Add other form fields here if necessary
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
      message.value = "Thank you for contacting us!";
    } catch (error) {
      console.error("Error submitting form to HubSpot", error);
      // Handle error
      message.value = "There was a problem with your submission. Please try again.";
    }
  };
  
  const submitForm = () => {
    submitToHubSpot(formData.value);
  };
  </script>
  
  <style scoped>
  /* Add styles for your form here */
  form {
    display: flex;
    flex-direction: column;
  }
  
  input, textarea {
    margin-bottom: 1rem;
  }
  
  button {
    cursor: pointer;
  }
  </style>
  