"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
exports.getPubKey = (priKey, isCompressed = true, encoding = "hex") => {
    if (priKey.length < 32) {
        throw new Error("the Seed size should be equal with 32");
    }
    const compressed = isCompressed ? "compressed" : "uncompressed";
    const secp256k1 = crypto.createECDH("secp256k1");
    secp256k1.setPrivateKey(priKey);
    return secp256k1.getPublicKey(encoding, compressed);
};
