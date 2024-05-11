// const {
//   time,
//   loadFixture,
// } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
// const { expect } = require("chai");
// const { ethers } = require("hardhat");
// describe("Test", function () {
//   async function deployOneYearLockFixture() {
//     const [owner, owner2, owner3] = await ethers.getSigners();

//     const Token = await ethers.getContractFactory("Token");
//     const token = await Token.deploy();
//     console.log("token:" + token.target);
//     const Faucet = await ethers.getContractFactory("Faucet");
//     const faucet = await Faucet.deploy(token.target,ethers.parseEther("10"),1000);
//     console.log("faucet:" + faucet.target);
//     return { faucet, token, owner, owner2, owner3 };
//   }

//   describe("Deployment", function () {
//     it("Test", async function () {
//       const { faucet, token, owner, owner2, owner3 } = await loadFixture(
//         deployOneYearLockFixture
//       );
//       await token.transfer(faucet.target, ethers.parseEther("100"));
//       await faucet.withdraw(owner2.address);
//       await faucet.withdraw(owner3.address);

//       await token.balanceOf(owner.address).then((res) => {
//         console.log("owner:" + ethers.formatEther(res));
//       });
//       await token.balanceOf(owner2.address).then((res) => {
//         console.log("owner2:" + ethers.formatEther(res));
//       });
//       await token.balanceOf(owner3.address).then((res) => {
//         console.log("owner3:" + ethers.formatEther(res));
//       });
//       await token.balanceOf(faucet.target).then((res) => {
//         console.log("faucet:" + ethers.formatEther(res));
//       });
//       // await faucet.connect(owner2).destroy();
//       await faucet.destroy();
//       console.log("--------------------")
//       await token.balanceOf(owner.address).then((res) => {
//         console.log("owner:" + ethers.formatEther(res));
//       });
//       await token.balanceOf(owner2.address).then((res) => {
//         console.log("owner2:" + ethers.formatEther(res));
//       });
//       await token.balanceOf(owner3.address).then((res) => {
//         console.log("owner3:" + ethers.formatEther(res));
//       });
//       await token.balanceOf(faucet.target).then((res) => {
//         console.log("faucet:" + ethers.formatEther(res));
//       });
//       await faucet.setCooldownTime(100000);
//       await faucet.cooldownTime().then((res) => {
//         console.log("cooldownTime:" + res.toString());
//       });
//     });
//   });
// });
