import { useState } from "react";

function StatFilterCheckbox({ texts, handleClick }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleButtonClick = () => {
        const currentText = texts[(currentIndex+1) % texts.length];
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        console.log(currentText);
        handleClick(currentText);
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
