const { eddsa, babyJub } = require("circomlib");
const HDKey = require("hdkey");

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

export function signMessage(privateKeyString, message) {
  const mes = babyJub.F.e(message);
  return eddsa.signPoseidon(Buffer.from(privateKeyString, "hex"), mes);
}

export function verifyMessage(message, signature, publicKeyString) {
  const mes = babyJub.F.e(message);
  const publicKeyBuffer = Buffer.from(publicKeyString, "hex");
  const publicKeyDecompress = babyJub.unpackPoint(publicKeyBuffer);
  return eddsa.verifyPoseidon(mes, signature, publicKeyDecompress);
}
