import { useState, useContext, useEffect } from "react";
import { usdToEth, ethToUsd } from "../utils/conversion";
import { WalletContext } from "@/context/WalletContext";
import { ethers } from "ethers";
import FinvestABI from '../utils/FinvestABI.json';
import { GenAILoader } from '@/components/GenAILoader';

const CONTRACT_ADDRESS = '0x0cd118073a8ff6026ae465621664b277e32e2843';

const DonationModal = ({ isOpen, onClose, projectId }) => {
    const [amountUSD, setAmountUSD] = useState("");
    const [amountETH, setAmountETH] = useState("");
    const [loading, setLoading] = useState(false); // Add loading state
    const { walletAddress, connectWallet, signer } = useContext(WalletContext);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.className.includes('modal')) {
                onClose(); // Close the modal if clicked outside of modal content
            }
        };

        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen, onClose]);

    const handleUSDChange = (e) => {
        const usd = e.target.value;
        setAmountUSD(usd);
        setAmountETH(usdToEth(usd));
    };

    const handleETHChange = (e) => {
        const eth = e.target.value;
        setAmountETH(eth);
        setAmountUSD(ethToUsd(eth));
    };

    const handleSubmit = () => {
        if (amountUSD > 0) {
            handleDonate(amountETH, amountUSD);
        }
    };

    const handleDonate = async (amountETH, amountUSD) => {
        try {
            setLoading(true); // Start loading when transaction starts
            console.log("Transacting ...");
            if (!walletAddress || !signer) {
                await connectWallet();
            }

            const contract = new ethers.Contract(CONTRACT_ADDRESS, FinvestABI, signer);
            const amountInWei = ethers.utils.parseEther(amountETH);

            // Contribute to the project
            const tx = await contract.contribute(projectId, { value: amountInWei });
            const receipt = await tx.wait();

            if (receipt.status === 1) {
                console.log("Transaction successful:", receipt.transactionHash);
                await saveTransactionToBackend(receipt.transactionHash, amountETH, amountUSD);
            } else {
                console.error("Transaction failed");
            }

            onClose(); // Close the modal after successful donation
        } catch (error) {
            console.error("Error in donation:", error);
        } finally {
            setLoading(false); // Stop loading after transaction is complete
        }
    };

    const saveTransactionToBackend = async (transactionHash, amountETH, amountUSD) => {
        try {
            const response = await fetch("https://finvest-backend.onrender.com/transactions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    project: projectId,
                    contributor: walletAddress,
                    amount: amountETH,
                    transactionHash,
                    network: "Ethereum",
                    status: "confirmed",
                })
            });

            const data = await response.json();
            console.log("Transaction recorded in backend:", data);
        } catch (error) {
            console.error("Error saving transaction to backend:", error);
        }
    };

    return (
        <div className={`modal ${isOpen ? 'open' : ''}`} style={modalStyles}>
            <div className="modal-content" style={modalContentStyles}>
                <h2 style={headingStyles}>Donate to Project</h2>
                {loading ? ( // Show loader if loading is true
                    <div className="relative w-full h-full flex items-center justify-center">
                        <GenAILoader />
                    </div>
                ) : (
                    <>
                        <label style={labelStyles}>
                            Amount in USD:
                            <input
                                type="number"
                                value={amountUSD}
                                onChange={handleUSDChange}
                                style={inputStyles}
                            />
                        </label>
                        <label style={labelStyles}>
                            Amount in ETH:
                            <input
                                type="number"
                                value={amountETH}
                                onChange={handleETHChange}
                                style={inputStyles}
                            />
                        </label>
                        <div style={buttonContainerStyles}>
                            <button onClick={handleSubmit} style={buttonStyles}>Donate</button>
                            <button onClick={onClose} style={buttonStyles}>Cancel</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default DonationModal;

const modalStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
};

const modalContentStyles = {
    backgroundColor: '#1A3A2C',
    padding: '20px',
    borderRadius: '15px',
    width: '350px',
    color: '#ffffff',
};

const headingStyles = {
    color: '#2FB574',
    fontSize: '1.5rem',
    marginBottom: '20px',
    textAlign: 'center',
};

const labelStyles = {
    display: 'block',
    marginBottom: '10px',
    fontSize: '1rem',
    color: '#ffffff',
};

const inputStyles = {
    width: '100%',
    padding: '10px',
    margin: '5px 0',
    borderRadius: '5px',
    border: '1px solid #2C5440',
    backgroundColor: '#05140D',
    color: '#ffffff',
    outline: 'none',
};

const buttonStyles = {
    padding: '10px 15px',
    margin: '5px',
    backgroundColor: '#2FB574',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
};

const buttonContainerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
};
