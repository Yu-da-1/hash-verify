import React, { useState } from 'react';
import { useMetamask, useAddress, useDisconnect, useContract, useSigner } from '@thirdweb-dev/react';
import { generateFileHash } from '../utils/hash';

//const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
//const contractABI = JSON.parse(process.env.REACT_APP_CONTRACT_ABI);


function App() {
  const connectWithMetamask = useMetamask();
  const address = useAddress();
  const disconnect = useDisconnect();
  const [file, setFile] = useState(null);
  const { data: signer} = useSigner();
  //const contract = useContract(contractAddress, contractABI, signer);


  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };


  const handleSend = async () => {
    if (!file) {
      alert("ファイルが選択されていません");
      return;
    }
    const hash = await generateFileHash(file);
    console.log("Generated hash", hash);

    /*try {
      // スマートコントラクトのメソッドを呼び出す
      const txResponse = await contract.functions.HashRegistry(hash);
      await txResponse.wait();
      console.log("hash registered successfully!");
    } catch (error) {
      console.error("Failed to register hash", error);
    }*/
  };

  return (
    <div>
      <h1>Verify Hash</h1>
      {address ? (
        <>
          <p>Connected as: {address}</p>
          <button onClick={() => disconnect()}>Disconnect Wallet</button>
        </>
      ) : (
        <button onClick={() => connectWithMetamask()}>Connect Wallet</button>
      )}
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default App;