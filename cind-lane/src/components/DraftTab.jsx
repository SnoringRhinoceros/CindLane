function DraftTab({ text, handleClick, isActive }) {
    return (
        <button
            className={`text-primary p-2 border rounded-md transition-colors 
                ${isActive ? "bg-primary border-primary" : "bg-white text-primary border-gray-300"} 
                hover:bg-gray-100`}
            onClick={() => handleClick(text)}
        >
            {text}
        </button>
    );
}

export default DraftTab;
