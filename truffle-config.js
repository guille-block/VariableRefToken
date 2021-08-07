const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  networks: {
    testnet: {
      provider: () => new HDWalletProvider({mnemonic: {
        phrase: mnemonic
        }, 
        providerOrUrl:  `https://data-seed-prebsc-1-s1.binance.org:8545`,
        addressIndex: 2
      }),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    }
  },


  

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "^0.8.6", // A version or constraint - Ex. "^0.5.0"
    }
  }
}