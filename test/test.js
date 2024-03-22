const { expect } = require("chai");
const { ethers } = require("hardhat");
const crypto = require('crypto');

function generateSHA256Hash(input) {
  return '0x' + crypto.createHash('sha256').update(input).digest('hex');
}

describe("HashRegistry", function () {
  it("Should register and verify a hash", async function () {
    const HashRegistry = await ethers.getContractFactory("HashRegistry");
    const hashRegistry = await HashRegistry.deploy();

    // テスト用のハッシュ値
    const testHash = generateSHA256Hash("test");

    // ハッシュ値を登録
    await hashRegistry.registerHash(testHash);

    // ハッシュ値が登録されているか確認
    expect(await hashRegistry.verifyHash(testHash)).to.equal(true);
  });
});