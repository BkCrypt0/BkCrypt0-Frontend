<!--
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
-->

<template>
  <div class="text-center">
    <lottie :options="lottieOptions" :height="300" :width="300" />
    <h4 class="display-4 mt-4"><strong>Liveness</strong> Detection</h4>
    <div v-if="loading" class="spinner-border mt-5" role="status" />
    <button
      v-else
      type="button"
      :disabled="!ready"
      class="btn btn-primary btn-lg mt-5"
      @click="start()"
    >
      Verify now!
    </button>
  </div>
</template>

<script lang="js">
import { defineComponent } from "vue";
import Lottie from "vue-lottie";
import { RemoteStarter } from "./js/RemoteStarter.js";
import * as welcomeData from "src/assets/lottie/welcome.json";

export default defineComponent({
  name: "Welcome",
  components: {
    Lottie,
  },
  props: {
    ready: Boolean,
  },
  data() {
    return {
      lottieOptions: {
        // @ts-ignore
        animationData: welcomeData.default,
        loop: false,
      },
      loading: false,
    };
  },
  methods: {
    start(){
      this.loading = true;
      const self = this;
      RemoteStarter.startChallenge(
        function (challengeDetails) {
          // Make sure all models are loaded
          Promise.all(window.modelPromises).then(function () {
            self.$emit("challenge-details", challengeDetails);
          });
        },
        function (error) {
          self.$emit("error", error);
        }
      );
    },
  },
});
</script>

<style scoped></style>
