import { useState, useRef, useEffect } from "react";
import TooltipPortal from "../portals/ToolTipPortal";

function BestPokemonBox({ bestPokemon, heldItems, bestPokemonWarning }) {
  const pokemonName = bestPokemon.split(" (")[0];
  const pokemonWinRate = bestPokemon.split(" (")[1].slice(0, -1);

  const [cardHovered, setCardHovered] = useState(false);
  const [iconHovered, setIconHovered] = useState(false);

  const [cardTooltipPos, setCardTooltipPos] = useState({ top: 0, left: 0 });
  const [iconTooltipPos, setIconTooltipPos] = useState({ top: 0, left: 0 });

  const cardRef = useRef(null);
  const iconRef = useRef(null);

  // Card tooltip position
  useEffect(() => {
    if (cardHovered && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setCardTooltipPos({
        top: rect.top + window.scrollY,
        left: rect.left + rect.width / 2 + window.scrollX,
      });
    }
  }, [cardHovered]);

  // Icon tooltip position
  useEffect(() => {
    if (iconHovered && iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      setIconTooltipPos({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [iconHovered]);

  return (
    <div className="relative overflow-visible">
      {/* Card */}
      <div
        ref={cardRef}
        className="relative p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 cursor-pointer h-full w-full max-w-xs mx-auto sm:max-w-sm md:max-w-md"
        onMouseEnter={() => setCardHovered(true)}
        onMouseLeave={() => setCardHovered(false)}
      >
        {/* Icon with hover logic */}
        <svg
          ref={iconRef}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5 text-yellow-500 cursor-pointer"
          onMouseEnter={() => setIconHovered(true)}
          onMouseLeave={() => setIconHovered(false)}
        >
          <path d="M12 2L1 21h22L12 2Zm0 3.5L20.1 19H3.9L12 5.5ZM12 16a1.25 1.25 0 1 1 0-2.5A1.25 1.25 0 0 1 12 16Zm-1-4h2v-4h-2v4Z" />
        </svg>

        {/* Scrollable Content */}
        <div className="overflow-hidden max-h-[400px] scroll-container">
          <img
            src={`pokemon_images/roster-${pokemonName.toLowerCase().replace(/\s+/g, "-")}.png`}
            alt={pokemonName}
            className="w-24 h-24 mx-auto object-contain"
          />

          <div className="flex justify-center gap-2 mt-4">
            {heldItems.map((item, index) => (
              <img
                key={index}
                src={`held_item_images/${item.replace(/\s+/g, "-")}.png`}
                alt={item}
                className="w-10 h-10 object-contain"
              />
            ))}
          </div>

          <p className="text-lg font-semibold text-center mt-2">{pokemonWinRate}</p>
        </div>
      </div>

      {/* Portal: Show "asdf" tooltip only if card is hovered and icon is not hovered */}
      {cardHovered && !iconHovered && (
        <TooltipPortal>
          <div
            className="bg-black text-white text-sm p-2 rounded-lg shadow-lg min-w-max text-center z-[9999] pointer-events-none"
            style={{
              position: "absolute",
              top: cardTooltipPos.top - 8,
              left: cardTooltipPos.left,
              transform: "translate(-50%, -100%)",
            }}
          >
            asdf
          </div>
        </TooltipPortal>
      )}

      {/* Portal: Icon warning tooltip */}
      {iconHovered && (
        <TooltipPortal>
          <div
            className="bg-black text-white text-sm rounded px-2 py-1 z-[9999] shadow text-center"
            style={{
              top: iconTooltipPos.top - 50,
              left: iconTooltipPos.left + 12,
              transform: "translateX(-50%)",
              position: "absolute",
            }}
          >
            {bestPokemonWarning}
          </div>
        </TooltipPortal>
      )}
    </div>
  );
}

export default BestPokemonBox;
