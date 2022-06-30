import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {connectWallet, initialize} from "./ethereum/web3";
import contractMain from "./ethereum/abis/Main.json";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

function App() {

  const [contractDeployed, setContract] = useState<any>('');

  const [address, setAddress] = useState<any>('');
  const [quantity, setQuantity] = useState<any>('');
  const [value, setValue] = useState<any>('');

  const [userBalance, setUserBalance] = useState<any>('');
  const [addressBalance, setAddressBalance] = useState<any>('');

  const [balance, setBalance] = useState<any>(0);
  const [tokens, setTokens] = useState<any>('');

  const [contractAddress, setContractAddress] = useState<any>('');
  const [tokenprice, setTokenPrice] = useState<any>('');



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
      const contractDeployed = await new Web3.eth.Contract(abi, '0x582c5592e44775209ad4529479c0e0e66c576e2b');
      setContractAddress(await contractDeployed.methods.getContractAddress().call());
      //getBalance();
      setContract(contractDeployed);
  }

  const buy = async () => {
      // @ts-ignore
      const Web3 = window.web3;
      const accounts = await Web3.eth.getAccounts()
      await contractDeployed.methods.buyTokens(address,quantity ).send({
          from: accounts[0],
          value: Web3.utils.toWei(value, "ether")
      })
      await getContractAddress()
  }

  const getUserBalance = async () => {
    // @ts-ignore
    const Web3 = window.web3;
    const accounts = await Web3.eth.getAccounts()
    const usrBalance= await contractDeployed.methods.balanceAccount(addressBalance).call()
    setUserBalance(usrBalance)
  }



  const getBalance = async () => {
      // @ts-ignore
      const balance = await contractDeployed.methods.getTotalSupply().call();
      setBalance(balance)
  }

  const getContractAddress = async () => {
      const address = await contractDeployed.methods.getContractAddress().call();
      setContractAddress(address);
  }

  const increment = async () => {
      // @ts-ignore
      const Web3 = window.web3;
      const accounts = await Web3.eth.getAccounts()
      await contractDeployed.methods.generetaTokens(tokens).send({
          from: accounts[0]
      })
      await getTokens(); 
  }
  const getTokens = async () => {
      const tokenBalance = await contractDeployed.methods.getTotalSupply().call();
      setTokens(tokenBalance)

  }
  const getTokenPrice = async () => {
      // @ts-ignore
      const tokenprice = await contractDeployed.methods.priceTokens(quantity).call()
      setTokenPrice(tokenprice)

  }

  return (
      <div className="App" id="grad1">
        <h1>TURBO COIN</h1>
        <Button onClick={() => connectWallet()} className="btn btn-info" variant='success'>Connect Metamask Wallet</Button>
        <div className='container'>
            <p>Contract Address: {contractAddress}</p>
        </div>  
        <div className='container'>
            <h2>Comprar monedas</h2>
            <div>
                <Form.Label>Destino</Form.Label>
                <Form.Control id='addressField' type="text" value={address} onChange={ (event) => { setAddress(event.target.value) } } />
            </div>
            <div>
                <Form.Label>Cantidad de tokens (1 token = 1 ether)</Form.Label>
                <Form.Control id='quantityField' type="number" value={quantity} onChange={ (event) => { setQuantity(event.target.value) } } />
            </div>
            <div>
                <Form.Label>Valor</Form.Label>
                <Form.Control id='quantityField' type="text" value={value} onChange={ (event) => { setValue(event.target.value) } } />
            </div>
            <Button onClick={() => buy()} className="btn btn-info" variant='success'>Buy</Button>
        </div>

        <div className='container'>
            <p>Monto de contrato: {balance} TBC</p>
            <Button onClick={getBalance} className="btn btn-info" variant='success'>Balance actual</Button>            
        </div>
        
        <div className='container'>
            <h2>Get User Balance</h2>
            <Form.Label>Dirección de cuenta</Form.Label>
            <Form.Control id='addressField' type="text" value={addressBalance} onChange={ (event) => { setAddressBalance(event.target.value) } } />  
            <button onClick={() => getUserBalance()} className="btn btn-info">User Balance</button>
            <p>Balance: {userBalance}</p>
        </div>

        <div className='container'>
            <h2>Create new Tokens</h2>
            <Form.Control id='addressField' type="number" value={tokens} onChange={ (event) => { setTokens(event.target.value) } } />
            <Button onClick={increment} className="btn btn-info" variant='success'>Create tokens</Button>
        </div>
        <div className='container'>
            <h2>Calcular precio de tokens</h2>
            <Form.Control id='addressField' type="number" value={quantity} onChange={ (event) => { setQuantity(event.target.value) } } />
            <Button onClick={getTokenPrice} className="btn btn-info" variant='success'>Get price</Button>
            <p>Precio: {tokenprice / 10**18} ETH</p>
        </div>
      </div>



  );
}

export default App;