function MiniStatBox({ text, stat, description }) {
    return (
      <div className="relative group p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 cursor-pointer h-full w-full">
        <div className="absolute left-1/2 bottom-full w-48 -translate-x-1/2 bg-black text-white text-sm p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg">
          {description}
        </div>
            
        <p className="text-lg font-semibold">{text}</p>
        <p className="text-2xl font-bold">{stat}</p>
      </div>
    );
  }
  
  export default MiniStatBox;
  