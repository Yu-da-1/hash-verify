//import { ethers } from "hardhat";
//import { keccak256 } from "@ethersproject/keccak256";
//import { toUtf8Bytes } from "@ethersproject/strings";

const { ethers } = require("hardhat");
const { keccak256 } = require("@ethersproject/keccak256");
const { toUtf8Bytes } = require("@ethersproject/strings");
const { expect } = require("chai");

describe("HashRegistry", function () {
  let hashRegistry;
  let owner;

  beforeEach(async function () {
    // コントラクトのデプロイ
    [owner] = await ethers.getSigners();
    console.log("1")
    const HashRegistry = await ethers.getContractFactory("HashRegistry");
    console.log("hashRegistry:",HashRegistry )
    hashRegistry = await HashRegistry.deploy();

    console.log("deploy後", hashRegistry)
    console.log("contractAddress:", hashRegistry.address)
  });

  it("Should register and verify a hash", async function () {
    // テスト用の文字列からハッシュを生成
    const testString = "test";
    const hash = keccak256(toUtf8Bytes(testString)); // Solidityのkeccak256と互換性があるハッシュ関数を使用

    //console.log("1",hash)
    //console.log("2", toUtf8Bytes(testString))

    // ハッシュが登録されていないことを確認
    expect(await hashRegistry.verifyHash(hash)).to.equal(false);

    // ハッシュ値を登録
    await hashRegistry.registerHash(hash);

    // ハッシュ値が正しく登録され、検証できることを確認
    expect(await hashRegistry.verifyHash(hash)).to.equal(true);
  });
});