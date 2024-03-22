import { ConnectWallet, useAddress } from '@thirdweb-dev/react';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import { generateFileHash } from '../utils/hash';
import { ethers } from 'ethers';


const contractAddress = "0xf4fA12e2Db352Bfb811E698De26c28F8eafFA70a";
const contractABI = [
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "hash",
          "type": "bytes32"
        }
      ],
      "name": "registerHash",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "hash",
          "type": "bytes32"
        }
      ],
      "name": "verifyHash",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

export default function Home() {


  const [file, setFile] = useState(null);
  const address = useAddress();
  console.log("Wallet address:",address);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    console.log("bbbbb");
  };

  const handleSend = async () => {
    console.log("signer address:", address);
    if (file && address) {
      try {
        const hash = await generateFileHash(file);
        //console.log('File Hash', hash)
        const prefixedHash = `0x${hash}`;
        //console.log('Prefixed Hash', prefixedHash);
        const bytesHash = ethers.utils.arrayify(prefixedHash);
        console.log('保存のためのBytes Hash', bytesHash)

        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const signer = provider.getSigner();

        const contractWithSigner = new ethers.Contract(contractAddress, contractABI, signer);
        console.log("Contract before call:", contractWithSigner);
        console.log("Preparing to call registerHash with hash:", bytesHash);


        const tx = await contractWithSigner.registerHash(bytesHash);
        await tx.wait();
        console.log('Hash registered successfully');

      } catch (error) {
        console.log('Error interacting with the contract:', error);
      }
    } else {
        console.log('No file selected or wallet not connected');
      }
    };

  const handleVerify = async () => {
    if(file && address) {
      try {
        const hash = await generateFileHash(file);
        const prefixedHash = `0x${hash}`;
        const bytesHash = ethers.utils.arrayify(prefixedHash);

        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const signer = provider.getSigner();

        const contractWithSigner = new ethers.Contract(contractAddress, contractABI, signer);
        console.log("Contract before call:", contractWithSigner);
        console.log("Preparing to call registerHash with hash:", bytesHash);

        const isRegistered = await contractWithSigner.verifyHash(bytesHash);
        console.log('Verification result:', isRegistered);

        if (isRegistered) {
          alert('このハッシュ値は登録されています。');
        } else {
          alert('このハッシュ値は登録されていません');
        }
      } catch (error) {
        console.error('Error verifying tha hash:' ,error);
        alert('ハッシュ値の検証中にエラーが発生しました');
      }
    } else {
      alert('ファイルが選択されていないか、ウォレットが接続されていません');
    }
  };

	return (
		<div className={styles.container}>
      <h1>Hash Verify</h1>
			<ConnectWallet theme='dark' />

      <p>ファイルをアップロードしてください：</p>
      <input type="file" onChange={handleFileChange} />
      {file && <p>File name: {file.name}</p>} {/* 選択されたファイル名を表示 */}

      <button onClick={handleSend}>Send</button> {/* Send ボタン */}
      < button onClick={handleVerify}>Verify</button>{/* verify ボタン*/}
		</div>
	);
}