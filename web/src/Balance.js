import React from 'react';
import './Balance.css';
import Web3 from 'web3'
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from './abi.js'
import logo from './promaton.webp';

class Balance extends React.Component {
  
  componentWillMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    await window.ethereum.send('eth_requestAccounts');
    const web3 = new Web3(window.ethereum)
    const accounts = await web3.eth.getAccounts()
    const ethBalance = await web3.eth.getBalance(accounts[0]) / (10**18)

    const token = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS)
    const balance = await token.methods.balanceOf(accounts[0]).call() / (10**18)
    const addresses = await token.methods.getAddresses().call()
    
    console.log(accounts)
    console.log(addresses)
    console.log(balance)

    var addressBalances = []
    for (let i = 0; i < addresses.length; i++){
      let balance = await token.methods.balanceOf(addresses[i]).call() / (10**18)
      let address = addresses[i]
      addressBalances.push([address,balance])
    }
    console.log(addressBalances)
    addressBalances = addressBalances.sort(function(a, b) { return b[1] - a[1]; });
    
    this.setState({ account: accounts[0], ethBalance: ethBalance, balance: balance, addressBalances: addressBalances})
  }

  constructor(props) {
    super(props)
    this.state = { account: '', ethBalance: 0 , balance: 0, addressBalances: []}
  }

  render() {
    return (
      <div className="container">
        <p>Your account:&emsp; {this.state.account}</p>
        <p>Balance:&emsp; {this.state.ethBalance} ETH</p>
        <p>Promacoin:&emsp; {this.state.balance} <img src={logo} alt="Logo" class="logo" /></p>
        <p>Highscore: {this.state.addressBalances.map((addressBalance) => (<p>{addressBalance[0]}: {addressBalance[1]}</p>))}</p> 
      </div>
    );
  }
}

export default Balance;
