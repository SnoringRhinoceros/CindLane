function DraftTab({ text, handleClick, isActive }) {
    return (
        <button
            className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-full
                ${isActive 
                    ? "bg-white text-blue-600 shadow" 
                    : "text-white bg-transparent hover:bg-white/20"} 
                focus:outline-none focus:ring-0 active:outline-none`}
            onClick={() => handleClick(text)}
        >
            {text}
        </button>
    );
}


export default DraftTab;
