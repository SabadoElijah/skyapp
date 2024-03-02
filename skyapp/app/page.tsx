"use client";
import { BrowserProvider } from "ethers";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getContract } from "../config";

export default function Home() {
  const [walletKey, setwalletKey] = useState("");
  const [currentData, setcurrentData] = useState("");

  const connectWallet = async () => {
    const { ethereum } = window as any;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setwalletKey(accounts[0]);
  };
  //<Minting>
  const [mintingAmount, setMintingAmount] = useState<number>();
  const [submitted, setSubmitted] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");
  
  const mintCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.mint(signer, mintingAmount);
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };
  const mintAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setMintingAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setMintingAmount(0);
    }
  };
  //</Minting>

  //<Staking>
  const [stakingAmount, setStakingAmount] = useState<number>();
  const stakeCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.stake(stakingAmount);
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };
  const stakeAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setStakingAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setStakingAmount(0);
    }
  };
  //</Staking>
 
  //<Withdraw>
  const withdrawCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.withdraw();
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };
  //</Withdraw>
  //<Import Token>
  const importToken = async() => {
    const {ethereum} = window as any;
    const tokenAddress = "0xA60d84a44Ea140243e427655CC7C2fD0a248359C"; //contract add
    const tokenSymbol = "SKY";
    const tokenDecimal = 18;

    try{
      const wasAdded = await ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimal,
          },
        },
      });
    }
    catch(error){
      console.log(error);
    }
  };
  //</Import Token>

  //HTML/TAILWIND BASTA DESIGN
  return (
    <body style={{ fontFamily: 'Trebuchet MS', fontWeight: 'bold', backgroundColor: '#ffd9b3', color: '#3b1d18', margin: 0, padding: 0,
    backgroundImage: 'url("ERC20-main/ERC20-main/catapp/bla.jpg")', // Replace with the path to your image
    backgroundSize: 'cover', // Adjust as needed
    backgroundRepeat: 'repeat',  }}>
      <main>
        <p style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: '30px', marginTop: '10px' }}>
        ฅ^•ﻌ•^ฅ  Welcome to Mint/Staking of Sky Tokens  ฅ^•ﻌ•^ฅ
        </p>
  
        <div style={{ minHeight: '25vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <button onClick={() => { connectWallet(); }} className="p-3 bg-amber-950 text-white rounded">
            {walletKey !== "" ? walletKey : " Connect wallet"}
          </button>
  
          <button onClick={importToken} className="p-3 bg-amber-950 text-white rounded" style={{ marginTop: '10px' }}>
            Import Token
          </button>
        </div>
  
        <div style={{marginTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

          <form>
            <label> Input Amount To Mint</label><br></br>
          </form>
          <input
            type="number"
            value={mintingAmount}
            onChange={(e) => mintAmountChange(e)}
            style={{ color: 'black', border: '2px solid #3b1d18', borderRadius: '4px', padding: '1px' }}
          />
          <button
            onClick={() => { mintCoin(); }}
            className="p-3 bg-amber-950 text-white rounded"
            style={{ marginTop: '10px', fontFamily: 'Courier New' }}
          >
            {"Mint Token"}
          </button>
        </div>
  
        <br></br>
  
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '10vh' }}>
          <form>
            <label> Input Amount To Stake</label><br></br>
          </form>
          <input
            type="number"
            value={stakingAmount}
            onChange={(e) => stakeAmountChange(e)}
            style={{ color: 'black', border: '2px solid #3b1d18', borderRadius: '4px', padding: '1px' }}
          />
  
          <button
            onClick={stakeCoin}
            className="p-3 bg-amber-950 text-white rounded"
            style={{ marginTop: '5px' , fontFamily: 'Courier New'}}>
            {"Stake It"}
          </button>
        </div>
  
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '20vh' }}>
          <br></br>
          <label>Wait for At least 1 min before Withdrawing </label>

          <button
            onClick={withdrawCoin}
            className="p-3 bg-amber-950 text-white rounded"
            style={{fontFamily: 'Courier New'}}
          >
            {"Withdraw ≽^•⩊•^≼"}
          </button>
        </div>
      </main>
    </body>
  );
}  
