"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import Link from "next/link";

const Home = () => {
    const [accepted, setAccepted] = useState(false);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-6 md:px-12 bg-gray-100 text-gray-900">
            <motion.h1
                className="text-3xl md:text-4xl font-semibold text-center mb-6"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                Welcome to CryptoWay
            </motion.h1>

            <Card className="w-full max-w-md md:max-w-lg bg-white shadow-lg rounded-lg p-6 md:p-8 border border-gray-300">
                <CardContent className="flex flex-col gap-4">
                    <p className="text-sm md:text-base text-center text-gray-700">
                        CryptoWay is your secure and reliable platform for managing your crypto assets with ease and safety.
                    </p>

                    <p className="text-xs text-center text-gray-500">
                        <strong>Note:</strong> Always store your private keys securely. Crypto transactions are irreversible, so verify before proceeding.
                    </p>

                    <div className="flex items-center space-x-2 justify-center">
                        <Checkbox
                            id="terms"
                            checked={accepted}
                            onCheckedChange={(checked) => setAccepted(checked === true)}
                            className="border border-gray-400 focus:ring-2 focus:ring-gray-600 cursor-pointer"
                        />
                        <label htmlFor="terms" className="text-sm text-gray-600">
                            I accept the <Link href="#" className="text-gray-800 underline hover:text-gray-900">Terms & Conditions</Link>
                        </label>
                    </div>

                    <motion.div
                        whileHover={{ scale: accepted ? 1.02 : 1 }}
                        whileTap={{ scale: accepted ? 0.98 : 1 }}
                        className="w-full"
                    >
                        <Link href="/onboarding">
                            <Button
                                className={`w-full py-2 text-sm font-medium rounded-md transition-all duration-300 shadow-md cursor-pointer ${accepted ? "bg-gray-900 text-white hover:bg-gray-800" : "bg-gray-400 cursor-not-allowed"
                                    }`}
                                disabled={!accepted}
                            >
                                Get Started
                            </Button></Link>
                    </motion.div>
                </CardContent>
            </Card>
        </div>
    );
};

export { Home };
