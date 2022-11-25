const bip39 = require("bip39");

const { fromMasterSeed } = require("hdkey");
const { eddsa, babyJub } = require("circomlib");
const randMnemonic = "12321434";
const hdkey = fromMasterSeed(randMnemonic);
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
  var mes = babyJub.F.e("1");

  var sign = eddsa.signPoseidon(privateKeyBuffer, mes);
  var verify = eddsa.verifyPoseidon(mes, sign, publicKeyDecompress);

  if (verify) {
    console.log("Success");
  }
}

console.log(
  babyJub
    .unpackPoint(
      Buffer.from(
        "8309f73322dd7a30fdf9f466582bee38b34b69d13cb9baed4332bf2ae55b6b84",
        "hex"
      )
    )
    .map((e) => e.toString(16))
);

main();
