// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HashRegistry {
  //hash値を保存するためのマッピング
  mapping(bytes32 => bool) private _hashes;

  //ハッシュ値を登録する関数
  function registerHash(bytes32 hash) public {
    require(!_hashes[hash], "Hash already registered.");
    _hashes[hash] = true;
  }

  //ハッシュ値が登録されているかを確認する関数
  function verifyHash(bytes32 hash) public view returns (bool) {
    return _hashes[hash];
  }
}