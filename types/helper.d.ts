/// <reference types="node" />
import * as bs58 from "bs58";
import * as bs58check from "bs58check";
import Decimal from "decimal.js";
export declare const sha512Hmac: (data: bip32.strBuf, key: bip32.strBuf) => Buffer;
export declare const bigBuffer: (n: string | number) => Buffer;
export declare const AddBigBuffer: (x: bip32.bigi, y: bip32.bigi) => Buffer;
export declare const toDecimal: (x: bip32.bigi) => Decimal;
export declare const bs58Encode: typeof bs58.encode;
export declare const bs58Decode: typeof bs58.decode;
export declare const bs58checkEncode: typeof bs58check.encode;
export declare const bs58checkDecode: typeof bs58check.decode;
