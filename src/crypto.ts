import { createECDH } from "crypto";

export const getPubKey = (
  priKey: Buffer,
  isCompressed: boolean = true,
  encoding: bip32.encoding = "hex"
): string => {
  if (priKey.length < 32) {
    throw new Error("The private key shouldn't be less than 32 bytes");
  }
  const compressed = isCompressed ? "compressed" : "uncompressed";
  const secp256k1 = createECDH("secp256k1");
  secp256k1.setPrivateKey(priKey);
  return secp256k1.getPublicKey(encoding, compressed);
};
