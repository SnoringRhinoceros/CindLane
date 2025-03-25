export default function PlayerBox({ 
    isFirst, 
    playerName, 
    placeHolderText, 
    pokemonName, 
    isSelected, 
    onClick, 
    warning 
}) {
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
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            fill="currentColor" 
                            className="w-5 h-5 text-yellow-500 cursor-pointer"
                        >
                            <path d="M12 2L1 21h22L12 2Zm0 3.5L20.1 19H3.9L12 5.5ZM12 16a1.25 1.25 0 1 1 0-2.5A1.25 1.25 0 0 1 12 16Zm-1-4h2v-4h-2v4Z"/>
                        </svg>

                        {/* Tooltip (Appears on Hover) */}
                        <div className="absolute left-1/2 z-60 bottom-full mb-2 w-48 -translate-x-1/2 bg-black text-white text-xs p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg">
                            {warning}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
