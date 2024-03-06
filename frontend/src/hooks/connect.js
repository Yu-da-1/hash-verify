import { useState, useEffect } from 'react';
import { useMetamask, useDisconnect, useSigner, useAddress } from '@thirdweb-dev/react';

function useWallet() {
  const connectWithMetamask = useMetamask();
  const disconnect = useDisconnect();
  const { data: signer } = useSigner();
  const address = useAddress();
  const [isConnected, setIsConnected] = useState(false);
  console.log({connectWithMetamask, disconnect, signer, address, isConnected});

  useEffect(() => {
    setIsConnected(!!address);
  }, [address]);

  return { connectWithMetamask, disconnect, signer, address, isConnected };
}

export { useWallet };