import React, { useState, useEffect } from 'react';
import { useWallet } from '../hooks/connect';
import { ethers } from 'ethers';
import { generateFileHash } from '../utils/hash';

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
const contractABI = JSON.parse(process.env.REACT_APP_CONTRACT_ABI);


function App() {
  console.log(useWallet);
  const { connectWithMetamask, disconnect, address, isConnected, signer } = useWallet();
  const [file, setFile] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    if (signer) {
      // signer が存在する場合にのみコントラクトを初期化
      const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
      setContract(contractInstance);
    } else {
      // signer が存在しない場合はコントラクトを null に設定
      setContract(null);
    }
  }, [signer]);


  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };


  const handleSend = async () => {
    if (!file) {
      alert("ファイルが選択されていません");
      return;
    }

    if (!signer) {
      alert("ウォレットに接続してください");
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
      {isConnected ? (
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