import { useEffect, useState } from "react";

export default function Dimension({ dimension }) {
    const sizes = ["F", "S", "M", "L", "XL", "XXL", "XXXL"];
    const [select, setSelect] = useState("F");

    useEffect(() => {
        // Map full name to size code
        const defaultMap = {
            "Free": "F",
            "Small": "S",
            "Medium": "M",
            "Large": "L",
            "XL": "XL",
            "XXL": "XXL",
            "XXXL": "XXXL"
        };

        const mapped = defaultMap[dimension] || "F";
        setSelect(mapped);
    }, [dimension]);

    return (
        <div className="flex flex-wrap gap-2">
            {sizes.map(size => (
                <button
                    key={size}
                    onClick={() => setSelect(size)}
                    className={`px-4 py-1 rounded-full border 
                        ${select === size 
                            ? "bg-green-600 text-white border-green-700" 
                            : "bg-white/20 text-white border-white/30 hover:bg-white/30"} 
                        transition-all duration-150`}
                >
                    {size}
                </button>
            ))}
        </div>
    );
}
