"use client";
import { useState } from "react";
import { BlockChain } from "@/components/ui/SelectChain";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SeedPhrase } from "@/components/ui/SeedPhrase";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const WalletNew = () => {
    const [activeTab, setActiveTab] = useState("step1");
    const [selectedBlockchain, setSelectedBlockchain] = useState(null);
    const [isSeedGenerated, setIsSeedGenerated] = useState(false);
    const [seedPhrase, setSeedPhrase] = useState("");

    const nextStep = () => {
        if (activeTab === "step1" && selectedBlockchain) {
            setActiveTab("step2");
        } else if (activeTab === "step2" && isSeedGenerated) {
            setActiveTab("step3");
        }
    };

    const prevStep = () => {
        if (activeTab === "step2") setActiveTab("step1");
        else if (activeTab === "step3") setActiveTab("step2");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full text-white">
            <Tabs
                value={activeTab}
                className="w-fit bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-lg p-6"
            >
                <TabsList className="flex justify-center">
                    <TabsTrigger value="step1" onClick={() => setActiveTab("step1")}>
                        Select Blockchain
                    </TabsTrigger>
                    <TabsTrigger
                        value="step2"
                        disabled={!selectedBlockchain}
                        onClick={() => selectedBlockchain && setActiveTab("step2")}
                    >
                        Generate Seed
                    </TabsTrigger>
                    <TabsTrigger
                        value="step3"
                        disabled={!isSeedGenerated}
                        onClick={() => isSeedGenerated && setActiveTab("step3")}
                    >
                        Complete Setup
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="step1">
                    <BlockChain onSelect={(blockchain: any) => setSelectedBlockchain(blockchain)} />
                </TabsContent>

                <TabsContent value="step2">
                    <SeedPhrase onGenerate={(seedPhrase: string) => {
                        setIsSeedGenerated(true);
                        setSeedPhrase(seedPhrase);
                    }} />
                </TabsContent>

                <TabsContent value="step3">
                    <div className="text-center bg-white/10 p-6 rounded-lg border border-white/20 shadow-lg">
                        <h1 className="text-lg text-center text-blue-500 font-semibold">
                            Setup Complete!
                        </h1>
                        <p className="text-gray-400 mt-2">
                            You can now manage your crypto assets securely.
                        </p>
                        <Link href="/dashboard">
                            <Button className="mt-4 cursor-pointer bg-blue-500 hover:bg-blue-600 text-gray-900">
                                Go to Dashboard
                            </Button>
                        </Link>
                    </div>
                </TabsContent>
            </Tabs>

            {activeTab !== "step3" && (
                <div className="mt-4 flex gap-4">
                    <button
                        onClick={prevStep}
                        className={`px-4 cursor-pointer py-2 rounded-lg text-white bg-gray-500 hover:bg-gray-600 ${activeTab === "step1" ? "cursor-not-allowed opacity-50" : ""
                            }`}
                        disabled={activeTab === "step1"}
                    >
                        Previous
                    </button>

                    <button
                        onClick={nextStep}
                        className={`px-4 cursor-pointer py-2 rounded-lg text-white ${activeTab === "step1" && !selectedBlockchain
                            ? "bg-gray-500 cursor-not-allowed opacity-50"
                            : activeTab === "step2" && !isSeedGenerated
                                ? "bg-gray-500 cursor-not-allowed opacity-50"
                                : "bg-blue-500 hover:bg-blue-600 text-gray-900"
                            }`}
                        disabled={
                            (activeTab === "step1" && !selectedBlockchain) ||
                            (activeTab === "step2" && !isSeedGenerated)
                        }
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default WalletNew;
