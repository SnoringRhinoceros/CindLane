import { useState, useRef, useEffect } from "react";
import TooltipPortal from "../portals/ToolTipPortal";
import StatFilterCheckbox from "./StatFilterCheckbox";

function BestPokemonBox({
  bestPokemon,
  heldItems,
  bestPokemonWarning,
  activeStatFilter,
  handleStatFilterClick,
  currentPokemon,
  expectedStats
}) {
  const pokemonName = bestPokemon.split(" (")[0];
  const pokemonWinRate = bestPokemon.split(" (")[1].slice(0, -1);

  const [cardHovered, setCardHovered] = useState(false);
  const [iconHovered, setIconHovered] = useState(false);
  const [currentIconHovered, setCurrentIconHovered] = useState(false); // ⬅️ New state

  const [cardTooltipPos, setCardTooltipPos] = useState({ top: 0, left: 0 });
  const [iconTooltipPos, setIconTooltipPos] = useState({ top: 0, left: 0 });
  const [currentIconTooltipPos, setCurrentIconTooltipPos] = useState({ top: 0, left: 0 }); // ⬅️ New

  const cardRef = useRef(null);
  const iconRef = useRef(null);
  const currentIconRef = useRef(null); // ⬅️ New ref

  useEffect(() => {
    if (cardHovered && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setCardTooltipPos({
        top: rect.top + window.scrollY,
        left: rect.left + rect.width / 2 + window.scrollX,
      });
    }
  }, [cardHovered]);

  useEffect(() => {
    if (iconHovered && iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      setIconTooltipPos({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [iconHovered]);

  useEffect(() => {
    if (currentIconHovered && currentIconRef.current) {
      const rect = currentIconRef.current.getBoundingClientRect();
      setCurrentIconTooltipPos({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [currentIconHovered]);

  const handleCardEnter = () => setCardHovered(true);
  const handleCardLeave = () => setTimeout(() => setCardHovered(false), 100);
  const handleIconEnter = () => setIconHovered(true);
  const handleIconLeave = () => setTimeout(() => setIconHovered(false), 100);
  const handleCurrentIconEnter = () => setCurrentIconHovered(true);
  const handleCurrentIconLeave = () => setTimeout(() => setCurrentIconHovered(false), 100);

  const showRecommended = activeStatFilter === "Recommended Pick";
  const showCurrent = activeStatFilter === "Current Pick";

  const name = showRecommended
    ? pokemonName
    : currentPokemon?.name || "Unknown";

  const imageUrl = `pokemon_images/roster-${name
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")}.png`;

  const items = showRecommended ? heldItems : currentPokemon?.heldItems || [];

  return showRecommended || showCurrent ? (
    <div>
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
            {showRecommended && (
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
            )}

            {showCurrent && currentPokemon?.gamesWithPokemon === 0 && (
              <svg
                ref={currentIconRef}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-yellow-500 cursor-pointer absolute left-0 ml-2"
                onMouseEnter={handleCurrentIconEnter}
                onMouseLeave={handleCurrentIconLeave}
                aria-label="Current warning icon"
              >
                <path d="M12 2L1 21h22L12 2Zm0 3.5L20.1 19H3.9L12 5.5ZM12 16a1.25 1.25 0 1 1 0-2.5A1.25 1.25 0 0 1 12 16Zm-1-4h2v-4h-2v4Z" />
              </svg>
            )}

            <div className="w-full text-center pl-8 rounded">
              <StatFilterCheckbox
                texts={["Recommended Pick", "Current Pick"]}
                handleClick={handleStatFilterClick}
              />
            </div>
          </div>

          {/* Card Content */}
          <div className="overflow-hidden max-h-[400px] scroll-container">
            <img
              src={imageUrl}
              alt={name}
              className="w-24 h-24 mx-auto object-contain"
            />

            <div className="flex justify-center gap-2 mt-4">
              {items.map((item, index) => (
                <img
                  key={index}
                  src={`held_item_images/${item.replace(/\s+/g, "-")}.png`}
                  alt={item}
                  className="w-10 h-10 object-contain"
                />
              ))}
            </div>

            {/* Stats */}
            <div className="text-center mt-4">
              {showRecommended ? (
                <>
                  <p className="text-base font-medium">
                    Win Rate: {pokemonWinRate}
                  </p>
                  <p className="text-base font-medium">
                    Expected Kills: {expectedStats?.kills ?? "?"}
                  </p>
                  <p className="text-base font-medium">
                    Expected Deaths: {expectedStats?.deaths ?? "?"}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-base font-medium">
                    Win Rate: {currentPokemon?.winRate ?? "?"}
                  </p>
                  <p className="text-base font-medium">
                    Pick Rate: {currentPokemon?.pickRate ?? "?"}
                  </p>
                  <p className="text-base font-medium">
                    Avg Score: {currentPokemon?.avgScore ?? "?"}
                  </p>
                </>
              )}
            </div>

          </div>
        </div>

        {/* Tooltip: Recommended Pick hover */}
        {showRecommended && cardHovered && !iconHovered && (
          <TooltipPortal>
            <div
              id="card-tooltip"
              role="tooltip"
              className="bg-black text-white text-sm p-2 rounded-lg shadow-lg text-center z-[9999] pointer-events-none"
              style={{
                position: "absolute",
                top: Math.max(cardTooltipPos.top - 8, 8),
                left: Math.min(
                  Math.max(cardTooltipPos.left, 12),
                  window.innerWidth - 12
                ),
                transform: "translate(-50%, -100%)",
                maxWidth: "90vw",
                wordWrap: "break-word",
              }}
            >
              Best Pokémon for this player to pick based on the given team
            </div>
          </TooltipPortal>
        )}

        {/* Tooltip: Recommended warning icon */}
        {showRecommended && iconHovered && (
          <TooltipPortal>
            <div
              role="tooltip"
              className="bg-black text-white text-sm rounded px-2 py-1 z-[9999] shadow text-center pointer-events-none"
              style={{
                position: "absolute",
                top: Math.max(iconTooltipPos.top - 4, 8),
                left: iconTooltipPos.left + 10,
                transform: "translate(-50%, -100%)",
              }}
            >
              {bestPokemonWarning}
            </div>
          </TooltipPortal>
        )}

        {/* Tooltip: Current warning icon */}
        {showCurrent && currentPokemon?.gamesWithPokemon === 0 && currentIconHovered && (
          <TooltipPortal>
            <div
              role="tooltip"
              className="bg-black text-white text-sm rounded px-2 py-1 z-[9999] shadow text-center pointer-events-none"
              style={{
                position: "absolute",
                top: Math.max(currentIconTooltipPos.top - 4, 8),
                left: currentIconTooltipPos.left + 10,
                transform: "translate(-50%, -100%)",
              }}
            >
              {"This player has never played this Pokemon so no stats are shown"}
            </div>
          </TooltipPortal>
        )}
      </div>
    </div>
  ) : null;
}

export default BestPokemonBox;
