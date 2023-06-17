import Logger from "js-logger";
import { Drawer } from "./Drawer.js";
import { Utils } from "./Utils.js";

export class State {
  constructor(challengeDetails) {
    this.challengeDetails = challengeDetails;
  }

  process(
    // eslint-disable-next-line
    _faces
  ) {
    return {};
  }

  getMaximumDurationInSeconds() {
    return -1;
  }

  isFaceBoxInsideFaceArea(faceBox, addTolerance = true) {
    const tolerance = addTolerance
      ? parseInt(Utils.getConfig().FACE_AREA_TOLERANCE_PERCENT) / 100
      : 0;
    return (
      faceBox.x >= this.challengeDetails.areaLeft * (1 - tolerance) &&
      faceBox.y >= this.challengeDetails.areaTop * (1 - tolerance) &&
      faceBox.x + faceBox.width <=
        this.challengeDetails.areaLeft +
          this.challengeDetails.areaWidth * (1 + tolerance) &&
      faceBox.y + faceBox.height <=
        this.challengeDetails.areaTop +
          this.challengeDetails.areaHeight * (1 + tolerance)
    );
  }

  isNoseInsideNoseArea(nose) {
    return (
      nose.x >= this.challengeDetails.noseLeft &&
      nose.y >= this.challengeDetails.noseTop &&
      nose.x <=
        this.challengeDetails.noseLeft + this.challengeDetails.noseWidth &&
      nose.y <= this.challengeDetails.noseTop + this.challengeDetails.noseHeight
    );
  }
}

export class FailState extends State {
  static NAME = "FailState";

  getName() {
    return FailState.NAME;
  }
}

export class SuccessState extends State {
  static NAME = "SuccessState";

  getName() {
    return SuccessState.NAME;
  }
}

export class NoseState extends State {
  static NAME = "NoseState";

  framesWithoutFace = 0;
  landmarkIndex = parseInt(Utils.getConfig().LANDMARK_INDEX);

  process(faces) {
    let nextState = this;
    if (faces.length === 1) {
      if (this.isFaceBoxInsideFaceArea(faces[0].detection.box)) {
        if (
          this.isNoseInsideNoseArea(
            faces[0].landmarks.positions[this.landmarkIndex]
          )
        ) {
          nextState = new SuccessState(this.challengeDetails);
        }
      } else {
        Logger.info(
          `NoseState fail: isFaceBoxInsideFaceArea=${this.isFaceBoxInsideFaceArea(
            faces[0].detection.box
          )}`
        );
        nextState = new FailState(this.challengeDetails);
      }
    } else {
      if (
        faces.length !== 0 ||
        ++this.framesWithoutFace >
          parseInt(Utils.getConfig().STATE_NOSE_MAX_FRAMES_WITHOUT_FACE)
      ) {
        Logger.info(
          `NoseState fail: #faces=${faces.length} framesWithoutFace=${this.framesWithoutFace}`
        );
        nextState = new FailState(this.challengeDetails);
      } else {
        Logger.debug(`no face detected. Skipping frame...`);
      }
    }
    const drawOptions = {
      faceDrawBoxOptions: {
        boxColor: Drawer.COLOR_GREEN,
      },
      noseDrawBoxOptions: {
        boxColor: Drawer.COLOR_YELLOW,
      },
    };
    return {
      nextState: nextState,
      drawOptions: drawOptions,
      helpMessage: "Di chuyển sao cho mũi ở trong vùng nhỏ",
      helpAnimationNumber: 2,
    };
  }

  getMaximumDurationInSeconds() {
    return parseInt(Utils.getConfig().STATE_NOSE_DURATION_IN_SECONDS);
  }

  getName() {
    return NoseState.NAME;
  }
}

export class AreaState extends State {
  static NAME = "AreaState";

  framesWithoutFace = 0;

  process(faces) {
    let nextState = this;
    let boxColor = Drawer.COLOR_RED;
    if (faces.length === 1) {
      if (this.isFaceBoxInsideFaceArea(faces[0].detection.box, false)) {
        boxColor = Drawer.COLOR_GREEN;
        nextState = new NoseState(this.challengeDetails);
      }
    } else {
      if (
        faces.length !== 0 ||
        ++this.framesWithoutFace >
          parseInt(Utils.getConfig().STATE_AREA_MAX_FRAMES_WITHOUT_FACE)
      ) {
        Logger.info(
          `AreaState fail: #faces=${faces.length} framesWithoutFace=${this.framesWithoutFace}`
        );
        nextState = new FailState(this.challengeDetails);
      } else {
        Logger.debug(`no face detected. Skipping frame...`);
      }
    }
    const drawOptions = {
      faceDrawBoxOptions: {
        boxColor: boxColor,
      },
    };
    return {
      nextState: nextState,
      drawOptions: drawOptions,
      helpMessage: "Đưa mặt bạn vào chính giữa",
      helpAnimationNumber: 1,
    };
  }

  getMaximumDurationInSeconds() {
    return parseInt(Utils.getConfig().STATE_AREA_DURATION_IN_SECONDS);
  }

  getName() {
    return AreaState.NAME;
  }
}

export class FaceState extends State {
  static NAME = "FaceState";

  process(faces) {
    let nextState = this;
    let helpMessage = undefined;
    switch (faces.length) {
      case 0:
        helpMessage = "Không thấy mặt. Hãy nhìn vào camera";
        break;
      case 1:
        nextState = new AreaState(this.challengeDetails);
        break;
      default:
        helpMessage =
          "Phát hiện nhiều khuôn mặt. Chỉ được một người trong hình";
    }
    const drawOptions = {
      faceDrawBoxOptions: {
        boxColor: Drawer.COLOR_RED,
      },
    };
    return {
      nextState: nextState,
      drawOptions: drawOptions,
      helpMessage: helpMessage,
    };
  }

  getName() {
    return FaceState.NAME;
  }
}
