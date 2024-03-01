async function generateFileHash(file) {
  //ブラウザのFileReaderAPIを使用してファイルの内容を読み込み`ArrayBuffer`の取得
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = async (event) => {
      try {
        //ブラウザのFileReaderAPIを使用してファイルの内容を読み込み`ArrayBuffer`の取得
        const arrayBuffer = event.target.result;
        //SHA256を使用してハッシュ値を計算する
        const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
        //16進数の文字列に変更
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        resolve(hashHex);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => {
      reject(error); 
    };

    reader.readAsArrayBuffer(file);
    
  })
}

export { generateFileHash };