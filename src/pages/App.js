import '../components/App.css';
import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
import { generateFileHash } from '../utils/hash';
import { useState } from 'react';

function App() {

  //connect wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({method: `eth_requestAccounts`});
        const provider = new Web3Provider(window.ethereum);
        
        console.log("Wallet connected!");
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('Please install Metamask');
    }
  };

  const [file, setFile] = useState(null)

  //fileのアップロード
  const handleFileChange = (event) => {
    const uploadedFile =event.target.files[0]; //選択されたファイルを取得
    if (uploadedFile) {
      console.log("File uploaded:", uploadedFile.name);
      setFile(uploadedFile);
    }
  };

  //ハッシュ値の計算とブロックチェーンへの送信のハンドル
  const handleSend = async () => {
    if(!file) {
      alert("ファイルが選択されていません");
      return;
    }
    try {
      const hash = await generateFileHash(file); //選択したファイルのハッシュを計算
      console.log("Generated hash", hash)

      //Todo: トランザクションの実行の実装
    } catch(error) {
      console.log("ハッシュ値の計算に失敗しました", error);
    }
  };

  

  //Transactionの実行
  /*const sendTransaction = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      try {
        const txResponse = await contract.someFunction();
        await txResponse.wait();
        console.log("Transaction successful!");
      } catch (error) {
        console.error("Transaction failed:", error);
      }
    }
  };*/

  return (
    <div>
      <button onClick={connectWallet}>Connect Wallet</button>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default App;
