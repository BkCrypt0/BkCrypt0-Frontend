import Logger from "js-logger";
import { FaceState } from "./States.js";
import { FailState } from "./States.js";
import { NoseState } from "./States.js";
import { SuccessState } from "./States.js";

export class StateManager {
  constructor(challengeDetails) {
    this.challengeDetails = challengeDetails;
    this.changeCurrentState(new FaceState(this.challengeDetails));
  }

  process(result) {
    Logger.debug(`current state: ${this.currentState.getName()}`);

    if (this.endTime > 0 && Date.now() / 1000 > this.endTime) {
      Logger.info(`fail: state timed out`);
      this.changeCurrentState(new FailState(this.challengeDetails));
    }
    const stateOutput = this.currentState.process(result);
    if (stateOutput.nextState) {
      this.changeCurrentState(stateOutput.nextState);
    }

    let end = false;
    let shouldSaveFrame = false;
    let success;
    if (this.currentState.getName() === SuccessState.NAME) {
      end = true;
      success = true;
      shouldSaveFrame = true;
    } else if (this.currentState.getName() === FailState.NAME) {
      end = true;
      success = false;
    } else if (this.currentState.getName() === NoseState.NAME) {
      shouldSaveFrame = true;
    }
    return {
      end: end,
      success: success,
      shouldSaveFrame: shouldSaveFrame,
      drawOptions: stateOutput.drawOptions,
      helpMessage: stateOutput.helpMessage,
      helpAnimationNumber: stateOutput.helpAnimationNumber,
    };
  }

  changeCurrentState(state) {
    if (this.currentState !== state) {
      this.currentState = state;
      this.endTime =
        state.getMaximumDurationInSeconds() != -1
          ? Date.now() / 1000 + state.getMaximumDurationInSeconds()
          : -1;
    }
  }
}
