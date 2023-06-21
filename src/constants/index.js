export const LS = {
  THEME: "theme",
  PUBLIC_KEY: "public key",
  PRIVATE_KEY: "private key",
  PASSWORD: "password",
  ACTIVE_ACCOUNT: "active account",
  NAME: "name",
  LOGIN: "is login",
  ROLE: "role",
};

export const SCREEN_SIZE = {
  MOBILE: "(max-width:600px)",
  TABLET: "(max-width: 1000px)",
};

export const FS = {
  IDLE: "idle",
  FETCHING: "fetching",
  UPDATING: "updating",
  SUCCESS: "success",
  FAILED: "failed",
};
export const CONNECTION_STATUS = {
  DISCONNECTED: "Not connected",
  CONNECTED: "Connected",
};

export const INFO_STATUS = {
  0: {
    color: "rgba(238, 171, 0, 0.5)",
    stroke: "#976D00",
    text: "Định danh của bạn đang chờ được phê duyệt",
  },
  1: {
    stroke: "#006DBC",
    color: "rgba(20, 153, 250, 0.5)",
    text: "Định danh của bạn đang chờ được kích hoạt",
  },
  2: {
    stroke: "#008E30",
    color: "rgba(32, 215, 83, 0.5)",
    text: "Đinh danh này đã được kích hoạt",
  },
  3: {
    stroke: "#8C0000",
    color: "rgba(255, 46, 0, 0.5)",
    text: "Định danh này đã bị chính phủ khóa kích hoạt",
  },
};

export const ID_STATUS = [
  "Chờ phê duyệt",
  "Đã duyệt",
  "Đã phát hành",
  "Đã khoá",
];

export const BASE_API_URL = "http://localhost:8000";
// export const BASE_API_URL = "http://192.168.1.37:8000";

export const CONTRACT_ADDRESS = "0x82559921806e305D55739E523bc4887A12401Aa7";

export const PROVIDER_URL = "https://data-seed-prebsc-1-s1.binance.org:8545/";

export const CONTRACT_OWNER_ADDRESS =
  "0x2ef546e1920868dbb0729347bBfD60e96Eb4208B";
