import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { validateMnemonic, wordlists } from "bip39";

const WalletImport = () => {
    const [activeTab, setActiveTab] = useState("step1");
    const [importMethod, setImportMethod] = useState<"privateKey" | "mnemonic" | null>(null);
    const [mnemonic, setMnemonic] = useState(Array(12).fill(""));
    const [isValidMnemonic, setIsValidMnemonic] = useState<boolean | null>(null);
    const [csvFile, setCsvFile] = useState<File | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [privateKey, setPrivateKey] = useState("");
    const router = useRouter();
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleMnemonicChange = (index: number, value: string) => {
        const newMnemonic = [...mnemonic];
        newMnemonic[index] = value.trim().toLowerCase();
        setMnemonic(newMnemonic);

        if (index < newMnemonic.length - 1 && value.length > 0) {
            inputRefs.current[index + 1]?.focus();
        }

        const phrase = newMnemonic.join(" ").trim();
        setIsValidMnemonic(validateMnemonic(phrase));
    };

    const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            setCsvFile(file);

            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target?.result as string;
                const words = text.split(/[ ,\n]+/).map(word => word.trim()).filter(word => word);
                if (words.length === 12 || words.length === 24) {
                    setMnemonic(words);
                    setIsValidMnemonic(validateMnemonic(words.join(" ")));
                }
            };
            reader.readAsText(file);
        }
    };

    const handleImport = () => {
        if (importMethod === "mnemonic" && isValidMnemonic) {
            router.push("/dashboard");
        }
    };

    const handleClear = () => {
        setMnemonic(Array(12).fill(""));
        setIsValidMnemonic(false);
        setCsvFile(null);
        setFile(null);
        setPrivateKey("");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full text-white">
            <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-xl w-full max-w-md p-6">
                <CardHeader>
                    <CardTitle className="text-center text-xl text-blue-400">Import Wallet</CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs value={activeTab} className="w-full">
                        <TabsList className="flex justify-center gap-4 mb-4">
                            <TabsTrigger value="step1" onClick={() => setActiveTab("step1")}>Select Method</TabsTrigger>
                            <TabsTrigger value="step2" disabled={!importMethod}>Enter Details</TabsTrigger>
                        </TabsList>

                        <TabsContent value="step1">
                            <div className="flex flex-col gap-4 text-center">
                                <Button variant="outline" className="py-3 cursor-pointer" onClick={() => { setImportMethod("privateKey"); setActiveTab("step2"); }}>Import via Private Key</Button>
                                <Button variant="outline" className="py-3 cursor-pointer" onClick={() => { setImportMethod("mnemonic"); setActiveTab("step2"); }}>Import via Seed Phrase</Button>
                            </div>
                        </TabsContent>

                        <TabsContent value="step2">
                            <div className="text-center p-4 bg-white/10 rounded-lg border border-white/20 shadow-md">
                                <h1 className="text-lg text-blue-400 font-semibold mb-4">
                                    Enter {importMethod === "privateKey" ? "Private Key" : "Seed Phrase"}
                                </h1>

                                {importMethod === "privateKey" && (
                                    <div className="space-y-4">
                                        <Input type="text" placeholder="Enter Private Key" value={privateKey} onChange={(e) => setPrivateKey(e.target.value)} className="text-black w-full" />
                                    </div>
                                )}

                                {importMethod === "mnemonic" && (
                                    <div className="space-y-4">
                                        <p className="text-sm text-gray-300 mb-2">Enter your 12 or 24-word seed phrase manually or import from CSV</p>
                                        <div className="grid grid-cols-4 gap-3">
                                            {mnemonic.map((word, index) => (
                                                <Input
                                                    key={index}
                                                    ref={(el) => { inputRefs.current[index] = el }}
                                                    type="text"
                                                    className={`text-black w-full ${word && !wordlists.english.includes(word) ? "border-red-500" : "border-gray-300"}`}
                                                    onChange={(e) => handleMnemonicChange(index, e.target.value)}
                                                    value={word}
                                                    autoComplete="off"
                                                />
                                            ))}
                                        </div>
                                        <input type="file" accept=".csv" onChange={handleCSVUpload} className="mt-3 text-gray-500 text-center cursor-pointer " />
                                        {csvFile && <p className="text-sm mt-2 text-green-400">File Selected: {csvFile.name}</p>}
                                        <p className={`text-sm mt-2 ${isValidMnemonic === null ? "text-gray-400" : isValidMnemonic ? "text-green-400" : "text-red-400"}`}>
                                            {isValidMnemonic === null ? "Enter Seed Phrase" : isValidMnemonic ? "Valid Seed Phrase" : "Invalid Seed Phrase"}
                                        </p>
                                    </div>
                                )}

                                <div className="flex justify-between mt-4">
                                    <Button onClick={handleClear} className="bg-red-500 cursor-pointer text-white py-2 px-4 rounded-lg">Clear</Button>
                                    <Button
                                        className={`bg-gradient-to-r cursor-pointer from-blue-500 to-blue-600 text-white py-2.5 rounded-lg transition-all duration-200 ${!isValidMnemonic && importMethod === "mnemonic" ? "opacity-50 cursor-not-allowed" : ""}`}
                                        onClick={handleImport}
                                        disabled={!isValidMnemonic && importMethod === "mnemonic"}
                                    >
                                        Import Wallet
                                    </Button>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
};

export default WalletImport;