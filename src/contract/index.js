import abi from "../abi/KYC.json";
import { CONTRACT_ADDRESS, PROVIDER_URL } from "src/constants";

const Web3 = require("web3");
const web3 = new Web3(PROVIDER_URL);
const contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);
console.log(contract);
export const verifyProof = (optionName, pi_a, pi_b, pi_c, input) => {
  contract.methods
    .verifyProof(optionName, pi_a, pi_b, pi_c, input)
    .call((err, result) => {
      console.log(err);
      console.log(result);
    });
};

export default contract;
