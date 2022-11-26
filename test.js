const { eddsa, mimc7 } = require("circomlib");
const { buildEddsa, buildMimc7 } = require("circomlibjs");

async function main() {
  const hashF = await buildMimc7();
  const hash = hashF.multiHash([1n, 1n, 1n, 1n, 1n]);
  const hash1 = mimc7.multiHash([1n, 1n, 1n, 1n, 1n]);
  // console.log(hashF.F.toObject(hash))
  // console.log(hash1)

  const eddsa_1 = await buildEddsa();
  const prv = Buffer.from("1".padStart(64, "0"), "hex");
  const pub = eddsa_1.prv2pub(prv);
  const pubBigInt = pub.map((v) => eddsa_1.F.toObject(v));
  // const prvString = prv.toString();
  // console.log(prv.toString())

  var sign = eddsa.signMiMC(prv, hash1);
  console.log(sign);
  var sign1 = eddsa_1.signMiMC(prv, hash);
  console.log(sign1);
  console.log(eddsa.verifyMiMC(hash1, sign, pubBigInt));
  console.log(eddsa_1.verifyMiMC(hash, sign1, pub));
}

main();
