import React from 'react';
import './Balance.css';
import Web3 from 'web3'
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from './abi.js'
import logo from './promaton.webp';
import NameSetter from './NameSetter.js';

class Balance extends React.Component {
  
  componentWillMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    if (window.ethereum == undefined ){
      alert("Please install metamask to use this awesome website")
      return
    }

    await window.ethereum.send('eth_requestAccounts');
    const web3 = new Web3(window.ethereum)
    const accounts = await web3.eth.getAccounts()
    const ethBalance = await web3.eth.getBalance(accounts[0]) / (10**18)

    const contract = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS)
    const balance = await contract.methods.balanceOf(accounts[0]).call() / (10**18)
    const addresses = await contract.methods.getAddresses().call()
    const name = await contract.methods.getName(accounts[0]).call()

    console.log(accounts)
    console.log(addresses)
    console.log(balance)

    // create the highscore list
    var addressBalances = []
    for (let i = 0; i < addresses.length; i++){
      let balance = await contract.methods.balanceOf(addresses[i]).call() / (10**18)
      let address = addresses[i]
      var result = [address,balance]

      let name = await contract.methods.getName(address).call()
      if (name!=""){
        result[0] = name
      }

      addressBalances.push(result)
    }
    addressBalances = addressBalances.sort(function(a, b) { return b[1] - a[1]; });
    
    console.log(addressBalances)

    this.setState(
      { account: accounts[0], 
        ethBalance: ethBalance, 
        balance: balance, 
        addressBalances: addressBalances, 
        contract: contract, 
        account: accounts[0],
        name: name
      })
  }

  constructor(props) {
    super(props)
    this.loadBlockchainData()

    this.state = { account: "", 
      ethBalance: 0, 
      balance: 0, 
      addressBalances: [], 
      contract: undefined, 
      account: "",
      name: ""
    }
  }

  render() {
    return (
      <div className="balance">
        <h1>Promacoin DApp</h1>
        <p>Your account:&emsp; {this.state.account}</p>
        <p>Balance:&emsp; {this.state.ethBalance} ETH</p>
        <p>Promacoin:&emsp; <img src={logo} alt="Logo" class="logo" /> {this.state.balance}</p>
        <NameSetter contract={this.state.contract} account={this.state.account}/>
        <h3>Highscore:</h3> {this.state.addressBalances.map((addressBalance) => (<p>{addressBalance[0]}: <img src={logo} alt="Logo" class="logo" /> {addressBalance[1]}</p>))}
      </div>
    );
  }
}

export default Balance;
