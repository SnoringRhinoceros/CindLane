function MiniStatBox({ text, stat, description }) {
  return (
      <div className="relative group p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 cursor-pointer h-full w-full max-w-xs mx-auto sm:max-w-sm md:max-w-md">
          {/* Tooltip with better positioning for mobile */}
          <div className="absolute left-1/2 bottom-full w-48 -translate-x-1/2 bg-black text-white text-sm p-2 rounded-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 shadow-lg min-w-max text-center z-9">
              {description}
          </div>

          <p className="text-base sm:text-lg font-semibold text-center">{text}</p>
          <p className="text-xl sm:text-2xl font-bold text-center">{stat}</p>
      </div>
  );
}

export default MiniStatBox;
