function BestPokemonBox({ bestPokemon, heldItems }) {
    const pokemonName = bestPokemon.split(" (")[0];
    const pokemonWinRate = bestPokemon.split(" (")[1].slice(0, -1);
  
    return (
      <div className="relative group p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 cursor-pointer h-full w-full max-w-xs mx-auto sm:max-w-sm md:max-w-md">
        <p className="text-lg font-semibold text-center mt-2">Recommended Pick</p>
  
        <img
          src={`pokemon_images/roster-${pokemonName.toLowerCase().replace(/\s+/g, '-')}.png`}
          alt={pokemonName}
          className="w-24 h-24 mx-auto object-contain"
        />
  
        <div className="flex justify-center gap-2 mt-4">
          {heldItems.map((item, index) => (
            <img
              key={index}
              src={`held_item_images/${item.replace(/\s+/g, '-')}.png`}
              alt={item}
              className="w-10 h-10 object-contain"
            />
          ))}
            </div>
            
            <p className="text-lg font-semibold text-center mt-2">{pokemonWinRate}</p>

      </div>
    );
  }
  
  export default BestPokemonBox;
  