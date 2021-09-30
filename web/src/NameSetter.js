import React from 'react';
import './Balance.css';


class NameSetter extends React.Component {

  constructor(props) {
    super(props)

    this.updateChange = this.updateChange.bind(this);
    this.setName = this.setName.bind(this)
  }

  async setName(){
    var contract = this.props.contract
    console.log(contract)
    await contract.methods.setName(this.state.input).send({from: this.props.account})
    window.location.reload();
  }

  updateChange(e) {
    this.setState({ input: e.target.value }) 
  }

  render() {
    return (
      <div>
        <input onChange={this.updateChange}></input> 
        <input type="submit" value="Set name" onClick={this.setName}></input>
      </div>
    );
  }
}

export default NameSetter;

