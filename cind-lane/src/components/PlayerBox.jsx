import { useRef, useState, useEffect } from 'react';
import TooltipPortal from '../portals/ToolTipPortal';

function PlayerBox({ 
    isFirst, 
    playerName, 
    placeHolderText, 
    pokemonName, 
    isSelected, 
    onClick, 
    warning,
    heldItems = [] // Default to empty array
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

    const renderHeldItems = () => {
        const itemCircles = [];

        for (let i = 0; i < 3; i++) {
            const item = heldItems[i];
            
            itemCircles.push(
                <div key={i} className="w-6 h-6 rounded-full border border-gray-400 overflow-hidden bg-gray-300 flex items-center justify-center mx-0.5">
                    {item ? (
                        <img 
                            src={`held_item_images/${item.replace(/\s+/g, '-')}.png`} 
                            alt={item}
                            className="w-full h-full object-contain"
                        />
                    ) : null}
                </div>
            );
        }

        return (
            <div className="flex flex-row justify-center mb-1">
                {itemCircles}
            </div>
        );
    };

    return (
        <div 
            className={`relative flex-1 w-full h-full text-primary text-center flex items-center justify-center border-2 rounded-lg cursor-pointer transition-all duration-200 ease-in-out mb-2
            ${isSelected ? "bg-gray-400 text-white border-gray-500" : "bg-gray-200 border-gray-400"}`} 
            onClick={onClick}
        >
            <div className="flex flex-row items-center justify-center">
                {/* Pokémon Image on the left */}
                <div className="w-16 h-16 flex items-center justify-center">
                    {pokemonName && (
                        <img 
                            src={`pokemon_images/roster-${pokemonName.toLowerCase().replace(/\s+/g, '-')}.png`} 
                            className="w-auto h-auto max-w-full max-h-full object-contain"
                            alt={pokemonName}
                        />
                    )}
                </div>


                {/* Player Name & Held Items on the right */}
                <div className="flex flex-col items-center justify-center ml-2">
                    {renderHeldItems()}
                    <div className="text-2xl">
                        {playerName ? playerName : placeHolderText}
                    </div>
                </div>
            </div>

            {warning && (
                <div className="absolute top-2 right-2 group">
                    <div className="relative flex items-center justify-center">
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
                                        top: tooltipPos.top - 65,
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
