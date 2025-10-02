import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
    return (
        <a
            href="https://wa.me/254721876253?text=Hello%20I%20would%20like%20to%20book%20a%20tour"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 group"
        >
            {/* Button */}
            <div className="flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg transition-colors duration-300 animate-pulse-glow">
                <MessageCircle size={28} className="text-white" />
            </div>

            {/* Tooltip */}
            <span className="absolute right-16 bottom-1/2 translate-y-1/2 px-3 py-1 text-sm bg-gray-800 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg">
        Chat with us on WhatsApp
      </span>
        </a>
    );
};

export default WhatsAppButton;
