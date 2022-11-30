import abi from "../abi/KYC.json";
import { CONTRACT_ADDRESS, } from "src/constants";

const Web3 = require("web3");
const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);

export const verifyProof = (object) => {
  contract.methods
    .verifyProof(
      object.optionName,
      object.pi_a,
      object.pi_b,
      object.pi_c,
      object.input
    )
    .call((err, result) => {
      console.log(err);
      console.log(result);
    });
};

export const updateRootClaim = async (account, pi_a, pi_b, pi_c, input) => {
  try {
    await contract.methods
      .updateRootClaim(pi_a, pi_b, pi_c, input)
      .send({ from: account });
    return 1;
  } catch (err) {
    return -1;
  }
};

export default contract;
