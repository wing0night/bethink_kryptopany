import { useRouter } from "next/navigation";
import { connectMetamask } from "./wallet.service";
import { useWalletStore } from "./wallet.store";

export const useConnectWallet = () => {
  const setWalletAddress = useWalletStore((state) => state.setWalletAddress);
  const router = useRouter();
  const connect = async () => {
    const metamaskConnection = await connectMetamask();

    if (!metamaskConnection || "error" in metamaskConnection) {
      console.error("Error connecting to Metamask");
      return;
    }

    const { address } = metamaskConnection;

    setWalletAddress(address);
    router.push('/data2cash')
  };

  const disconnect = async () => {
    setWalletAddress(null);
    router.push('/')
  };

  return { connect, disconnect };
};
