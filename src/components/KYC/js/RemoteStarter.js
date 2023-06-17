// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import axios from "axios";
import Logger from "js-logger";
import { Utils } from "./Utils.js";

export class RemoteStarter {
  static startChallenge(successCallback, errorCallback, mobile) {
    const url =
      Utils.getConfig().API_URL + Utils.getConfig().API_START_ENDPOINT;
    const startRequestData = {
      userId: Utils.getUserId(),
      imageWidth: Utils.getMediaStreamInfo().actualWidth,
      imageHeight: Utils.getMediaStreamInfo().actualHeight,
    };
    Logger.info(`calling ${url}`);
    Logger.info(startRequestData);
    axios
      .post(url, startRequestData)
      .then(function (response) {
        Logger.info(response);
        const challengeDetails = response.data;
        Logger.info(challengeDetails);
        successCallback(challengeDetails);
      })
      .catch(function (error) {
        Logger.error(error);
        errorCallback(error);
      });
  }
}
