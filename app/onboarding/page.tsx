"use client"
import { useState } from "react";
import { BlockChain } from "@/components/ui/SelectChain";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SeedPhrase } from "@/components/ui/SeedPhrase";

const Page = () => {
    const [activeTab, setActiveTab] = useState("step1");
    const [selectedBlockchain, setSelectedBlockchain] = useState(null);

    const nextStep = () => {
        if (activeTab === "step1" && !selectedBlockchain) return;
        if (activeTab === "step1") setActiveTab("step2");
        else if (activeTab === "step2") setActiveTab("step3");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br w-full from-gray-900 to-gray-800 text-white">
            <Tabs value={activeTab} className="w-fit bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-lg p-6">
                <TabsList className="flex justify-center">
                    <TabsTrigger value="step1" onClick={() => setActiveTab("step1")}>Select Blockchain</TabsTrigger>
                    <TabsTrigger value="step2" onClick={() => setActiveTab("step2")}>Generate Seed</TabsTrigger>
                    <TabsTrigger value="step3" onClick={() => setActiveTab("step3")}>Complete Setup</TabsTrigger>
                </TabsList>

                <TabsContent value="step1">
                    <BlockChain onSelect={(blockchain: any) => setSelectedBlockchain(blockchain)} />
                </TabsContent>

                <TabsContent value="step2">
                    <SeedPhrase  />
                </TabsContent>

                <TabsContent value="step3">
                    <p>Setup complete! You can now manage your crypto assets.</p>
                </TabsContent>
            </Tabs>

            <button
                onClick={nextStep}
                className={`mt-4 px-4 py-2 rounded-lg text-white ${activeTab === "step3" ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                    }`}
                disabled={activeTab === "step3" || (activeTab === "step1" && !selectedBlockchain)}
            >
                Next
            </button>
        </div>
    );
};

export default Page;
