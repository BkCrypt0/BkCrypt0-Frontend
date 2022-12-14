export const THEME_MODE = {
  DARK: "dark",
  LIGHT: "light",
};
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
    color: "rgba(20, 153, 250, 0.5)",
    stroke: "#006DBC",
    text: "This identity is available to claim",
  },
  1: {
    stroke: "#976D00",
    color: "rgba(238, 171, 0, 0.5)",
    text: "This identity is claimed. Please wait until it is active",
  },
  2: {
    stroke: "#008E30",
    color: "rgba(32, 215, 83, 0.5)",
    text: "This identity is active",
  },
  3: {
    stroke: "#8C0000",
    color: "rgba(255, 46, 0, 0.5)",
    text: "This identity is revoked",
  },
};

export const ID_STATUS = ["PENDING", "CLAIMED", "PUBLISHED", "REVOKED"];

export const BASE_API_URL = "http://194.146.12.190:8000";

export const CONTRACT_ADDRESS = "0xeB2649274522C98a5Ded4efE0B8ADd768e0A8B60";

export const PROVIDER_URL = "https://data-seed-prebsc-1-s1.binance.org:8545/";

export const CONTRACT_OWNER_ADDRESS =
  "0x595622cbd0fc4727df476a1172ada30a9ddf8f43";
