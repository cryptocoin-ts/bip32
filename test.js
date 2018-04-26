// const i = 0;
var crypto = require("crypto");
var bs58check = require("bs58check");

var ecurve = require("ecurve");
var secp256k1 = function(priKey) {
  const secp256k1 = createECDH("secp256k1");
  secp256k1.setPrivateKey(priKey);
  return secp256k1.getPublicKey("hex", "compressed");
};

function toUint32(num) {
  const a = num.toString(16);
  const b = a.length < 8 ? "0".repeat(8 - a.length) + a : a;
  return Buffer.from(b, "hex");
}

const i = toUint32(0);
// console.log(i);

const xpub = bs58check.decode(
  "xpub6E1vZHPnxr7EHuGhwnJfrJfRYoCEC4kuHn7AiCwYdVGNRuPdVbbKBvcRWiedhphpEbCMosvf7pWYzZowUVSynochpiHF4LLX9zqsau5sFAJ"
);

const chainCode = des.slice(13, 45);
const key = des.slice(45);
// console.log(priKey)
const seed = crypto
  .createHmac("sha512", chainCode)
  .update(Buffer.concat([priKey, i]))
  .digest();

const left = seed.slice(0, 32);

secp256k1(left)

new ecurve.Point(ecurve.getCurveByName("secp256k1"));
new ecurve.Point(ecurve.getCurveByName("secp256k1"),);
