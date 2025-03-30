import { useState } from "react";

export const BlockChain = ({ onSelect }: any) => {
    const [selected, setSelected] = useState(null);

    const handleSelect = (blockchain: any) => {
        setSelected(blockchain);
        onSelect(blockchain);
    };

    return (
        <div>
            <h1 className="text-center">Choose a blockchain to get started.</h1>
            <h1 className="text-center mt-4 text-gray-500">more coming soon...</h1>
            <div className="flex gap-4 p-4">
                <div
                    className={`border rounded-2xl shadow-md p-4 flex flex-col items-center w-1/2 cursor-pointer ${selected === 'Ethereum' ? 'border-blue-500' : ''}`}
                    onClick={() => handleSelect('Ethereum')}
                >
                    <img src="/ethereum.png" alt="Ethereum" className="w-16 h-16 mb-2" />
                    <h2 className="text-lg font-semibold text-blue-500">Ethereum</h2>
                </div>

                <div
                    className={`border rounded-2xl shadow-md p-4 flex flex-col items-center w-1/2 cursor-pointer ${selected === 'Solana' ? 'border-blue-500' : ''}`}
                    onClick={() => handleSelect('Solana')}
                >
                    <img src="/solana.png" alt="Solana" className="w-16 h-16 mb-2" />
                    <h2 className="text-lg font-semibold text-blue-500">Solana</h2>
                </div>
            </div>
            {selected && <p className="text-center mt-4 text-blue-500">Selected: {selected}</p>}
        </div>
    );
};
