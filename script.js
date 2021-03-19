const Web3 = require("web3")
const fs = require('fs');
const contractJson = fs.readFileSync('./abi.json');
const piTest = JSON.parse(contractJson);

const recipientAddress = "0xB19FE0a26A9f25A49cF7C68920c3B9958350AF92"
const unlockedAddress = "0x73feaa1ee314f8c655e354234017be2193c9e24e"
const cakeAddress = "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82"
const web3 = new Web3("http://localhost:8545")
const pitest = new web3.eth.Contract(piTest, cakeAddress) 

async function run() {
    let unlockedBalance, recipientBalance
    ([unlockedBalance, recipientBalance] = Promise.all([pitest.methods.balanceOf(unlockedAddress).call(), 
    pitest.methods.balanceOf(recipientAddress).call()]))
    console.log(unlockedBalance,":", recipientBalance)
    await pitest.transfer(recipientAddress, 1000).send({from: unlockedAddress})
    ([unlockedBalance, recipientBalance] = Promise.all([pitest.methods.balanceOf(unlockedAddress).call(), 
    pitest.methods.balanceOf(recipientAddress).call()]))

    console.log(unlockedBalance,":", recipientBalance)
}

run()