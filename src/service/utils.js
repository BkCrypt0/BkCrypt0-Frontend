import inputJSON from "./input_2.json";
const { eddsa, babyJub, poseidon } = require("circomlib");
const HDKey = require("hdkey");
const BigInt = require("big-integer");

export const testServerObj = {
  rootRevoke: "0",
  siblingsRevoke: [
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
  ],
  oldKeyRevoke: "0",
  oldValueRevoke: "0",
  isOld0Revoke: 1,
  rootClaims:
    "19569806975095406378064835597291763354914308113190092659833750474633745606260",
  siblingsClaims: [
    "4010404085188256929231243812687980377907030773685080299761664899933251209493",
    "16316732353140153004307099785377783892883687359882246771173250575442522096359",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
  ],
  key: "0",
  challenge: 100,
};

export function generatePublicAndPrivateKeyStringFromMnemonic(mnemonic) {
  const hdkey = HDKey.fromMasterSeed(mnemonic);
  const privateKey = hdkey.privateKey;
  const publicKey = eddsa.prv2pub(privateKey);

  const publicKeyCompress = babyJub.packPoint(publicKey);
  const privateKeyString = privateKey.toString("hex");
  const publicKeyString = publicKeyCompress.toString("hex");
  return {
    publicKeyString: publicKeyString,
    privateKeyString: privateKeyString,
  };
}
export function getSignMessage({
  privateKeyString = "0000000000000000000000000000000000000000000000000000000000000000",
  expireTime,
  value,
}) {
  const mes = createMessage(value, expireTime);
  // const signature = eddsa.signPoseidon(
  //   Buffer.from(privateKeyString, "hex"),
  //   mes
  // );
  const signature = eddsa.signPoseidon(
    Buffer.from(privateKeyString, "hex"),
    babyJub.F.e(mes.toString())
  );
  const R8x = signature.R8[0].toString();
  const R8y = signature.R8[1].toString();
  const S = signature.S.toString();

  return {
    value: value,
    R8x: R8x,
    R8y: R8y,
    S: S,
    // expireTime: expireTime,
    expireTime: 1668852906,
    message: mes.toString(),
  };
}

export function getAgeInput({
  serverInfo,
  currentYear,
  currentMonth,
  currentDay,
  minAge,
  maxAge,
  privateKeyString = "0000000000000000000000000000000000000000000000000000000000000000",
  expireTime = 1668852906,
  infoObject = {
    CCCD: 0,
    sex: 0,
    DoBdate: 20010201,
    BirthPlace: 0,
  },
  publicKey = eddsa.prv2pub(
    Buffer.from(
      "0000000000000000000000000000000000000000000000000000000000000000",
      "hex"
    )
  ),
}) {
  const info = {
    // CCCD: Number(infoObject.id),
    // sex: infoObject.sex,
    // DoBdate: Number(infoObject.doB),
    // BirthPlace: Number(infoObject.poB),
    CCCD: 0,
    sex: 0,
    DoBdate: 20010201,
    BirthPlace: 0,
    publicKey: publicKey.map((e) => e.toString()),
  };
  const ageInput = {
    // minAge: minAge,
    // maxAge: maxAge,
    // currentYear: currentYear,
    // currentMonth: currentMonth,
    // currentDay: currentDay,
    minAge: 18,
    maxAge: 100,
    currentYear: 2022,
    currentMonth: 11,
    currentDay: 22,
  };
  const signMessageInput = getSignMessage({
    expireTime: expireTime,
    value: hashValue(infoObject).toString(),
  });
  const merge = { ...serverInfo, ...info, ...ageInput, ...signMessageInput };
  console.log(merge);
  return merge;
}

export function verifyMessage({
  message,
  signature,
  publicKeyString = babyJub
    .packPoint(
      eddsa.prv2pub(
        Buffer.from(
          "0000000000000000000000000000000000000000000000000000000000000000",
          "hex"
        )
      )
    )
    .toString(),
}) {
  const mes = babyJub.F.e(message);
  const publicKeyBuffer = Buffer.from(publicKeyString, "hex");
  const publicKeyDecompress = babyJub.unpackPoint(publicKeyBuffer);
  return eddsa.verifyPoseidon(mes, signature, publicKeyDecompress);
}

export function hashValue(infoObject) {
  // const publicKey = babyJub.unpackPoint(
  //   Buffer.from(infoObject.publicKey, "hex")
  // );
  const publicKey = eddsa.prv2pub(
    Buffer.from(
      "0000000000000000000000000000000000000000000000000000000000000000",
      "hex"
    )
  );
  const CCCD = infoObject.CCCD;
  const sex = infoObject.sex;
  const DoBdate = infoObject.DoBdate;
  const BirthPlace = infoObject.BirthPlace;
  // const CCCD = 0;
  // const sex = 0;
  // const DoBdate = 20010201;
  // const BirthPlace = 0;
  const hashedValue = poseidon([1, 1, 1, 1, 1]);
  console.log(hashedValue);
  return hashedValue;
}

export function hashKey(CCCD) {
  return poseidon([CCCD.toString()]);
}

export function createMessage(value, expireTime) {
  return poseidon([value, expireTime]);
}

export async function calculateAgeProof(input) {
  const { proof, publicSignals } = await window.snarkjs.groth16.fullProve(
    input,
    "http://localhost:3000/kycAge.wasm",
    "http://localhost:3000/circuit_final.zkey"
  );

  const vkey = await fetch("http://localhost:3000/verification_key.json").then(
    function (res) {
      return res.json();
    }
  );

  const res = await window.snarkjs.groth16.verify(vkey, publicSignals, proof);
  const finalRes = { proof: JSON.stringify(proof, null, 1), result: res };
  console.log(finalRes);
  return finalRes;
}
