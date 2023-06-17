<!--
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
-->

<template>
  <div id="app" v-bind:class="active">
    <Welcome
      v-if="step === 1"
      :ready="mediaStreamReady"
      :mobile="mobile"
      @challenge-details="onChallengeDetails($event)"
      @error="onError($event)"
    />
    <Challenge
      v-else-if="step === 2"
      :details="challengeDetails"
      :imageIDBase64="imageIDBase64"
      :mobile="mobile"
      @local-success="onLocalSuccess($event)"
      @local-fail="onLocalFail()"
      @error="onError($event)"
    />
    <Spinner v-else-if="step === 3" />
    <Result
      v-else-if="step === 4"
      :success="success"
      @restart="onRestart()"
      @complete="handleCompleteFaceScan()"
    />
    <Error
      v-else-if="step === -1"
      :message="errorMessage"
      @restart="onRestart()"
    />
  </div>
</template>

<script lang="js">
import { defineComponent } from "vue";
import Challenge from "src/components/KYC/Challenge.vue";
import Spinner from "src/components/KYC/Spinner.vue";
import Welcome from "src/components/KYC/Welcome.vue";
import Result from "src/components/KYC/Result.vue";
import Error from "src/components/KYC/Error.vue";
import { ChallengeProcessor } from "src/components/KYC/js/ChallengeProcessor.js";
import { Utils } from "src/components/KYC/js/Utils.js";

Utils.loadConfig();
Utils.configureLogger();

export default defineComponent({
  name: "App",
  components: {
    Welcome,
    Challenge,
    Spinner,
    Result,
    Error,
  },
  props: {
    imageIDBase64: String,
    activeStep: Number,
    setActiveStep: Function,
    mobile: Boolean
  },
  data() {
    return {
      active: this.activeStep === 1 ? 'active' : 'normal',
      challengeDetails: {},
      success: false,
      step: 1,
      mediaStreamReady: false,
      errorMessage: "",
    };
  },
  methods: {
    handleCompleteFaceScan() {
      this.setActiveStep(2);
    },
    onChallengeDetails(challengeDetails) {
      this.challengeDetails = challengeDetails;
      this.step = 2;
    },
    onLocalSuccess(remoteVerifier){
      this.step = 3;

      const self = this;
      remoteVerifier.verify(
        function (success) {
          self.success = success;
          self.step = 4;
        },
        function (error) {
          self.onError(error);
        }
      );
    },
    onLocalFail() {
      this.success = false;
      this.step = 4;
    },
    onRestart(){
      this.step = 1;
    },
    onError(error) {
      this.errorMessage = error.name + ": " + error.message;
      this.step = -1;
    },
  },
  mounted: function () {
    ChallengeProcessor.loadModels();

    const self = this;
    Utils.loadMediaStream(
      function () {
        self.mediaStreamReady = true;
      },
      function (message) {
        self.errorMessage = message;
        self.step = -1;
      },
      this.mobile
    );
  },
});
</script>

<style>
#app {
  display: none;
}
.active {
  display: flex !important;
  flex-direction: column;
  align-items: center;
}
</style>
