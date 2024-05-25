import React, { useState } from 'react';

const WalletCard = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [connButtonText, setConnButtonText] = useState('Connect Wallet');
    const [isBalanceVisible, setIsBalanceVisible] = useState(true);

    const connectWalletHandler = () => {
        if (window.ethereum && window.ethereum.isMetaMask) {
            console.log('MetaMask Here!');

            window.ethereum.request({ method: 'eth_requestAccounts'})
            .then(result => {
                accountChangedHandler(result[0]);
                setConnButtonText('Wallet Connected');
                
            })
            .catch(error => {
                setErrorMessage(error.message);
            
            });

        } else {
            console.log('Need to install MetaMask');
            setErrorMessage('Please install MetaMask browser extension to interact');
        }
    }

    const accountChangedHandler = (newAccount) => {
        setDefaultAccount(newAccount);
    }

    const chainChangedHandler = () => {
        // Reload the page to avoid any errors with chain change mid-use of application
        window.location.reload();
    }

    window.ethereum.on('accountsChanged', accountChangedHandler);
    window.ethereum.on('chainChanged', chainChangedHandler);
    
    const toggleBalanceVisibility = () => {
        setIsBalanceVisible(!isBalanceVisible);
    }

    return (
        <div className="text-white font-bold">
            <button onClick={connectWalletHandler}>{connButtonText}</button>
            <button onClick={toggleBalanceVisibility}>{isBalanceVisible ? 'Hide Balance' : 'Show Balance'}</button>
            {isBalanceVisible && (
                <div className='accountDisplay'>
                    <h3>Address: {defaultAccount}</h3>
                </div>
            )}
            {errorMessage}
        </div>
    );
}

export default WalletCard;
