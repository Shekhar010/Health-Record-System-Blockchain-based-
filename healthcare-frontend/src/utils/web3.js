import Web3 from "web3";
import Healthcare from "../Healthcare.json";

export const getWeb3 = async () => {
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable(); // Request account access
        return web3;
    }
    throw new Error("Ethereum wallet not detected. Please install MetaMask.");
};

export const getContract = async (web3) => {
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = Healthcare.networks[networkId];
    if (!deployedNetwork) {
        throw new Error("Smart contract not deployed to the detected network.");
    }
    return new web3.eth.Contract(Healthcare.abi, deployedNetwork.address);
};
