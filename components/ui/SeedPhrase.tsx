import { useState } from "react";
import { generateMnemonic } from "bip39";

export const SeedPhrase = ({ onGenerate }: { onGenerate: (seedPhrase: string) => void }) => {
    const [seedPhrase, setSeedPhrase] = useState("");
    const [isGenerated, setIsGenerated] = useState(false);

    // Generate a new seed phrase
    const generateSeedPhrase = () => {
        const newSeed = generateMnemonic();

        const storedSeeds = JSON.parse(localStorage.getItem("seedPhrases") || "[]");
        if (!storedSeeds.includes(newSeed)) {
            storedSeeds.push(newSeed);
            localStorage.setItem("seedPhrases", JSON.stringify(storedSeeds));
            setSeedPhrase(newSeed);
            setIsGenerated(true);
            onGenerate(newSeed);
        }
    };

    // Download seed phrase as CSV
    const downloadCSV = () => {
        const blob = new Blob([seedPhrase], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "seed-phrase.csv";
        link.click();
    };


    return (
        <div className="text-center p-6">
            {!isGenerated && (
                <div>
                    <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={generateSeedPhrase}
                            className="px-6 py-2  text-blue-900 rounded-lg shadow-md "
                        >
                            Generate Seed Phrase
                        </button>
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
