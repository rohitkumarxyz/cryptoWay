"use client";
import WalletImport from "@/components/core/walletImport";
import WalletNew from "@/components/core/WalletNew";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";


const Onboarding = () => {
    const searchParams = useSearchParams();
    const [wallet, setWallet] = useState<string | null>(null);
    useEffect(() => {
        const wallet = searchParams.get("wallet");
        setWallet(wallet);
    }, [searchParams]);
    if (!wallet) {
        return <div>No wallet selected</div>;
    }
    return (
        <div>
            {wallet === "import" ? <WalletImport /> : <WalletNew />}
        </div>
    );
};

export default Onboarding;
