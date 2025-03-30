"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import Link from "next/link";

const Security = () => {
    const [accepted, setAccepted] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        localStorage.getItem("accepted") === "true" ? setShow(false) : setShow(true);
    }, []);

    const handleAccept = () => {
        localStorage.setItem("accepted", "true");
        setAccepted(true);
        setShow(false);
    };

    return (
        show && (
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="fixed bottom-4 left-4 w-full max-w-xs md:max-w-sm bg-white shadow-lg rounded-lg border border-gray-300 p-4 md:p-5 z-50"
            >
                <CardContent className="flex flex-col gap-3">
                    <h2 className="text-lg font-semibold text-gray-900">Security Check</h2>
                    <p className="text-sm text-gray-700">
                        CryptoWay ensures your security. Please accept our Terms & Conditions before proceeding.
                    </p>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="terms"
                            checked={accepted}
                            className="border border-gray-400 focus:ring-2 focus:ring-gray-600 cursor-pointer"
                            onCheckedChange={(checked) => setAccepted(checked === true)}
                        />
                        <label htmlFor="terms" className="text-sm text-gray-600">
                            I accept the <Link href="#" className="text-gray-800 underline hover:text-gray-900">Terms & Conditions</Link>
                        </label>
                    </div>
                    <motion.div whileHover={{ scale: accepted ? 1.02 : 1 }} whileTap={{ scale: accepted ? 0.98 : 1 }}>
                            <Button
                                className={`w-full py-2 text-sm font-medium rounded-md transition-all duration-300 shadow-md cursor-pointer ${accepted ? "bg-gray-900 text-white hover:bg-gray-800" : "bg-gray-400 cursor-not-allowed"}`}
                                disabled={!accepted}
                                onClick={handleAccept}
                            >
                                Get Started
                            </Button>
                    </motion.div>
                </CardContent>
            </motion.div>
        )
    );
};

export { Security };
