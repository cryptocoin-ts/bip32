"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Network {
    static XKeyVer(ver) {
        const versions = ["0488ADE4", "0488B21E", "04358394", "04358394"];
        const res = {
            check: true,
            isNeuter: false
        };
        const index = versions.indexOf(ver.toString("hex"));
        switch (index) {
            case -1:
                res.check = false;
                break;
            case 0:
                break;
            case 1:
                res.isNeuter = true;
                break;
            case 2:
                break;
            case 3:
                res.isNeuter = true;
        }
        return res;
    }
    static getNetwork(ver, network) {
        if (!network) {
            return this.Bitcoin();
        }
    }
    static Bitcoin() {
        return new Network();
    }
    static Ethereum() {
        return new Network();
    }
    static DKKToken() {
        return new Network();
    }
}
Network.HD_VERSION = {
    mainnet: {
        pri: "0488ADE4",
        pub: "0488B21E"
    },
    testnet: {
        pri: "04358394",
        pub: "04358394"
    }
};
exports.default = Network;
