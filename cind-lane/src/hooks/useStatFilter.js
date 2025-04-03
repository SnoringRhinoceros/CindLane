import { useState } from "react";

export const useStatFilter = (defaultStatFilter = "Current") => {
    const [activeStatFilter, setActiveStatFilter] = useState(defaultStatFilter);

    const handleStatFilterClick = (text) => {
        if (text && activeStatFilter !== text) {
            setActiveStatFilter(text);
        }
    };

    return { activeStatFilter, handleStatFilterClick };
};
