import { ethers } from "ethers";

const provider = new ethers.BrowserProvider(window.ethereum); // Connects to MetaMask
const signer = await provider.getSigner(); // Gets the current user's account

export { provider, signer };
