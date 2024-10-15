const networks = {
  moksha: {
    chainId: "14800",
    rpcUrl: "https://rpc.moksha.vana.org",
    chainName: "Vana Moksha Testnet",
    explorerUrl: "https://moksha.vanascan.io",
    currency: "VANA",
    contract: process.env.NEXT_PUBLIC_SMART_CONTRACT_ADDRESS_MOKSHA_TESTNET || "moksha",
  },
  satori: {
    chainId: "14801",
    rpcUrl: "https://rpc.satori.vana.org",
    chainName: "Vana Satori Testnet",
    explorerUrl: "https://satori.vanascan.io",
    currency: "VANA",
    contract: process.env.NEXT_PUBLIC_SMART_CONTRACT_ADDRESS_SATORI_TESTNET || "satori",
  },
  mainnet: {
    chainId: "1480",
    rpcUrl: "https://rpc.vana.org",
    chainName: "Vana Mainnet",
    explorerUrl: "https://vanascan.io",
    currency: "VANA",
    contract: process.env.NEXT_PUBLIC_SMART_CONTRACT_ADDRESS_MAINNET || "",
  },
}

const network = (process.env.NEXT_PUBLIC_NETWORK || "satori") as keyof typeof networks;

if (!Object.keys(networks).includes(network)) {
  throw new Error(`Invalid network type: ${network}`);
}

let networkConfig = networks[network];
if (!networkConfig) {
  networkConfig = {} as any;
  networks[network] = networkConfig;
}

networkConfig.contract = process.env.NEXT_PUBLIC_SMART_CONTRACT_ADDRESS || networkConfig.contract;
networkConfig.rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || networkConfig.rpcUrl;
networkConfig.chainName = process.env.NEXT_PUBLIC_CHAIN_NAME || networkConfig.chainName;
networkConfig.explorerUrl = process.env.NEXT_PUBLIC_EXPLORER_URL || networkConfig.explorerUrl;
networkConfig.currency = process.env.NEXT_PUBLIC_CURRENCY || networkConfig.currency;

const config = {
  publicKeyBase64: process.env.NEXT_PUBLIC_FILE_ENCRYPTION_PUBLIC_KEY_BASE64 || "",

  network,
};

export { config, networks };
