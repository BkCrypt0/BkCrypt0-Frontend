export const config = {
  REACT_APP_DRAW_DETECTIONS: false,
  REACT_APP_PROFILING: false,
  REACT_APP_API_URL: "http://localhost:3001/api/",
  REACT_APP_API_START_ENDPOINT: "challenge/start",
  REACT_APP_API_FRAMES_ENDPOINT_PATTERN: "{challengeId}/frames",
  REACT_APP_API_VERIFY_ENDPOINT_PATTERN: "{challengeId}/verify",
  REACT_APP_IMAGE_WIDTH: 640,
  REACT_APP_IMAGE_HEIGHT: 480,
  REACT_APP_IMAGE_JPG_QUALITY: 0.7,
  REACT_APP_STATE_AREA_DURATION_IN_SECONDS: 30,
  REACT_APP_STATE_NOSE_DURATION_IN_SECONDS: 10,
  REACT_APP_STATE_AREA_MAX_FRAMES_WITHOUT_FACE: 2,
  REACT_APP_STATE_NOSE_MAX_FRAMES_WITHOUT_FACE: 4,
  REACT_APP_MAX_FPS: 12,
  REACT_APP_FACE_AREA_TOLERANCE_PERCENT: 15,
  REACT_APP_FLIP_VIDEO: true,
  REACT_APP_LANDMARK_INDEX: 30,
};