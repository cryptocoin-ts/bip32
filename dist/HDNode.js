"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const helper_1 = require("./helper");
const network_1 = require("./network");
class HDNode {
    constructor(chainCode, key) {
        this.chainCode = chainCode;
        this.key = key;
        this.depth = Buffer.from("00", "hex");
        this.parentFingerprint = Buffer.from("00000000", "hex");
        this.childIndex = Buffer.from("00000000", "hex");
        this.version = Buffer.from("0488ADE4", "hex");
        this.isNeuter = false;
    }
    static validateMasterKey(key) {
        const N = helper_1.toDecimal(HDNode.n);
        const KEY = helper_1.toDecimal(key);
        if (KEY.isZero || KEY.greaterThan(N)) {
            return false;
        }
        return true;
    }
    static fromMasterKey(data) {
        if (data.length !== 64) {
            throw new Error("Master key's length should be equal with 64");
        }
        const chainCode = data.slice(32);
        const key = data.slice(0, 32);
        if (!this.validateMasterKey) {
            throw new Error("Master key isn't valid");
        }
        return new HDNode(chainCode, key);
    }
    static fromRandomBytes(random) {
        const rng = random || crypto_1.randomBytes(32);
        const key = Buffer.from("Bitcoin seed");
        const masterKey = helper_1.sha512Hmac(rng, key);
        try {
            return this.fromMasterKey(masterKey);
        }
        catch (e) {
            return this.fromRandomBytes();
        }
    }
    static fromExtendKey(xKey) {
        const des = helper_1.bs58checkDecode(xKey);
        const version = des.slice(0, 4);
        const depth = des.slice(4, 5);
        const parentFingerprint = des.slice(5, 9);
        const childIndex = des.slice(9, 13);
        const chainCode = des.slice(13, 45);
        const key = des.slice(45);
        const node = new HDNode(chainCode, key);
        node.parentFingerprint = parentFingerprint;
        node.depth = depth;
        node.version = version;
        const getVer = network_1.default.XKeyVer(version);
        if (!getVer.check) {
            throw new Error("Extend key isn't valid");
        }
        if (!getVer.isNeuter) {
            node.key = key.slice(1);
        }
        node.isNeuter = getVer.isNeuter;
        return node;
    }
    serialize() {
        const key = this.isNeuter
            ? this.key
            : Buffer.concat([HDNode.zero, this.key]);
        const buf = Buffer.concat([
            this.version,
            this.depth,
            this.parentFingerprint,
            this.childIndex,
            this.chainCode,
            key
        ]);
        return helper_1.bs58checkEncode(buf);
    }
    derivateHard(parentKey, index) {
        const hardIndex = helper_1.AddBigBuffer(HDNode.int, index);
        const data = Buffer.concat([HDNode.zero, this.key, hardIndex]);
        const seed = helper_1.sha512Hmac(data, this.chainCode);
        const left = seed.slice(0, 32);
        const keyParModN = Buffer.from(helper_1.toDecimal(this.key)
            .mod(HDNode.n.toString("hex"))
            .toHex());
        const chainCode = seed.slice(32);
    }
}
HDNode.int = Math.pow(2, 31);
HDNode.zero = Buffer.from("00", "hex");
HDNode.n = Buffer.from("fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141", "hex");
exports.default = HDNode;
