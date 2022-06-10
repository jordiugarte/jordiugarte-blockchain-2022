import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {connectWallet, initialize} from './ethereum/web3';

function App() {

  useEffect(() => {
    // @ts-ignore
    if(window.web3) {
      initialize();
    }
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hi React, Truffle and Firebase
        </a>
        <button onClick={() => connectWallet()}>Connect</button>
      </header>
    </div>
  );
}

export default App;
