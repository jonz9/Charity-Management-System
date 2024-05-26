import React, { useState } from "react";

const Modal = ({ charity, handleCloseModal }) => {
    const [donationAmount, setDonationAmount] = useState(0);

    const handleAmountChange = (e) => {
        setDonationAmount(e.target.value);
    };

    const handleSubmit = () => {
        // You can perform any action with the donation amount here, such as submitting it to a server
        console.log("Donation Amount:", donationAmount);
        // Close the modal
        handleCloseModal();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white rounded-lg max-w-lg overflow-hidden">
                <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl p-2"
                    onClick={handleCloseModal}
                >
                    &times;
                </button>
                <div className="p-8 max-h-96 overflow-y-auto">
                    <h2 className="text-2xl font-semibold mb-4">{charity.name}</h2>
                    <p className="text-lg mb-4">{charity.description}</p>
                    <div className="mb-4">
                        <p className="text-lg font-semibold mb-2">Causes:</p>
                        <select className="text-lg border rounded-md w-full p-2 mb-2">
                            {charity.causes.map((cause, index) => (
                                <option key={index}>{cause}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="amount" className="text-lg font-semibold mb-2 block">Donation Amount:</label>
                        <input
                            type="number"
                            id="amount"
                            className="text-lg border rounded-md w-full p-2 mb-2"
                            value={donationAmount}
                            onChange={handleAmountChange}
                        />
                    </div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleSubmit}
                    >
                        Submit Donation
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
