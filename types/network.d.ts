/// <reference types="node" />
export default class Network {
    static HD_VERSION: {
        mainnet: {
            pri: string;
            pub: string;
        };
        testnet: {
            pri: string;
            pub: string;
        };
    };
    static XKeyVer(ver: Buffer): {
        check: boolean;
        isNeuter: boolean;
    };
    static getNetwork(ver: Buffer, network?: Network): Network;
    static Bitcoin(): Network;
    static Ethereum(): Network;
    static DKKToken(): Network;
}
