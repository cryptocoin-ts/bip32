import { randomBytes } from "crypto";
import {
  AddBigBuffer,
  bigBuffer,
  bs58checkDecode,
  bs58checkEncode,
  sha512Hmac,
  toDecimal
} from "./helper";
import Network from "./network";

export default class HDNode {
  public static int: number = 2 ** 31;
  public static zero: Buffer = Buffer.from("00", "hex");
  public static n: Buffer = Buffer.from(
    "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141",
    "hex"
  );

  public static validateMasterKey(key: Buffer): boolean {
    const N = toDecimal(HDNode.n);
    const KEY = toDecimal(key);
    if (KEY.isZero || KEY.greaterThan(N)) {
      return false;
    }
    return true;
  }

  public static fromMasterKey(data: Buffer) {
    if (data.length !== 64) {
      throw new Error("Master key's length should be equal with 64");
    }
    const chainCode: Buffer = data.slice(32);
    const key: Buffer = data.slice(0, 32);

    if (!this.validateMasterKey) {
      throw new Error("Master key isn't valid");
    }

    return new HDNode(chainCode, key);
  }

  public static fromRandomBytes(random?: Buffer) {
    // 256 bits random bytes is advised
    const rng: Buffer = random || randomBytes(32);
    const key: Buffer = Buffer.from("Bitcoin seed");
    const masterKey = sha512Hmac(rng, key);
    try {
      return this.fromMasterKey(masterKey);
    } catch (e) {
      return this.fromRandomBytes();
    }
  }

  /**
   * get HDNode from extend key
   * @param xKey Extend key by Base58check
   */
  public static fromExtendKey(xKey: string) {
    const des: Buffer = bs58checkDecode(xKey);
    // get struct
    const version: Buffer = des.slice(0, 4);
    const depth: Buffer = des.slice(4, 5);
    const parentFingerprint: Buffer = des.slice(5, 9);
    const childIndex: Buffer = des.slice(9, 13);
    const chainCode: Buffer = des.slice(13, 45);
    const key: Buffer = des.slice(45);

    const node: HDNode = new HDNode(chainCode, key);
    node.parentFingerprint = parentFingerprint;
    node.depth = depth;
    node.version = version;
    const getVer = Network.XKeyVer(version);
    if (!getVer.check) {
      throw new Error("Extend key isn't valid");
    }
    if (!getVer.isNeuter) {
      node.key = key.slice(1);
    }
    node.isNeuter = getVer.isNeuter;
    return node;
  }

  protected depth: Buffer = Buffer.from("00", "hex");
  protected parentFingerprint: Buffer = Buffer.from("00000000", "hex");
  protected childIndex: Buffer = Buffer.from("00000000", "hex");
  protected version: Buffer = Buffer.from("0488ADE4", "hex");
  protected isNeuter: boolean = false;

  constructor(public chainCode: Buffer, public key: Buffer) {}

  public serialize(): string {
    const key = this.isNeuter
      ? this.key
      : Buffer.concat([HDNode.zero, this.key]);
    const buf: Buffer = Buffer.concat([
      this.version,
      this.depth,
      this.parentFingerprint,
      this.childIndex,
      this.chainCode,
      key
    ]);
    return bs58checkEncode(buf);
  }

  public derivateHard(parentKey, index) {
    // Child key derivation
    // Private parent key → private child key
    const hardIndex: Buffer = AddBigBuffer(HDNode.int, index);
    const data: Buffer = Buffer.concat([HDNode.zero, this.key, hardIndex]);
    const seed: Buffer = sha512Hmac(data, this.chainCode);

    const left = seed.slice(0, 32);

    const keyParModN = Buffer.from(
      toDecimal(this.key)
        .mod(HDNode.n.toString("hex"))
        .toHex()
    );

    // const key = Buffer.concat([left, keyParModN]);
    const chainCode: Buffer = seed.slice(32);
  }

  public derivate(parentKey: Buffer, index: number) {
    const ind: string = index.toString(16);
    const i: string = ind.length < 8 ? "0".repeat(8 - ind.length) + ind : ind;
    const buf: Buffer = Buffer.from(i, "hex");

    const I = sha512Hmac(buf, parentKey)

    // const il = 
    // buf.readUInt32BE()
  }
}
