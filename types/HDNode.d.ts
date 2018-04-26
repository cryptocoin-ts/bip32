/// <reference types="node" />
export default class HDNode {
    chainCode: Buffer;
    key: Buffer;
    static int: number;
    static zero: Buffer;
    static n: Buffer;
    static validateMasterKey(key: Buffer): boolean;
    static fromMasterKey(data: Buffer): HDNode;
    static fromRandomBytes(random?: Buffer): any;
    static fromExtendKey(xKey: string): HDNode;
    protected depth: Buffer;
    protected parentFingerprint: Buffer;
    protected childIndex: Buffer;
    protected version: Buffer;
    protected isNeuter: boolean;
    constructor(chainCode: Buffer, key: Buffer);
    serialize(): string;
    derivateHard(parentKey: any, index: any): void;
}
