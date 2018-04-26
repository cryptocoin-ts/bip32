"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bs58 = require("bs58");
const bs58check = require("bs58check");
const crypto_1 = require("crypto");
const decimal_js_1 = require("decimal.js");
exports.sha512Hmac = (data, key) => {
    return crypto_1.createHmac("sha512", key)
        .update(data)
        .digest();
};
exports.bigBuffer = (n) => {
    const tmp = new decimal_js_1.default(n).toHex();
    return Buffer.from(tmp, "hex");
};
exports.AddBigBuffer = (x, y) => {
    const a = exports.toDecimal(x);
    const b = exports.toDecimal(y);
    const res = a.add(b).toHex();
    return Buffer.from(res, "hex");
};
exports.toDecimal = (x) => {
    return Buffer.isBuffer(x) ? new decimal_js_1.default(x.toString("hex")) : new decimal_js_1.default(x);
};
exports.bs58Encode = bs58.encode;
exports.bs58Decode = bs58.decode;
exports.bs58checkEncode = bs58check.encode;
exports.bs58checkDecode = bs58check.decode;
