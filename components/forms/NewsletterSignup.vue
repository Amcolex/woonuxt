<template>
  <!-- <form @submit.prevent="submitForm" id="Newsletter">
      <input v-model="formData.email" type="email" placeholder="Your email" required />
      <button type="submit">Subscribe</button>
      <p v-if="message">{{ message }}</p>
    </form> -->

  <div class="bg-white py-16 sm:py-24 lg:py-32">
    <div class="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
      <div class="max-w-xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:col-span-7">
        <h2 class="inline sm:block lg:inline xl:block">Want product news and updates?</h2>
        <p class="inline sm:block lg:inline xl:block">Sign up for our newsletter.</p>
      </div>
      <form @submit.prevent="submitForm" id="Newsletter" class="w-full max-w-md lg:col-span-5 lg:pt-2">
        <div class="flex gap-x-4">
          <label for="email-address" class="sr-only">Email address</label>
          <input v-model="formData.email" id="email-address" name="email" type="email" autocomplete="email" required
            class="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Enter your email">
          <button type="submit"
            class="flex-none rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Subscribe</button>
        </div>
        <p class="mt-4 text-sm leading-6 text-gray-900">We care about your data. Read our <a href="#"
            class="font-semibold text-indigo-600 hover:text-indigo-500">privacy&nbsp;policy</a>.</p>
      </form>
    </div>
  </div>
</template>



  
<script setup>
import { ref } from 'vue';

const message = ref('');

const config = useRuntimeConfig()
const HUBSPOT_FORM_NEWSLETTER_ID = config.public.hubspotFormIdNewsletter;
const HUBSPOT_PORTAL_ID = config.public.hubspotPortalId;
const formData = ref({
  email: '',
});


const submitToHubSpot = async (formData) => {
  const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_NEWSLETTER_ID}`;

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
    // clear the form
    formData.email = '';
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
  
  