const { eddsa, babyJub } = require("circomlib");
const bip39 = require("bip39");

var HDKey = require("hdkey");
const randMnemonic = "12321434";
const hdkey = HDKey.fromMasterSeed(randMnemonic);
const prvKey = hdkey.privateKey;

function main() {
  //Generate public key for prv key
  const pubKey = eddsa.prv2pub(prvKey);

  //Compress pubKey
  const pubKeyCompress = babyJub.packPoint(pubKey);

  // Decompomress pubkey  // Convert from buffer and arrayify to String hex
  // const F = eddsa.F;
  const prvKeyString = prvKey.toString("hex");

  const pubKeyString = pubKeyCompress.toString("hex");

  // Sign message and verify from prvKeyString and pubKeyString
  var privateKeyBuffer = Buffer.from(prvKeyString, "hex");
  var publicKeyBuffer = Buffer.from(pubKeyString, "hex");
  var publicKeyDecompress = babyJub.unpackPoint(publicKeyBuffer);
  console.log(
    "public decompress",
    publicKeyDecompress.map((e) => e.toString())
  );
  var mes = babyJub.F.e("1");

  var sign = eddsa.signPoseidon(privateKeyBuffer, mes);
  console.log("0x" + sign.S.toString("16"));
  console.log(sign.R8.map((e) => "0x" + e.toString("16")));
  var verify = eddsa.verifyPoseidon(mes, sign, publicKeyDecompress);

  if (verify) {
    console.log("Success");
  }
}

main();
