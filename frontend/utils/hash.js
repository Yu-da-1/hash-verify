// npm install js-sha256 でインストール後
import sha256 from 'js-sha256';

async function generateFileHash(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const arrayBuffer = event.target.result;
        const hashHex = sha256(arrayBuffer);
        resolve(hashHex);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsArrayBuffer(file);
  });
}

export { generateFileHash };