import abi from "../abi/KYC.json";
import { CONTRACT_ADDRESS, PROVIDER_URL } from "src/constants";

const Web3 = require("web3");
const web3 = new Web3(PROVIDER_URL);
const contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);
console.log(contract);
export const verifyProof = (object) => {
  contract.methods
    .verifyProof(object.optionName, object.pi_a, object.pi_b, object.pi_c, object.input)
    .call((err, result) => {
      console.log(err);
      console.log(result);
    });
};

export default contract;
