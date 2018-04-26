declare namespace bip32 {
  export interface desStruct {
    chainCode: Buffer;
    childIndex: Buffer;
    depth: Buffer;
    parentFingerprint: Buffer;
    key: Buffer;
    version: Buffer;
  }

  export interface network {
    pubKeyVer: string;
    main: {
      pub: string;
      pri: string;
    };
  }
  export interface keyAndChainCode {
    chainCode: Buffer;
    key: Buffer;
  }
  export type bigi = Buffer | string | number;
  export type strBuf = Buffer | string;
  export type encoding = "latin1" | "hex" | "base64";
}
