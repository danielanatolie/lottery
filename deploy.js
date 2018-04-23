const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
const METAMASK_MNEMONIC = 'jacket risk usage rely cotton ecology melody kite imitate globe drop illegal';
const INFURA_RINKEBY_TESTNETWORK = 'https://rinkeby.infura.io/bRWDPOdkvbJPwCsisH7Q';
const provider = new HDWalletProvider(
  METAMASK_MNEMONIC,
  INFURA_RINKEBY_TESTNETWORK
);
const web3 = new Web3(provider);
const SAMPLE_MESSAGE = '.';

const deploy = async() => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from account', accounts[0]);
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: [SAMPLE_MESSAGE]})
    .send({gas: '1000000', from: accounts[0]});
  console.log('Contract deployed to', result.options.address);
};
deploy();
