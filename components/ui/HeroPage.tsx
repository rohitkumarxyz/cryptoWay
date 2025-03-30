"use client"
import { Button } from "./button";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

const floatingAnimation = {
    animate: {
        y: [0, -10, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
        },
    },
};

const CryptoIcon = ({ src, alt, className }: { src: string, alt: string, className: string }) => (
    <motion.div className={`absolute opacity-90 hidden sm:block ${className}`} {...floatingAnimation}>
        <Image src={src} alt={alt} width={80} height={80} className="rounded-full shadow-lg" />
    </motion.div>
);

const HeroPage = () => {
    const router = useRouter();
    return (
        <section className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center bg-gray-50 dark:bg-gray-900 overflow-hidden">
            <CryptoIcon src="/btc.jpg" alt="BTC" className="top-24 left-20 w-20" />
            <CryptoIcon src="/ethereum.png" alt="ETH" className="top-32 right-24 w-20" />
            <CryptoIcon src="/solana.png" alt="SOL" className="bottom-16 left-16 w-20" />
            <CryptoIcon src="/usdt.jpg" alt="USDT" className="bottom-5 right-16 w-20" />

            {/* Hero Content */}
            <div className="max-w-2xl relative z-10">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white md:text-5xl">
                    Welcome to <span className="text-blue-600 bg-blue-50 px-2 rounded-md">CryptoWay</span>
                </h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                    Securely manage, swap, and grow your crypto assets with ease.
                </p>
                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-center">
                    <Button onClick={() => router.push('/learn')} className="cursor-pointer px-6 py-3 text-lg font-medium bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300">
                        Learn
                    </Button>
                    <Button onClick={() => router.push('/onboarding')} className="cursor-pointer px-6 py-3 text-lg font-medium bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-lg shadow-lg hover:from-gray-800 hover:to-gray-600 transition-all duration-300">
                        Import Wallet
                    </Button>
                </div>
            </div>
        </section>
    );
};

export { HeroPage };