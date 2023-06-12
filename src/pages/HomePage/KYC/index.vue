<!--
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
-->

<template>
  <div id="app">
    <Welcome
      v-if="step === 1"
      :ready="mediaStreamReady"
      @challenge-details="onChallengeDetails($event)"
      @error="onError($event)"
    />
    <Challenge
      v-else-if="step === 2"
      :details="challengeDetails"
      @local-success="onLocalSuccess($event)"
      @local-fail="onLocalFail()"
      @error="onError($event)"
    />
    <Spinner v-else-if="step === 3" />
    <Result v-else-if="step === 4" :success="success" @restart="onRestart()" />
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
  data() {
    return {
      challengeDetails: {},
      success: false,
      step: 1,
      mediaStreamReady: false,
      errorMessage: "",
    };
  },
  methods: {
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
      }
    );
  },
});
</script>

<style>
#app {
  margin: 15px;
}
</style>
