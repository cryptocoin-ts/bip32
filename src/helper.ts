import * as bs58 from "bs58";
import * as bs58check from "bs58check";
import { createHmac } from "crypto";
import Decimal from "decimal.js";

export const sha512Hmac = (data: bip32.strBuf, key: bip32.strBuf): Buffer => {
  return createHmac("sha512", key)
    .update(data)
    .digest();
};

export const bigBuffer = (n: number | string): Buffer => {
  const tmp = new Decimal(n).toHex();
  return Buffer.from(tmp, "hex");
};

export const AddBigBuffer = (x: bip32.bigi, y: bip32.bigi): Buffer => {
  const a: Decimal = toDecimal(x);
  const b: Decimal = toDecimal(y);
  const res: string = a.add(b).toHex();
  return Buffer.from(res, "hex");
};

export const toDecimal = (x: bip32.bigi): Decimal => {
  return Buffer.isBuffer(x) ? new Decimal(x.toString("hex")) : new Decimal(x);
};

export const bs58Encode = bs58.encode;
export const bs58Decode = bs58.decode;

export const bs58checkEncode = bs58check.encode;
export const bs58checkDecode = bs58check.decode;
