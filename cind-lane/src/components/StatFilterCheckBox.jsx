function StatFilterCheckBox({ texts, activeText, handleClick }) {
    const currentIndex = texts.indexOf(activeText);
  
    const handleButtonClick = () => {
      const nextIndex = (currentIndex + 1) % texts.length;
      handleClick(texts[nextIndex]);
    };
  
    return (
      <button
        className={`text-primary border rounded-md transition-colors 
          bg-white p-2 hover:bg-gray-100 w-48 text-center`}
        onClick={handleButtonClick}
      >
        {texts[currentIndex]}
      </button>
    );
  }
  
  export default StatFilterCheckBox;
  