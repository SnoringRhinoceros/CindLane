function BestPokemonBox({ bestPokemon }) {
    const imagePath = `/roster-${bestPokemon.toLowerCase()}.png`;
  
    return (
      <div className="relative group p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 cursor-pointer h-full w-full max-w-xs mx-auto sm:max-w-sm md:max-w-md">
        <img
          src={imagePath}
          alt={bestPokemon}
          className="w-24 h-24 mx-auto object-contain"
        />
        <p className="text-lg font-semibold text-center mt-2">{bestPokemon}</p>
      </div>
    );
  }
  
  export default BestPokemonBox;
  