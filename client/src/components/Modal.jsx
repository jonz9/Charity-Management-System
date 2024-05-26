import React from "react";

const Modal = ({ charity, handleCloseModal }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white p-8 rounded-lg max-w-lg">
                <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl p-2" // Adjusted size
                    onClick={handleCloseModal}
                >
                    &times;
                </button>
                <h2 className="text-2xl font-semibold mb-4">{charity.name}</h2>
                <p className="text-lg mb-4">{charity.description}</p>
                <div>
                    <p className="text-lg font-semibold mb-2">Causes:</p>
                    <ul>
                        {charity.causes.map((cause, index) => (
                            <li key={index} className="mb-1">
                                {cause}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Modal;

