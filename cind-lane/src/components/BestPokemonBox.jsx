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

  const handleCardEnter = () => setCardHovered(true);
  const handleCardLeave = () => setTimeout(() => setCardHovered(false), 100);

  const handleIconEnter = () => setIconHovered(true);
  const handleIconLeave = () => setTimeout(() => setIconHovered(false), 100);

  return (
    <div className="relative overflow-visible">
      {/* Card */}
      <div
        ref={cardRef}
        className="relative p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 cursor-pointer h-full w-full max-w-xs mx-auto sm:max-w-sm md:max-w-md"
        onMouseEnter={handleCardEnter}
        onMouseLeave={handleCardLeave}
        aria-describedby="card-tooltip"
      >
<div className="relative w-full flex items-center">
  <svg
    ref={iconRef}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5 text-yellow-500 cursor-pointer absolute left-0 ml-2"
    onMouseEnter={handleIconEnter}
    onMouseLeave={handleIconLeave}
    aria-label="Warning icon"
  >
    <path d="M12 2L1 21h22L12 2Zm0 3.5L20.1 19H3.9L12 5.5ZM12 16a1.25 1.25 0 1 1 0-2.5A1.25 1.25 0 0 1 12 16Zm-1-4h2v-4h-2v4Z" />
  </svg>
  <p className="w-full text-center pl-8">Recommended Pick</p>
</div>


        

        {/* Scrollable Content */}
        <div className="overflow-hidden max-h-[400px] scroll-container">
          <img
            src={`pokemon_images/roster-${pokemonName.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-")}.png`}
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

      {/* Portal: Card tooltip */}
      {cardHovered && !iconHovered && (
  <TooltipPortal>
    <div
      id="card-tooltip"
      role="tooltip"
      className="bg-black text-white text-sm p-2 rounded-lg shadow-lg text-center z-[9999] pointer-events-none"
      style={{
        position: "absolute",
        top: Math.max(cardTooltipPos.top - 8, 8), // stays above the card, but doesn't go offscreen
        left: Math.min(
          Math.max(cardTooltipPos.left, 12), // clamps to left side
          window.innerWidth - 12 // clamps to right side
        ),
        transform: "translate(-50%, -100%)", // shift above and centered
        maxWidth: "90vw",
        wordWrap: "break-word",
      }}
    >
      Best Pokémon for this player to pick based on the given team
    </div>
  </TooltipPortal>
)}



      {/* Portal: Icon warning tooltip */}
      {iconHovered && (
        <TooltipPortal>
        <div
          role="tooltip"
          className="bg-black text-white text-sm rounded px-2 py-1 z-[9999] shadow text-center pointer-events-none"
          style={{
            position: "absolute",
            top: Math.max(iconTooltipPos.top - 4, 8), // 12px above icon, never above 8px from top
            left: iconTooltipPos.left + 10,
            transform: "translate(-50%, -100%)", // Move above the icon and center horizontally
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
