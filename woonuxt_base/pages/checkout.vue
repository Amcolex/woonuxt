<script setup>
import { StripeElements, StripeElement } from 'vue-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const { t } = useI18n();
const { query } = useRoute();
const { cart, isUpdatingCart, paymentGateways } = useCart();
const { customer, viewer } = useAuth();
const { orderInput, isProcessingOrder, proccessCheckout, createClientSecret, handleRedirection, updateOrderStatus } = useCheckout();
const runtimeConfig = useRuntimeConfig();
const stripeKey = runtimeConfig.public?.STRIPE_PUBLISHABLE_KEY;
const stripeCardIsComplete = ref(false);

const buttonText = ref(isProcessingOrder.value ? t('messages.general.processing') : t('messages.shop.checkoutButton'));
const isCheckoutDisabled = computed(() => {
  if (orderInput.value.paymentMethod === 'stripe') {
    return isProcessingOrder.value || isUpdatingCart.value || !orderInput.value.paymentMethod || !stripeCardIsComplete.value;
  }
  return isProcessingOrder.value || isUpdatingCart.value || !orderInput.value.paymentMethod;
});

const emailRegex = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$');
const isInvalidEmail = ref(false);

const instanceOptions = ref({});
const elementsOptions = ref({});
const cardOptions = ref({ hidePostalCode: true });
const stripeLoaded = ref(false);
const card = ref();
const elms = ref();

// Initialize Stripe.js
onBeforeMount(() => {
  if (query.cancel_order) window.close();
  if (!stripeKey) {
    console.error('Stripe key is not set');
    return;
  }

  const stripePromise = loadStripe(stripeKey);
  stripePromise.then(() => {
    stripeLoaded.value = true;
  });
});

const payNow = async () => {
  buttonText.value = t('messages.general.processing');
  try {
    if (orderInput.value.paymentMethod === 'stripe') {

      // graphql checkout with failed payment:
      const billing = {
        address1: customer.value.billing?.address1,
        address2: customer.value.billing?.address2,
        city: customer.value.billing?.city,
        company: customer.value.billing?.company,
        country: customer.value.billing?.country,
        email: customer.value.billing?.email,
        firstName: customer.value.billing?.firstName,
        lastName: customer.value.billing?.lastName,
        phone: customer.value.billing?.phone,
        postcode: customer.value.billing?.postcode,
        state: customer.value.billing?.state,
      };

      const shipping = {
        address1: customer.value.shipping?.address1,
        address2: customer.value.shipping?.address2,
        city: customer.value.shipping?.city,
        company: customer.value.shipping?.company,
        country: customer.value.shipping?.country,
        email: customer.value.billing?.email,
        firstName: customer.value.shipping?.firstName,
        lastName: customer.value.shipping?.lastName,
        phone: customer.value.shipping?.phone,
        postcode: customer.value.shipping?.postcode,
        state: customer.value.shipping?.state,
      };

      let checkoutPayload = {
        billing,
        shipping: orderInput.value.shipToDifferentAddress ? shipping : billing,
        metaData: orderInput.value.metaData,
        paymentMethod: orderInput.value.paymentMethod,
        customerNote: orderInput.value.customerNote,
        shipToDifferentAddress: orderInput.value.shipToDifferentAddress,
        transactionId: '',
        isPaid: false
      };

      // create account if checked
      if (orderInput.value.createAccount) {
        // @ts-ignore
        checkoutPayload.account = {
          username: customer.value.billing?.email,
          password: orderInput.value.password,
        };
      }

      console.log('checkoutPayload', checkoutPayload);
      const { checkout } = await GqlCheckout(checkoutPayload);
      console.log('checkout', checkout);

      const orderKey = checkout?.order.orderKey;
      console.log('orderKey', orderKey);

      const cardElement = card.value.stripeElement;

      let payload = { orderKey : orderKey}
      console.log('payload', payload);
      let result = await GqlCreatePaymentIntent(payload);

      // parse json of result.createPaymentIntent.data
      const res = JSON.parse(result.createPaymentIntent.data)
      console.log('res', res);

      // const res = await createClientSecret({ orderKey: orderKey })
      console.log('Client Secret', result)
      const client_SECRET = await res['client_secret']
      const payment_secure = await elms.value.instance.confirmCardPayment(client_SECRET, {
        payment_method: {
          card: cardElement,
        }

      });

      if (payment_secure.error) {
        // await updateOrderStatus({ orderId: getCheckout?.order?.databaseId })
        alert('payment failed please try again later')
        // window.location.reload();
        throw new Error('payment failed please try again later')
      }

      await handleRedirection({ checkout: checkout })
    }
  } catch (error) {
    console.log(error, 'clientSeretclientSeretclientSeretclientSeret')
    buttonText.value = t('messages.shop.placeOrder');
    return
  }
};

const checkEmailOnBlur = (email) => {
  if (email) isInvalidEmail.value = !emailRegex.test(email);
};

const checkEmailOnInput = (email) => {
  if (email || isInvalidEmail.value) isInvalidEmail.value = !emailRegex.test(email);
};

/**
 * Watch orderInput.paymentMethod for stripe. If is stripe, add and event listener to .StripeElement to check if it's complete.
 * It will have the class .StripeElement--complete when it's complete. Then set stripeCardIsComplete to true.
 */
watch(
  () => orderInput.value.paymentMethod,
  (newVal) => {
    if (newVal === 'stripe') {
      setTimeout(() => {
        const stripeElement = document.querySelector('.StripeElement');
        if (stripeElement) {
          // Watch .StripeElement dom element. When it has the class .StripeElement--complete, set stripeCardIsComplete to true.
          const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
              if (mutation.attributeName === 'class') {
                const attributeValue = mutation.target.getAttribute(mutation.attributeName);
                stripeCardIsComplete.value = attributeValue.includes('StripeElement--complete');
              }
            });
          });
          observer.observe(stripeElement, { attributes: true });
        }
      }, 1000);
    } else {
      stripeCardIsComplete.value = false;
    }
  },
);
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