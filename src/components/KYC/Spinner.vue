<!--
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
-->

<template>
  <div class="text-center mt-5">
    <div class="lds-ripple">
      <div></div>
      <div></div>
    </div>
    <h2
      class="MuiTypography-root MuiTypography-h6 css-v0rmzm-MuiTypography-root mt-5 process-text"
    >
      Đang xử lý...
    </h2>
  </div>
</template>

<script lang="js">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Spinner",
});
</script>

<style scoped>
.lds-ripple {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid #253f4b;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  4.9% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  5% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}

.process-text {
  font-weight: 450px !important;
}
</style>
