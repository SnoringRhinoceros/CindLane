import { useState } from "react";

function StatFilterCheckbox({ texts, handleClick }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleButtonClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        const currentText = texts[currentIndex];
        handleClick(currentText);
        console.log(currentText);     
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

export default StatFilterCheckbox;
