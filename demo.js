const bip39 = require("bip39");

const { fromMasterSeed } = require("hdkey");
const { eddsa, babyJub } = require("circomlib");
const randMnemonic = "12321434";
const hdkey = fromMasterSeed(randMnemonic);
const prvKey = hdkey.privateKey;
console.log("prv", prvKey);
console.log(prvKey.toString("hex"));
console.log(Buffer.from(prvKey.toString("hex"), "hex"));
console.log(
  Buffer.from(
    "58aaff5323c4516649cd8a05eda3408f52a79236abd927ee48d32b9fc3501cd4",
    "hex"
  )
);

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
  var mes = babyJub.F.e("1");

  var sign = eddsa.signPoseidon(privateKeyBuffer, mes);
  var verify = eddsa.verifyPoseidon(mes, sign, publicKeyDecompress);

  if (verify) {
    console.log("Success");
  }
}

// console.log(
//   babyJub
//     .unpackPoint(
//       Buffer.from(
//         "7d36542f9f02558d31fb178973d8aae3d23cd51c36f42ad64ed80de58d04d1ae",
//         "hex"
//       )
//     )
//     .map((e) => e.toString(16))
// );

// console.log(
//   babyJub
//     .unpackPoint(
//       Buffer.from(
//         "a45bd04369249b06eb7d9186d90c3445fe63a066382385ee0173ecec6c0210a2",
//         "hex"
//       )
//     )
//     .map((e) => e.toString())
// );

main();
