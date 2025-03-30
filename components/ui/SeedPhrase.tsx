import { useState } from "react";
import { generateMnemonic } from "bip39";

export const SeedPhrase = () => {
    const [seedPhrase, setSeedPhrase] = useState("");
    const [isGenerated, setIsGenerated] = useState(false);

    const generateSeedPhrase = () => {
        const newSeed = generateMnemonic();
        setSeedPhrase(newSeed);
        setIsGenerated(true);
    };

    // Function to download seed phrase as CSV
    const downloadCSV = () => {
        const blob = new Blob([seedPhrase], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "seed-phrase.csv";
        link.click();
    };

    return (
        <div className="text-center">
            {!isGenerated && (
                <div>
                    <input
                        type="text"
                        placeholder="Enter your existing seed phrase"
                        className="px-4 py-2 mt-4 border border-gray-300 rounded-lg w-full max-w-md mx-auto"
                        onChange={(e) => setSeedPhrase(e.target.value)}
                        value={seedPhrase}
                    />
                    <button
                        onClick={generateSeedPhrase}
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg mt-4"
                    >
                        Generate Seed Phrase
                    </button>
                </div>
            )}

            {isGenerated && (
                <div>
                    <div className="grid grid-cols-4 gap-2 mt-4 mx-auto max-w-md">
                        {seedPhrase.split(" ").map((word, index) => (
                            <div key={index} className="bg-gray-200 p-2 rounded-md text-sm font-medium text-gray-700">
                                {word}
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-4 flex justify-between">
                        <button
                            onClick={downloadCSV}
                            className="cursor-pointer  text-white "
                        >
                            Download Seed Phrase as CSV
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
