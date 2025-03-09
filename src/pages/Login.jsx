import React, { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { contractAddress, contractABI } from "../utils/constants";

const Login = ({ setUserRole }) => {
    const [walletAddress, setWalletAddress] = useState("");
    const [isDoctor, setIsDoctor] = useState(false);
    const [isPatient, setIsPatient] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // First define checkUserRole as a useCallback function
    const checkUserRole = useCallback(async (address) => {
        if (typeof window.ethereum === "undefined") {
            console.error("MetaMask not detected");
            setError("MetaMask not detected");
            return;
        }
        try {
            // Updated to ethers.js v6 syntax
            const provider = new ethers.BrowserProvider(window.ethereum);
            const contract = new ethers.Contract(contractAddress, contractABI, provider);
    
            const doctorStatus = await contract.isDoctor(address);
            const patientStatus = await contract.isPatient(address);
    
            setIsDoctor(doctorStatus);
            setIsPatient(patientStatus);
            
            if (doctorStatus) {
                setUserRole("doctor");
            } else if (patientStatus) {
                setUserRole("patient");
            }
        } catch (error) {
            console.error("Error checking role:", error);
            setError("Error checking role: " + error.message);
        }
    }, [setUserRole]); // Add setUserRole as a dependency

    // Now checkIfWalletIsConnected can use checkUserRole with proper dependencies
    const checkIfWalletIsConnected = useCallback(async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: "eth_accounts" });
                if (accounts.length > 0) {
                    setWalletAddress(accounts[0]);
                    checkUserRole(accounts[0]); // Check if user is doctor/patient
                }
            } catch (error) {
                console.error("Error fetching accounts:", error);
                setError("Error connecting to wallet: " + error.message);
            }
        }
    }, [checkUserRole]); // Now we correctly include checkUserRole as a dependency

    useEffect(() => {
        checkIfWalletIsConnected();
    }, [checkIfWalletIsConnected]);

    const connectWallet = async () => {
        setError("");
        if (!window.ethereum) {
            alert("Please install MetaMask!");
            return;
        }
        try {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            setWalletAddress(accounts[0]);
            checkUserRole(accounts[0]);
        } catch (error) {
            console.error("Error connecting wallet:", error);
            setError("Error connecting wallet: " + error.message);
        }
    };

    const registerDoctor = async () => {
        setError("");
        if (!walletAddress) return;
        setLoading(true);
        try {
            // Updated to ethers.js v6 syntax
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
            
            const tx = await contract.registerDoctor();
            await tx.wait();
            setIsDoctor(true);
            setUserRole("doctor");
        } catch (error) {
            console.error("Error registering as doctor:", error);
            setError("Error registering as doctor: " + error.message);
        }
        setLoading(false);
    };

    const registerPatient = async () => {
        setError("");
        if (!walletAddress) return;
        if (typeof window.ethereum === "undefined") {
            alert("MetaMask is not detected. Please install MetaMask!");
            return;
        }
        setLoading(true);
        try {
            // Updated to ethers.js v6 syntax
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
    
            const tx = await contract.registerPatient();
            await tx.wait();
            setIsPatient(true);
            setUserRole("patient"); // Set user role in state
        } catch (error) {
            console.error("Error registering as patient:", error);
            setError("Error registering as patient: " + error.message);
        }
        setLoading(false);
    };
    

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">MediChain Login</h1>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}
            
            {walletAddress ? (
                <div className="text-lg mb-4">
                    <strong>Connected Wallet:</strong> {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </div>
            ) : (
                <button 
                    onClick={connectWallet} 
                    className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
                >
                    Login with MetaMask
                </button>
            )}

            {walletAddress && (
                <div className="mt-4">
                    {isDoctor ? (
                        <p className="text-green-600">✅ You are registered as a Doctor!</p>
                    ) : isPatient ? (
                        <p className="text-green-600">✅ You are registered as a Patient!</p>
                    ) : (
                        <div className="flex gap-4">
                            <button 
                                onClick={registerDoctor} 
                                disabled={loading}
                                className="px-4 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 disabled:bg-gray-400"
                            >
                                {loading ? "Registering..." : "Register as Doctor"}
                            </button>
                            <button 
                                onClick={registerPatient} 
                                disabled={loading}
                                className="px-4 py-2 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-600 disabled:bg-gray-400"
                            >
                                {loading ? "Registering..." : "Register as Patient"}
                            </button>
                        </div>
                    )}
                </div>
            )}

            {isDoctor && (
                <a 
                    href="/doctors" 
                    className="mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
                >
                    Go to Doctors Page
                </a>
            )}
            {isPatient && (
                <a 
                    href="/patients" 
                    className="mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
                >
                    Go to Patients Page
                </a>
            )}
        </div>
    );
};

export default Login;