// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import * as faceapi from "face-api.js";

export class Drawer {
  static COLOR_RED = "rgba(255, 0, 0, 1)";
  static COLOR_GREEN = "rgba(0, 255, 0, 1)";
  static COLOR_YELLOW = "rgba(255, 255, 0, 1)";

  constructor(challengeDetails, canvasElement) {
    this.challengeDetails = challengeDetails;
    this.canvasElement = canvasElement;
  }

  draw(drawOptions) {
    if (drawOptions.faceDrawBoxOptions) {
      const faceAreaBox = {
        x: this.challengeDetails.areaLeft,
        y: this.challengeDetails.areaTop,
        width: this.challengeDetails.areaWidth,
        height: this.challengeDetails.areaHeight,
      };
      this.drawArea(faceAreaBox, drawOptions.faceDrawBoxOptions);
    }
    if (drawOptions.noseDrawBoxOptions) {
      const noseAreaBox = {
        x: this.challengeDetails.noseLeft,
        y: this.challengeDetails.noseTop,
        width: this.challengeDetails.noseWidth,
        height: this.challengeDetails.noseHeight,
      };
      this.drawArea(noseAreaBox, drawOptions.noseDrawBoxOptions);
    }
  }

  drawArea(box, drawBoxOptions) {
    const drawBox = new faceapi.draw.DrawBox(box, drawBoxOptions);
    drawBox.draw(this.canvasElement);
  }
}
