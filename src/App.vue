<template>
  <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">

    <!--
      Main page popup comments Starts
      Thankyou popup on the main page.
      This popup will open when we hit any button ("Great Keep up the good work", 
      "Okay, but there's room for improvement in some areas.", "Not satisfied need significant improvements.")
    -->
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50" v-if="showOverlay">
      <!--
        "showOverlay" is a conditional variable that can be true or false; in the false case, 
        the popup will be hidden, and in the true case, the popup will be shown on the screen.
      -->
      <div class="bg-white rounded p-5 text-center max-w-lg mx-auto">

        <h2 class="text-2xl font-bold mb-3">Thank You!</h2>
        <p class="text-xl">We're thrilled to hear that you had an awesome experience with us! If you're
          willing, we would greatly appreciate it if you could

          <!-- 
            Redirection to the third-party link provided in "href" By 
            clicking on the content written in the <a> tag
          -->
          <a href="https://g.page/r/CVam69BGprYlEBM/review" target="_blank" class="text-blue-600 underline">
            leave us a Google Review</a>
          . Your positive feedback will help others learn about our services and the work we do.
        </p>
        <p class="text-xl mt-3 font-bold">
          <a href="https://g.page/r/CVam69BGprYlEBM/review" target="_blank" class="text-blue-500 underline">Google
            Review Link</a>
          <br>or<br>
          <a href="https://www.endeavourwealth.ca/" target="_blank" class="text-yellow-500 underline">Maybe Later</a>
        </p>
      </div>
    </div>
    <!--
      Main page popup comments End
    -->


    <!--
      The logo EVANCED Start; to change it, add a new image in the /img folder and paste 
      the full name below the src tag, like../img/new-imagename.png.
    -->
    <div class="flex items-center justify-center md:w-1/4 w-4/5 m-auto mb-4"><img src="../img/EWM_Logo.png"></div>
    <!--
      The logo EVANCED; Ends
    -->
    <h1 class="text-4xl font-bold mb-10 text-center">We value your feedback :-)</h1>
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div
        class="absolute inset-0 bg-gradient-to-r from-green-500 to-green-50 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
      </div>

      <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <h2 class="text-2xl font-bold">How are we doing?</h2>
        <div class="mt-5 space-y-3">
          <!--
            "callZapierWebhook" is a click event working on all three rating buttons. 
            Search and go to the callZapierWebhook function.
          -->
          <!-- Great Button Starts-->
          <button :disabled="buttonsDisabled.great" @click="callZapierWebhook('Great, keep up the good work!')"
            class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded h-20">Great, keep up
            the good work!</button>
          <!--Great Button Ends -->

          <!-- Okay Button Starts-->
          <button :disabled="buttonsDisabled.ok"
            @click="callZapierWebhook('Okay, but there is room for improvement in some areas.')"
            class="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded h-20">Okay, but
            there's room for improvement in some areas.</button>
          <!-- Okay Button Ends-->

          <!-- Not Satisfied Button Starts-->
          <button :disabled="buttonsDisabled.notok"
            @click="callZapierWebhook('Not satisfied, needs significant improvement.')"
            class="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded h-20">Not satisfied, needs
            significant improvement.</button>
          <!-- Not Satisfied Button Ends-->


        </div>

        <!-- 
          This message box will shown if the user clicks on the "Submit Feedback" button, Starts
        -->
        <div v-if="showMessageOk" v-bind:class="{ 'animate__shakeX': showMessage }"
          class="mt-5 animate__animated bg-yellow-200 p-4 rounded border border-yellow-300">
          <p class="text-sm font-semibold">Thank you for sharing your feedback.</p>
        </div>
        <!-- Ends -->
        <!-- 
        This message box will shown if the user clicks on the second option "Okay, but there's room for improvement in some areas.", Starts
      -->
        <div v-if="showFeedbackForm" class="mt-5">
          <form @submit.prevent="submitFeedback">
            <label class="block font-bold mb-2">Please leave your feedback below:</label>
            <textarea class="border rounded w-full py-2 px-3" rows="5" v-model="feedback"></textarea>
            <button class="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-2" type="submit">Submit
              Feedback</button>
          </form>
        </div>
        <!-- Ends -->

        <!-- 
          This message box will shown if the user clicks on the third option "Not satisfied, needs significant improvement.", Starts
          -->
        <div v-if="showMessageNotOk" v-bind:class="{ 'animate__shakeX': showMessage }"
          class="mt-5 animate__animated bg-yellow-200 p-4 rounded border border-yellow-300">
          <p class="text-sm font-semibold">Thank you for your feedback. If you would like to share more about how we can
            improve, please <a href="https://calendly.com/evanced-net/evanced-customer-pulse" target="_blank"
              class="text-blue-600 underline">schedule a call with us</a>. We look forward to hearing from you!</p>
        </div>
        <!-- Ends -->

      </div>

    </div>
  </div>
  <img id="rocket" src="../img/rocket.png"
    class="hidden w-25 h-auto absolute left-1/2 bottom-10 transform -translate-x-1/2" />
