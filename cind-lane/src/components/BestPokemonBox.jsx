import { useState, useRef, useEffect } from "react";
import TooltipPortal from "../portals/ToolTipPortal";
import StatFilterCheckbox from "./StatFilterCheckbox";

function BestPokemonBox({
  bestPokemon,
  recommendedHeldItems,
  currentHeldItems,
  bestPokemonWarning,
  activeStatFilter,
  handleStatFilterClick,
  currentPokemon,
  expectedStats,
  fallbackReason,
}) {
  const pokemonName = bestPokemon.split(" (")[0];
  const pokemonWinRate = bestPokemon.split(" (")[1]?.slice(0, -1) ?? "N/A";

  const [iconHovered, setIconHovered] = useState(false);
  const [currentIconHovered, setCurrentIconHovered] = useState(false);
  const [fallbackIconHovered, setFallbackIconHovered] = useState(false);
  const [recommendedHovered, setRecommendedHovered] = useState(false);

  const [iconTooltipPos, setIconTooltipPos] = useState({ top: 0, left: 0 });
  const [currentIconTooltipPos, setCurrentIconTooltipPos] = useState({ top: 0, left: 0 });
  const [fallbackIconTooltipPos, setFallbackIconTooltipPos] = useState({ top: 0, left: 0 });
  const [recommendedTooltipPos, setRecommendedTooltipPos] = useState({ top: 0, left: 0 });

  const iconRef = useRef(null);
  const currentIconRef = useRef(null);
  const fallbackIconRef = useRef(null);
  const recommendedRef = useRef(null);

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

  useEffect(() => {
    if (fallbackIconHovered && fallbackIconRef.current) {
      const rect = fallbackIconRef.current.getBoundingClientRect();
      setFallbackIconTooltipPos({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [fallbackIconHovered]);

  useEffect(() => {
    if (recommendedHovered && recommendedRef.current) {
      const rect = recommendedRef.current.getBoundingClientRect();
      setRecommendedTooltipPos({
        top: rect.top + window.scrollY,
        left: rect.left + rect.width / 2 + window.scrollX,
      });
    }
  }, [recommendedHovered]);

  const handleIconEnter = () => setIconHovered(true);
  const handleIconLeave = () => setTimeout(() => setIconHovered(false), 100);
  const handleCurrentIconEnter = () => setCurrentIconHovered(true);
  const handleCurrentIconLeave = () => setTimeout(() => setCurrentIconHovered(false), 100);
  const handleFallbackIconEnter = () => setFallbackIconHovered(true);
  const handleFallbackIconLeave = () => setTimeout(() => setFallbackIconHovered(false), 100);

  const showRecommended = activeStatFilter === "Recommended Pick";
  const showCurrent = activeStatFilter === "Current Pick";

  const name = showRecommended
    ? pokemonName
    : currentPokemon?.name || "Unknown";

  const imageUrl = `pokemon_images/roster-${name
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")}.png`;

  const items = showRecommended ? recommendedHeldItems : currentHeldItems || [];

  return showRecommended || showCurrent ? (
    <div>
      <div className="relative overflow-visible">
        {/* Card */}
        <div className="relative p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 cursor-pointer h-full w-full max-w-xs mx-auto sm:max-w-sm md:max-w-md">
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
              {showRecommended ? (
                <span
                  ref={recommendedRef}
                  onMouseEnter={() => setRecommendedHovered(true)}
                  onMouseLeave={() => setTimeout(() => setRecommendedHovered(false), 100)}
                >
                  <StatFilterCheckbox
  texts={["Recommended Pick", "Current Pick"]}
  activeText={activeStatFilter}
  handleClick={handleStatFilterClick}
/>

                </span>
              ) : (
                <StatFilterCheckbox
  texts={["Recommended Pick", "Current Pick"]}
  activeText={activeStatFilter}
  handleClick={handleStatFilterClick}
/>

              )}
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

            <div className="relative mt-4 px-2">
              {showCurrent && fallbackReason && (
                <div className="absolute top-0 right-0">
                  <svg
                    ref={fallbackIconRef}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-blue-500 cursor-pointer"
                    onMouseEnter={handleFallbackIconEnter}
                    onMouseLeave={handleFallbackIconLeave}
                    aria-label="Fallback info icon"
                  >
                    <path d="M12 2a10 10 0 1 0 0.001 20.001A10 10 0 0 0 12 2zm0 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm1-4h-2v-5h2v5z" />
                  </svg>
                </div>
              )}

              <div className="text-center">
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
        </div>

        {/* Tooltip for Recommended Button */}
        {showRecommended && recommendedHovered && (
          <TooltipPortal>
            <div
              id="recommended-tooltip"
              role="tooltip"
              className="bg-black text-white text-sm p-2 rounded-lg shadow-lg text-center z-[9] pointer-events-none"
              style={{
                position: "absolute",
                top: Math.max(recommendedTooltipPos.top - 8, 8),
                left: Math.min(Math.max(recommendedTooltipPos.left, 12), window.innerWidth - 12),
                transform: "translate(-50%, -100%)",
                maxWidth: "90vw",
                wordWrap: "break-word",
              }}
            >
              Best Pokémon for this player to pick based on the given team
            </div>
          </TooltipPortal>
        )}

        {/* Tooltip: Recommended Warning Icon */}
        {showRecommended && iconHovered && (
          <TooltipPortal>
            <div
              role="tooltip"
              className="bg-black text-white text-sm rounded px-2 py-1 z-[9] shadow text-center pointer-events-none"
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

        {/* Tooltip: Current No Games Warning */}
        {showCurrent && currentPokemon?.gamesWithPokemon === 0 && currentIconHovered && (
          <TooltipPortal>
            <div
              role="tooltip"
              className="bg-black text-white text-sm rounded px-2 py-1 z-[9] shadow text-center pointer-events-none"
              style={{
                position: "absolute",
                top: Math.max(currentIconTooltipPos.top - 4, 8),
                left: currentIconTooltipPos.left + 10,
                transform: "translate(-50%, -100%)",
              }}
            >
              This player has never played this Pokémon, so no player stats are shown. Team Stats are based on average win rate.
            </div>
          </TooltipPortal>
        )}

        {/* Tooltip: Current Fallback Reason */}
        {showCurrent && fallbackReason && fallbackIconHovered && (
          <TooltipPortal>
            <div
              role="tooltip"
              className="bg-black text-white text-sm rounded px-2 py-1 z-[9] shadow text-center pointer-events-none"
              style={{
                position: "absolute",
                top: Math.max(fallbackIconTooltipPos.top - 4, 8),
                left: fallbackIconTooltipPos.left + 10,
                transform: "translate(-50%, -100%)",
                maxWidth: "90vw",
                wordWrap: "break-word",
              }}
            >
              {fallbackReason}
            </div>
          </TooltipPortal>
        )}
      </div>
    </div>
  ) : null;
}

export default BestPokemonBox;
