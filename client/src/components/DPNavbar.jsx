import React from "react";
import WalletCard from "./WalletCard";

function DPNavbar() {
    return (
        <nav className="flex items-center justify-between bg-[#4542E2] px-5 py-3">
            <div className="flex items-center space-x-4">
                <img src="https://imgs.search.brave.com/CIaAKBQLU1Gsbx8guiJV3ayz07VUBfoPEVoQY5S7Fss/rs:fit:860:0:0/g:ce/aHR0cHM6Ly8xMDAw/bG9nb3MubmV0L3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE3LzA1/L0NvbG9yLUFtZXJp/Y2FuLVJlZC1Dcm9z/cy1Mb2dvLTUwMHg1/MDAuanBn" alt='logo' className='w-20 h-20' />
                <span className="text-white">NAVBAR</span>
            </div>
            <button className="">
                <WalletCard />
            </button>
        </nav>
    );
}

export default DPNavbar;
