import { createSlice } from "@reduxjs/toolkit";
import { CONNECTION_STATUS } from "../constants";
const Web3 = require("web3");

const initialState = {
  address: undefined,
  network: 97,
  connectionStatus: CONNECTION_STATUS.DISCONNECTED,
};

export const handleConnectWallet = () => async (dispatch) => {
  try {
    const res = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    dispatch(connectWalletSuccess(res));
  } catch (error) {
    console.error("Some errors occurred!");
  }
};

export const handleDisconnectWallet = () => (dispatch) => {
  dispatch(disconnectWalletSuccess());
};

export const handleSwitchChain = async () => {
  if (window.ethereum.networkVersion !== 97) {
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainName: "BSC Testnet",
            chainId: Web3.utils.toHex(97),
            rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
          },
        ],
      });
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: Web3.utils.toHex(97) }],
      });
    } catch (err) {
      // This error code indicates that the chain has not been added to MetaMask
      console.log(err);
    }
  }
};

const walletSlice = createSlice({
  name: "wallet",
  initialState: initialState,
  reducers: {
    disconnectWalletSuccess: (state) => {
      state.address = initialState.address;
      state.connectionStatus = initialState.connectionStatus;
    },
    connectWalletSuccess: (state, action) => {
      state.address = action.payload[0];
      state.connectionStatus = CONNECTION_STATUS.CONNECTED;
    },
  },
});
export const { disconnectWalletSuccess, connectWalletSuccess } =
  walletSlice.actions;
export default walletSlice.reducer;
