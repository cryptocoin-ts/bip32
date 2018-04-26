export default class Network {
  // mainnet: 0x0488B21E public, 0x0488ADE4 private;
  // testnet: 0x043587CF public, 0x04358394 private
  public static HD_VERSION = {
    mainnet: {
      pri: "0488ADE4",
      pub: "0488B21E"
    },
    testnet: {
      pri: "04358394",
      pub: "04358394"
    }
  };

  public static XKeyVer(ver: Buffer): { check: boolean; isNeuter: boolean } {
    const versions: string[] = ["0488ADE4", "0488B21E", "04358394", "04358394"];
    const res = {
      check: true,
      isNeuter: false
    };
    const index: number = versions.indexOf(ver.toString("hex"));
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

  public static getNetwork(ver: Buffer, network?: Network) {
    if (!network) {
      return this.Bitcoin();
    }
  }

  public static Bitcoin() {
    return new Network();
  }

  public static Ethereum() {
    return new Network();
  }

  public static DKKToken() {
    return new Network();
  }
}

// from seed to address
// send raw transaction
//
