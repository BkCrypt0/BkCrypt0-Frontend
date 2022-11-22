const { eddsa, babyJub, poseidon } = require("circomlib");
const HDKey = require("hdkey");
const snarkjs = require("snarkjs");

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
  oldKeyRevoke: 0,
  oldValueRevoke: 0,
  isOld0Revoke: 1,
  rootClaims:
    "19569806975095406378064835597291763354914308113190092659833750474633745606260",
  siblingsClaims: [
    "1077331994456924195664981960381312090400538890803523438230486454604767238825",
    "17043824933121197599163685124675865108169760487734914178067313745985963839569",
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
  key: "3",
  value:
    "13197145265225436101911056841517579786969287711584084771931077507892768845973",
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
  privateKeyString = "0000000000000000000000000000000000000000000000000000000000000003",
  expireTime,
  value,
}) {
  const mes = createMessage(value, expireTime);
  const signature = eddsa.signPoseidon(
    Buffer.from(privateKeyString, "hex"),
    mes
  );
  const R8x = "0x" + signature.R8[0].toString("16");
  const R8y = "0x" + signature.R8[1].toString("16");
  const S = "0x" + signature.S.toString("16");

  return {
    R8x: R8x,
    R8y: R8y,
    S: S,
    expireTime: expireTime,
    message: "0x" + mes.toString(),
  };
}

export function getAgeInput({
  serverInfo,
  currentYear,
  currentMonth,
  currentDay,
  minAge,
  maxAge,
  privateKeyString = "0000000000000000000000000000000000000000000000000000000000000003",
  expireTime,
  infoObject,
  publicKey = eddsa.prv2pub(
    "0000000000000000000000000000000000000000000000000000000000000003"
  ),
}) {
  const info = {
    CCCD: infoObject.id,
    sex: infoObject.sex,
    DoBdate: infoObject.doB,
    BirthPlace: infoObject.poB,
    publicKey: publicKey.map((e) => "0x" + e.toString()),
  };
  const ageInput = {
    minAge: minAge,
    maxAge: maxAge,
    currentYear: currentYear,
    currentMonth: currentMonth,
    currentDay: currentDay,
  };
  const signMessageInput = getSignMessage({
    expireTime: expireTime,
    value: hashValue(infoObject),
  });
  const merge = { ...serverInfo, ...info, ...ageInput, ...signMessageInput };
  console.log(merge);
  return merge;
}

export function verifyMessage(
  message,
  signature,
  publicKeyString = babyJub
    .packPoint(
      eddsa.prv2pub(
        "0000000000000000000000000000000000000000000000000000000000000003"
      )
    )
    .toString("hex")
) {
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
    "0000000000000000000000000000000000000000000000000000000000000003"
  );
  console.log(publicKey);
  const CCCD = infoObject.id;
  const sex = infoObject.sex;
  const DoBdate = infoObject.doB;
  const BirthPlace = infoObject.poB;
  const hashedValue = poseidon([
    publicKey[0],
    publicKey[1],
    CCCD,
    sex,
    DoBdate,
    BirthPlace,
  ]);
  return hashedValue;
}

export function hashKey(CCCD) {
  return poseidon([CCCD]);
}

export function createMessage(value, expireTime) {
  return poseidon([value, expireTime]);
}

export async function calculateAgeProof(input) {
  const { proof, publicSignals } = await snarkjs.groth16.fullProve(
    input,
    "src/resource/kycAge.wasm",
    "src/resource/circuit_final.zkey"
  );

  const vkey = await fetch("verification_key.json").then(function (res) {
    return res.json();
  });

  const res = await snarkjs.groth16.verify(vkey, publicSignals, proof);

  return { proof: JSON.stringify(proof, null, 1), result: res };
}
