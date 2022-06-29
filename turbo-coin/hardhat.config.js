require("@nomiclabs/hardhat-waffle");

const mnemonic = 'aqui va el mneumonic';
const privateKey = 'aqui va el private key';

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/v3ogZZA201U2NdiP5HSVaJfdMagSB17a',
      accounts: ['f8f10f8817befc7e27bc40da7cd559e25ad11c52dfe8451ceb7ea6311200bf10']
    },
    goerly: {
      url: 'https://eth-goerli.alchemyapi.io/v2/1rNf7-DcgLFS7Kq0t9Rm0jKKzj-zQrox',
      accounts: ['727c2cc1656511945e04a5903a0338977bb1969192c3f6d8fa704eb8452fe390']
    },
    bscTestnet: {
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
      chainId: 97,
      accounts: {
        mnemonic: ""
      }
    },
    bsc: {
      url: 'https://bsc-dataseed.binance.org',
      chainId: 56,
      accounts: {
        mnemonic: mnemonic
      }
    }
  },
  paths: {
    sources: './src/ethereum-hardhat/contracts',
    tests: './src/ethereum-hardhat/test',
    cache: './src/ethereum-hardhat/cache',
    artifacts: './src/ethereum-hardhat/artifacts'
  }
};