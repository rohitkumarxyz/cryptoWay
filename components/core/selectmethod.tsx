import { Button } from "../ui/button";
import { Key, FileText } from "lucide-react";

const SelectMethod = ({ onSelect }: { onSelect: (method: any) => void }) => {
    return (
        <div className="flex flex-col items-center space-y-4 p-6 bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold text-center text-blue-500">Select Authentication Method</h1>

            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                <Button
                    onClick={() => onSelect("privateKey")}
                    className="flex items-center cursor-pointer justify-center gap-2"
                >
                    <Key className="w-5 h-5" /> Private Key
                </Button>

                <Button
                    onClick={() => onSelect("mnemonic")}
                    className="flex items-center cursor-pointer justify-center gap-2"
                >
                    <FileText className="w-5 h-5" /> Mnemonic Phrase
                </Button>
            </div>
        </div>
    );
};

export default SelectMethod;
