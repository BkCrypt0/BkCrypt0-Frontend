import data from "src/documents/provinces_code.json";
const { eddsa, babyJub, mimc7 } = require("circomlib");
const HDKey = require("hdkey");
const BigInt = require("big-integer");
const BigNumber = require("bignumber.js");

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

export function generatePublicKeyPair(publicKeyString) {
  const publicKeyBuffer = Buffer.from(publicKeyString, "hex");
  const publicKeyPair = babyJub
    .unpackPoint(publicKeyBuffer)
    .map((e) => e.toString());
  return publicKeyPair;
}

export function getSignMessage({ privateKey, expireTime, value }) {
  const mes = mimc7.multiHash([BigInt(value).value, BigInt(expireTime).value]);
  const signature = eddsa.signMiMC(Buffer.from(privateKey, "hex"), mes);

  const R8x = signature.R8[0].toString();
  const R8y = signature.R8[1].toString();
  const S = signature.S.toString();

  return {
    value: value,
    R8x: R8x,
    R8y: R8y,
    S: S,
    expireTime: expireTime,
    message: mes.toString(),
  };
}

export function hashValue(infoObject, privateKey) {
  const publicKey = eddsa.prv2pub(Buffer.from(privateKey, "hex"));
  const CCCD = infoObject.CCCD;
  const sex = infoObject.sex;
  const DoBdate = infoObject.DoBdate;
  const BirthPlace = infoObject.BirthPlace;
  const hashValue = mimc7.multiHash([
    ...publicKey,
    BigInt(CCCD).value,
    BigInt(sex).value,
    BigInt(DoBdate).value,
    BigInt(BirthPlace).value,
  ]);

  return hashValue.toString();
}

export function getAgeInput({
  serverInfo,
  currentYear,
  currentMonth,
  currentDay,
  minAge,
  maxAge,
  expireTime,
  privateKey,
  infoObject,
}) {
  const publicKey = eddsa.prv2pub(Buffer.from(privateKey, "hex"));

  const info = {
    CCCD: Number(infoObject.CCCD),
    sex: infoObject.sex,
    DoBdate: Number(infoObject.DoBdate),
    BirthPlace: Number(infoObject.BirthPlace),
    publicKey: publicKey.map((e) => e.toString()),
  };
  const ageInput = {
    minAge: minAge,
    maxAge: maxAge,
    currentYear: currentYear,
    currentMonth: currentMonth,
    currentDay: currentDay,
  };

  const value = hashValue(infoObject, privateKey);
  const signMes = getSignMessage({
    privateKey: privateKey,
    expireTime: expireTime,
    value: value,
  });
  const merge = { ...serverInfo, ...info, ...ageInput, ...signMes };
  return merge;
}

export async function calculateAgeProof(input) {
  try {
    const { proof, publicSignals } = await window.snarkjs.groth16.fullProve(
      input,
      "https://github.com/BkCrypt0/BkCrypt0-Resources/blob/main/KYC_circuit/age/kycAge.wasm",
      "https://github.com/BkCrypt0/BkCrypt0-Resources/blob/main/KYC_circuit/age/circuit_final.zkey"
    );

    // const vkey = await fetch(
    //   "http://localhost:3000/verification_age_key.json"
    // ).then(function (res) {
    //   return res.json();
    // });

    // const res = await window.snarkjs.groth16.verify(vkey, publicSignals, proof);
    const finalRes = {
      proof: JSON.stringify(proof, null, 1),
      input: JSON.stringify(publicSignals, null, 1),
    };
    return finalRes;
  } catch (err) {
    console.log(err);
    return -1;
  }
}

export function calculatePlace(places) {
  var indexs = [];
  for (let i = 0; i < places.length; i++) {
    var index = data[places[i]].index;
    indexs.push(index);
  }
  var defaultPlace = new Array(64).fill("0");
  var output = "";
  for (let i = 0; i < indexs.length; i++) {
    defaultPlace[indexs[i]] = "1";
  }
  for (let i = 0; i < defaultPlace.length; ++i) {
    output = defaultPlace[i] + output;
  }
  return new BigNumber("0b" + output).toString();
}

export function getProvinceInput({
  serverInfo,
  placesExpecting,
  expireTime,
  privateKey,
  infoObject,
}) {
  const publicKey = eddsa.prv2pub(Buffer.from(privateKey, "hex"));

  const info = {
    CCCD: Number(infoObject.CCCD),
    sex: infoObject.sex,
    DoBdate: Number(infoObject.DoBdate),
    BirthPlace: Number(infoObject.BirthPlace),
    publicKey: publicKey.map((e) => e.toString()),
  };
  const provinceInput = {
    placesExpecting: placesExpecting,
  };

  const value = hashValue(infoObject, privateKey);
  const signMes = getSignMessage({
    privateKey: privateKey,
    expireTime: expireTime,
    value: value,
  });
  const merge = { ...serverInfo, ...info, ...provinceInput, ...signMes };
  return merge;
}

export async function calculateProvinceProof(input) {
  try {
    const { proof, publicSignals } = await window.snarkjs.groth16.fullProve(
      input,
      "https://github.com/BkCrypt0/BkCrypt0-Resources/blob/main/KYC_circuit/place/kycPlaces.wasm",
      "https://github.com/BkCrypt0/BkCrypt0-Resources/blob/main/KYC_circuit/place/circuit_final.zkey"
    );

    // const vkey = await fetch(
    //   "http://localhost:3000/verification_age_key.json"
    // ).then(function (res) {
    //   return res.json();
    // });

    // const res = await window.snarkjs.groth16.verify(vkey, publicSignals, proof);
    const finalRes = {
      proof: JSON.stringify(proof, null, 1),
      input: JSON.stringify(publicSignals, null, 1),
    };
    return finalRes;
  } catch (err) {
    console.log(err);
    return -1;
  }
}
