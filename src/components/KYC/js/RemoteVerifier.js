// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import axios from "axios";
import Logger from "js-logger";
import { Utils } from "./Utils.js";

export class RemoteVerifier {
  constructor(challengeId, token, videoElement) {
    this.challengeId = challengeId;
    this.token = token;
    this.videoElement = videoElement;
    this.promises = [];

    // Create canvas to convert video frames to blob
    this.invisibleCanvas = document.createElement("canvas");
    this.invisibleCanvas.width = this.videoElement.width;
    this.invisibleCanvas.height = this.videoElement.height;
  }

  uploadFrame() {
    const context = this.invisibleCanvas.getContext("2d");
    if (context === null) {
      throw "Error getting canvas context";
    }
    context.drawImage(
      this.videoElement,
      0,
      0,
      this.videoElement.width,
      this.videoElement.height
    );

    if (Utils.getConfigBooleanValue("FLIP_VIDEO")) {
      context.scale(-1, 1);
    }

    const canvas = this.invisibleCanvas;
    const self = this;
    this.promises.push(
      new Promise(function (resolve, reject) {
        canvas.toBlob(
          function (blob) {
            if (blob === null) {
              reject(new Error("Error creating blob from canvas"));
            } else {
              RemoteVerifier.callFramesApi(
                self.challengeId,
                self.token,
                blob,
                resolve,
                reject
              );
            }
          },
          "image/jpeg",
          parseFloat(Utils.getConfig().IMAGE_JPG_QUALITY)
        );
      })
    );
  }

  static callFramesApi(challengeId, token, blob, resolve, reject) {
    Logger.info("uploading frame");
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      const framesEndpoint =
        Utils.getConfig().API_FRAMES_ENDPOINT_PATTERN.replace(
          "{challengeId}",
          challengeId
        );
      const url = Utils.getConfig().API_URL + framesEndpoint;

      Logger.info(`calling ${url}`);
      const dataUrl = reader.result;
      const requestData = {
        timestamp: Date.now(),
        framesBase64: dataUrl.substr(dataUrl.indexOf(",") + 1),
        token: token,
      };
      Logger.info(requestData);
      const promise = axios.put(url, requestData);
      promise
        .then(function (response) {
          Logger.info(response);
          const verifyResponseData = response.data;
          Logger.info(verifyResponseData);
          Logger.info("frame successfully uploaded");
          resolve();
        })
        .catch(function (error) {
          Logger.error(error);
          reject(error);
        });
    };
  }

  verify(successCallback, errorCallback) {
    Logger.debug(this.promises);
    const self = this;
    Promise.all(this.promises).then(function () {
      Logger.info("all frames uploaded");
      const requestData = {
        token: self.token,
      };
      self.callVerificationApi(requestData, successCallback, errorCallback);
    });
  }

  callVerificationApi(requestData, successCallback, errorCallback) {
    const verifyEndpoint =
      Utils.getConfig().API_VERIFY_ENDPOINT_PATTERN.replace(
        "{challengeId}",
        this.challengeId
      );
    const url = Utils.getConfig().API_URL + verifyEndpoint;

    Logger.info(`calling ${url}`);
    Logger.info(requestData);
    const promise = axios.post(url, requestData);
    promise
      .then(function (response) {
        Logger.info(response);
        const verifyResponseData = response.data;
        Logger.info(verifyResponseData);
        successCallback(verifyResponseData.message);
      })
      .catch(function (error) {
        Logger.error(error);
        errorCallback(error);
      });
  }
}
