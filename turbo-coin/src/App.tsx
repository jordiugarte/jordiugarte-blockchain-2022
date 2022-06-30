import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {connectWallet, initialize} from "./ethereum/web3";
import contractMain from "./ethereum/abis/Main.json"

function App() {

  const [contract, setContract] = useState<any>('');

  const [address, setAddress] = useState<any>('');
  const [quantity, setQuantity] = useState<any>(0);
  const [balance, setBalance] = useState<any>(0);
  const [addition, setAddition] = useState<any>(0);
  const [contractAddress, setContractAddress] = useState<any>('');

  const [contractBalance, setContractBalance] = useState<any>('');

  useEffect( () => {
    // @ts-ignore
    if(window.web3) {
      initialize();
      loadBlockchainData();
    }
  }, [])

  const loadBlockchainData = async () => {
    // @ts-ignore
    const Web3 = window.web3;
    const abi = contractMain.abi;
    const contractDeployed = new Web3.eth.Contract(abi, '0x1403FB1fF13875035F791D7EbB922E1267Ef0f84');
    setContract(contractDeployed);
    //getSmartContractAddress();
    //getSupply();
  }

  const buy = async () => {
    // @ts-ignore
    const Web3 = window.web3;
    const accounts = await Web3.eth.getAccounts()
    await contract.methods.buyTokens(address, Number(quantity)).send({
      from: accounts[0],
      value: Web3.utils.toWei(quantity, "ether")
    })
  }

  const getBalance = async () => {
    // @ts-ignore
    const Web3 = window.web3;
    const abi = contract.abi;
    const balance = await contract.methods.balanceAccount(address);
    setBalance(balance)
  }

  const getSupply = async () => {
    // @ts-ignore
    const contractBalance = await Number(contract.methods.getTotalSupply());
    setContractBalance(contractBalance);
  }

  const increment = async () => {
    // @ts-ignore
    const Web3 = window.web3;
    const accounts = await Web3.eth.getAccounts()
    await contract.methods.generetaTokens(quantity).send({
        from: accounts[0]
    })
  }

const getSmartContractAddress = async () => {
  const contractAddress = await contract.methods.getContractAddress();
  setContractAddress(contractAddress);

}

  return (
    <div className="App">
      <button onClick={() => connectWallet()} className="btn btn-success">Connect</button>
        <div>
          <h1>Comprar tokens</h1>
          <label>
            Dirección de destino
            <input id='addressField' type="text" value={address} onChange={ (event) => { setAddress(event.target.value) } } />
          </label>
        </div>
        <div>
          <label>
            Cantidad de tokens a comprar (1 token = 1 ether)
            <input id='quantityField' type="text" value={quantity} onChange={ (event) => { setQuantity(event.target.value) } } />
          </label>
        </div>
        <button onClick={() => buy()} className="btn btn-success">Comprar tokens</button>

        <div>
          <h1>Balance</h1>
          <label>
            Dirección del usuario
            <input id='addressField' type="text" value={address} onChange={ (event) => { setAddress(event.target.value) } } />
          </label>
          <p>BALANCE: {balance}</p>
        </div>
        <button onClick={getBalance}>Balance de usuario</button>
        <div>
          <h1>Balance total de tokens del Smart Contract</h1>
          <button onClick={getSupply}>Obtener balance</button>
        </div>
        <p>CONTRACT BALANCE: {contractBalance}</p>

        <div>
          <h1>Añadir nuevos tokens</h1>
          <input id='addressField' type="text" value={addition} onChange={ (event) => { setAddition(event.target.value) } } />
          <button onClick={increment}>Añadir tokens</button>
        </div>

        <div>
          <h1>Direccion del Smart Contract en Rinkeby</h1>
          <p>{contractAddress}</p>
        </div>
    </div>
  );
}

export default App;
