import { useState } from "react";
import { generateMnemonic } from "bip39";

export const SeedPhrase = ({onGenerate}: {onGenerate: (seedPhrase: string) => void}) => {
    const [seedPhrase, setSeedPhrase] = useState("");
    const [isGenerated, setIsGenerated] = useState(false);

    // Generate a new seed phrase
    const generateSeedPhrase = () => {
        const newSeed = generateMnemonic();
        setSeedPhrase(newSeed);
        setIsGenerated(true);
        onGenerate(newSeed);
    };

    // Download seed phrase as CSV
    const downloadCSV = () => {
        const blob = new Blob([seedPhrase], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "seed-phrase.csv";
        link.click();
    };

    // Upload and parse seed phrase from CSV
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    setSeedPhrase(e.target.result as string);
                    setIsGenerated(true);
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <div className="text-center p-6">
            {!isGenerated && (
                <div>
                    <input
                        type="text"
                        placeholder="Enter your existing seed phrase"
                        className="px-4 py-2 mt-4 border text-gray-900 border-gray-300 rounded-lg w-full max-w-md mx-auto"
                        onChange={(e) => setSeedPhrase(e.target.value)}
                        value={seedPhrase}
                    />
                    
                    <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={generateSeedPhrase}
                            className="px-6 py-2  text-blue-900 rounded-lg shadow-md "
                        >
                            Generate Seed Phrase
                        </button>

                        <label className="px-6 py-2  text-gray-900 rounded-lg shadow-md cursor-pointer ">
                            Import from CSV
                            <input
                                type="file"
                                accept=".csv"
                                onChange={handleFileUpload}
                                className="hidden"
                            />
                        </label>
                    </div>
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
                    <h1 className="text-center mt-4 text-gray-500">Secured with <span className="font-bold">AES-256</span>  make sure to save it
                         <br /> a safe place don't share it with anyone</h1>
                    <div className="mt-6 flex justify-center">
                        <button
                            onClick={downloadCSV}
                            className="px-6 py-2  text-gray-900 rounded-lg shadow-md cursor-pointer"
                        >
                            Download Seed Phrase as CSV
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
