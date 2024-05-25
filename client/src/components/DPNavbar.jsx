import React from "react";
import WalletCard from "./WalletCard";

function DPNavbar() {
    return (
        <nav className="flex items-center justify-between bg-[#4542E2] px-5 py-3">
            <div className="flex items-center space-x-4">
                <span className="text-white">NAVBAR</span>
            </div>
            <button className="">
                <WalletCard />
            </button>
        </nav>
    );
}

export default DPNavbar;
