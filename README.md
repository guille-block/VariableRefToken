# VariableRefToken

## Objective:

Develop an ERC20 Token that implements Reflective finance token logics while adding a dynamic fee schedule that will change over time. 

### Considerations:

This smart contract has been deployed to the test network of the binance smart chain.

### Instructions:

First, install all node dependencies

```{js}
npm install
```

Then you need to provide an mnemonic phrase in the file .secret.

```{js}
touch .secret
```
The HDWalletProvider is set to be initialized to the third address of your wallet created by your mnemonic phrase. You should set it to index 0 or make sure that address has some balance

### Testing

If you want to test the smart contract logic, you need to run 

```{js}
truffle test
```

This will show you if the smart contract is the tests.