</template>
<style>
/* Animation on the first option submission  */
@keyframes rocketAnimation {
  0% {
    transform: translateY(0) translateX(-50%);
    opacity: 0;
  }

  100% {
    transform: translateY(-1000px) translateX(400%);
    opacity: 1;
  }
}
</style>
<script>
import confetti from 'canvas-confetti';
import 'animate.css';

export default {
  data() {
    return {
      tite: 'great title',
      showMessageNotOk: false, /* Show or hide the message box after clicking the third option. */
      showMessageOk: false, /* Show or hide the message box after submitting the feedback.*/
      buttonsDisabled: { /* Make all three buttons disabled and enabled. */
        great: false,
        ok: false,
        notok: false,
      },
      showFeedbackForm: false, /* Show or hide the feedback form */
      feedback: '', /* variable to store feetback temporarily */
      showOverlay: false, /* Show and hide the Thank you popup */
    };
  },
  methods: {
    /* 
    this function sends the user rating to the link and the data collected from our project's 
    routing link and click event like http://localhost:8080/123456789/samosys

    here the method is getting data from params so this.$route.params.id will be '123456789' and 
    this.$route.params.customerAcronym will be 'samosys'
    */
    async callZapierWebhook(buttonText) {
      /* 
      const webhookURL = 'https://hooks.zapier.com/hooks/catch/2829215/3uhamgs/'; 
      */
      const webhookURL = '';

      const data = {
        id: this.$route.params.id, /* 123456789 */
        customer_acronym: this.$route.params.customerAcronym, /*  samosys */
        button_text: buttonText, /* a text from any of three buttons */
      };
      console.log(data); /* printed in inspect/console */

      /*  Convert the data object to query string parameters */
      const queryString = new URLSearchParams(data).toString();

      await fetch(`${webhookURL}?${queryString}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (buttonText === 'Not satisfied, needs significant improvement.') {
        this.showMessageNotOk = true;
      }
      else if (buttonText == 'Great, keep up the good work!') {
       /* confetti */
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
        /* Add rocket animation */
        const rocket = document.getElementById('rocket');
        rocket.classList.remove('hidden');
        rocket.style.animation = 'rocketAnimation 2s linear';
        setTimeout(() => {
          rocket.style.animation = '';
          rocket.classList.add('hidden');
        }, 2000);
        /* show Thank you popup */
        await new Promise(resolve => setTimeout(resolve, 3000));
        this.showOverlay = true;
      }
      else if (buttonText == 'Okay, but there is room for improvement in some areas.') {
        this.showFeedbackForm = true;
      }

      /*  Disable buttons */
      this.buttonsDisabled.ok = true;
      this.buttonsDisabled.notok = true;
      this.buttonsDisabled.great = true;
    },
    /* 
    if user clicks on the second option then he can submit their words in feedback 
    form and the below mehtod can send it to provided link (API) 
    */
    submitFeedback() {
      // const webhookURL = 'https://hooks.zapier.com/hooks/catch/2829215/3uhnc61/';
      const webhookURL = '';
      const data = {
        id: this.$route.params.id,
        customer_acronym: this.$route.params.customerAcronym,
        feedback_text: this.feedback, // the text written by user in form 
      };

      // Convert the data object to query string parameters
      const queryString = new URLSearchParams(data).toString();

      fetch(`${webhookURL}?${queryString}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      })
        .then(() => {
          this.showFeedbackForm = false;
          this.showMessageOk = true;
          this.feedback = '';
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
        })
        .catch((error) => {
          console.error('Error submitting feedback:', error);
        });
    },
  },
};
</script>
