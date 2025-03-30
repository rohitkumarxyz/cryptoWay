"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Navbar = () => {
    return (
        <motion.nav
            className="fixed top-0 left-0 w-full px-6 md:px-12 py-4  backdrop-blur-md border-b border-white/20 flex justify-between items-center z-50 "
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
                whileHover={{ scale: 1.05 }}
            >
                CryptoWay
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg text-sm font-semibold">
                    Signup
                </Button>
            </motion.div>
        </motion.nav>
    );
};

export { Navbar };
