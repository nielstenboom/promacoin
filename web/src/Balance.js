import React from 'react';
import './Balance.css';
import Web3 from 'web3'


class Balance extends React.Component {
  componentWillMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    const accounts = await web3.eth.getAccounts()
    const balance = await web3.eth.getBalance(accounts[0]) / (10**18)
    this.setState({ account: accounts[0], balance: balance })
  }

  constructor(props) {
    super(props)
    this.state = { account: '' }
  }

  render() {
    return (
      <div className="container">
        <p>Your account: {this.state.account}</p>
        <p>Balance: {this.state.balance} ETH</p>
      </div>
    );
  }
}

export default Balance;
