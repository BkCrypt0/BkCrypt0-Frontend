// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import Logger from "js-logger";
import { v4 as uuidv4 } from "uuid";
import { config } from "./Config";

export class Utils {
  static KEY_PREFIX = "REACT_APP_";

  static loadConfig() {
    // const envKeys = Object.keys(process.env);
    const envKeys = Object.keys(config);
    const map = new Map();
    envKeys.forEach(function (envKey) {
      const key = envKey.replace(Utils.KEY_PREFIX, "");
      // const value = process.env[envKey];
      const value = config[envKey];
      map.set(key, value);
    });
    window.config = Object.fromEntries(map);
  }

  static getConfig() {
    return window.config;
  }

  static getConfigBooleanValue(configKey) {
    return (
      Utils.getConfig()[configKey].toString().trim().toLowerCase() === "true"
    );
  }

  static isProfiling() {
    return Utils.getConfigBooleanValue("PROFILING");
  }

  static configureLogger() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    Logger.useDefaults();
    if (process.env.NODE_ENV === "production") {
      Logger.setLevel(Logger.OFF);
    }
    window.Logger = Logger;
  }

  static loadMediaStream(successCallback, errorCallback, mobile) {
    const constraints = {
      audio: false,
      video: {
        width: mobile
          ? window.innerWidth - 36
          : parseInt(Utils.getConfig().IMAGE_WIDTH),
        height: mobile
          ? window.innerWidth * 1.1
          : parseInt(Utils.getConfig().IMAGE_HEIGHT),
        facingMode: "user",
      },
    };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (mediaStream) {
        try {
          const mediaStreamInfo = {
            mediaStream: mediaStream,
            actualHeight: mediaStream.getVideoTracks()[0].getSettings().height,
            actualWidth: mediaStream.getVideoTracks()[0].getSettings().width,
          };
          Logger.info(
            `media info: actualHeight=${mediaStreamInfo.actualHeight} actualWidth=${mediaStreamInfo.actualWidth}`
          );
          window.mediaStreamInfo = mediaStreamInfo;
        } catch (error) {
          Logger.error(error);
          errorCallback("Error getting video actual sizes");
        }
        successCallback();
      })
      .catch(function (error) {
        Logger.error(error);
        errorCallback("Error getting access to the camera");
      });
  }

  static getMediaStreamInfo() {
    return window.mediaStreamInfo;
  }

  static getUserId() {
    let userId = window.localStorage.getItem("userId");
    if (userId === null) {
      userId = uuidv4();
      window.localStorage.setItem("userId", userId);
    }
    Logger.info(`userId=${userId}`);
    return userId;
  }
}
