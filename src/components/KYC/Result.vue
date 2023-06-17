<!--
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
-->

<template>
  <div class="text-center">
    <lottie :options="lottieOptions" :height="200" :width="200" />
    <div
      class="MuiTypography-root MuiTypography-h4 css-v0rmzm-MuiTypography-root"
    >
      {{ title }}
    </div>
    <div
      style="margin-top: 0 !important"
      class="MuiTypography-root MuiTypography-h6 css-v0rmzm-MuiTypography-root"
    >
      <small class="text-muted">{{ message }}</small>
    </div>
    <button
      type="button"
      style="margin-top: 25px"
      class="css-ey2eoo-MuiButtonBase-root-MuiButton-root vue-btn"
      @click="completed"
    >
      {{ buttonText }}
    </button>
  </div>
</template>

<script lang="js">
import Lottie from "vue-lottie";
import * as successData from "src/assets/lottie/success.json";
import * as failData from "src/assets/lottie/fail.json";

const SUCCESS_TITLE = "Xác thực thành công";
const SUCCESS_MESSAGE = "Khuôn mặt trùng khớp!";
const SUCCESS_BUTTON = "Bước tiếp theo";
const FAIL_TITLE = "Xác thực thất bại";
const FAIL_MESSAGE = "Không phát hiện được người thật!";
const FAIL_BUTTON = "Thử lại";

import { defineComponent } from "vue";

export default defineComponent({
  name: "Result",
  components: {
    Lottie,
  },
  props: {
    success: Boolean,
    setActiveStep: Function,
  },
  methods: {
    completed() {
      return this.success ? this.$emit('complete') : this.$emit('restart');
    },
  },
  computed: {
    title(){
      return this.success ? SUCCESS_TITLE : FAIL_TITLE;
    },
    message(){
      return this.success ? SUCCESS_MESSAGE : FAIL_MESSAGE;
    },
    buttonText(){
      return this.success ? SUCCESS_BUTTON : FAIL_BUTTON;
    },
    lottieOptions(){
      return {
        // @ts-ignore
        animationData: this.success ? successData.default : failData.default,
        loop: false,
      };
    },
  },
});
</script>

<style>
.text-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
