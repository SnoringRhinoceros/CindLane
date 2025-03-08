import { useState } from "react";

export const useDraftTab = (defaultTab = "Team") => {
    const [activeTab, setActiveTab] = useState(defaultTab);

    const handleDraftTabClick = (text) => {
        if (text && activeTab !== text) {
            setActiveTab(text);
        }
    };

    return { activeTab, handleDraftTabClick };
};
