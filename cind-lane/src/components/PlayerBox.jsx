import { useRef, useState, useEffect } from 'react';
import TooltipPortal from '../portals/ToolTipPortal';

function PlayerBox({ 
    isFirst, 
    playerName, 
    placeHolderText, 
    pokemonName, 
    isSelected, 
    onClick, 
    warning 
}) {

    const iconRef = useRef(null);
    const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });
    const [hovered, setHovered] = useState(false);

    

    useEffect(() => {
    if (iconRef.current) {
        const rect = iconRef.current.getBoundingClientRect();
        setTooltipPos({ top: rect.top, left: rect.left });
    }
    }, []);
    
    return (
        <div 
            className={`relative flex-1 w-full h-full text-primary text-center flex items-center justify-center border-2 
            ${!isFirst ? "border-t-0" : ""} 
            ${isSelected ? "bg-blue-500 text-white border-blue-700" : "bg-gray-200 border-gray-400"}`} 
            onClick={onClick}
        >
            <div className="flex flex-row items-center justify-center">
                {/* Image Wrapper to Ensure No Expansion */}
                <div className="w-16 h-16 flex items-center justify-center">
                    <img 
                        src={`pokemon_images/roster-${pokemonName.toLowerCase().replace(/\s+/g, '-')}.png`} 
                        className="w-auto h-auto max-w-full max-h-full object-contain"
                        alt={pokemonName}
                    />
                </div>

                {playerName ? playerName : placeHolderText}
            </div>

            {warning && (
                <div className="absolute top-2 right-2 group">
                    <div className="relative flex items-center justify-center">
                        {/* Warning Triangle Icon */}
                        <svg 
                            ref={iconRef}
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            fill="currentColor" 
                            className="w-5 h-5 text-yellow-500 cursor-pointer"
                            onMouseEnter={() => {
                                if (iconRef.current) {
                                    const rect = iconRef.current.getBoundingClientRect();
                                    setTooltipPos({ top: rect.top, left: rect.left });
                                }
                                setHovered(true);
                            }}
                            onMouseLeave={() => setHovered(false)}
                        >
                            <path d="M12 2L1 21h22L12 2Zm0 3.5L20.1 19H3.9L12 5.5ZM12 16a1.25 1.25 0 1 1 0-2.5A1.25 1.25 0 0 1 12 16Zm-1-4h2v-4h-2v4Z"/>
                        </svg>

                        {hovered && (
                            <TooltipPortal>
                                <div
                                    className="fixed z-[9999] w-48 bg-black text-white text-xs p-2 rounded-lg shadow-lg pointer-events-none"
                                    style={{
                                        top: tooltipPos.top -65,
                                        left: tooltipPos.left - 80
                                    }}
                                >
                                    {warning}
                                </div>
                            </TooltipPortal>
                        )}

                    </div>
                </div>
            )}
        </div>
    );
}


export default PlayerBox;