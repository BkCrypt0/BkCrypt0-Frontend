import abi from "../abi/KYC.json";
import { CONTRACT_ADDRESS, PROVIDER_URL } from "src/constants";

const Web3 = require("web3");
const web3Sender = new Web3(window.ethereum);
const web3Reader = new Web3(PROVIDER_URL);
const contractSender = new web3Sender.eth.Contract(abi, CONTRACT_ADDRESS);
const contractReader = new web3Reader.eth.Contract(abi, CONTRACT_ADDRESS);

export const verifyProof = async (object) => {
  try {
    const res = await contractReader.methods
      .verifyProof(
        object.optionName,
        object.pi_a,
        object.pi_b,
        object.pi_c,
        object.input
      )
      .call();
    return res;
  } catch (err) {
    console.log(err);
    return -1;
  }
};

export const updateRootClaim = async (
  account,
  optionName,
  pi_a,
  pi_b,
  pi_c,
  input,
  currentRoot
) => {
  try {
    const data = await contractSender.methods
      .updateRootClaim(optionName, pi_a, pi_b, pi_c, input, currentRoot)
      .send({ from: account });
    console.log(data);
    return 1;
  } catch (err) {
    console.log(err);
    return -1;
  }
};

export const updateRootRevoke = async (
  account,
  optionName,
  pi_a,
  pi_b,
  pi_c,
  input,
  currentRoot
) => {
  try {
    const data = await contractSender.methods
      .updateRootRevoke(optionName, pi_a, pi_b, pi_c, input, currentRoot)
      .send({ from: account });
    console.log(data);
    return 1;
  } catch (err) {
    console.log(err);
    return -1;
  }
};

export default contractSender;
