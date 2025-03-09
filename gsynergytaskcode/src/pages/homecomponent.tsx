import React, { useState } from "react";
import Sidebar from "../components/sidebarcomponent";
import StoreList from "./storepage";
import { storeData } from "../data/storeData"; 
import "./homecomponent.module.css" // Ensure CSS is correctly linked

const HomeComponent: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState('Store');

    const renderPage = () => {
        switch (selectedTab) {
            case 'Store':
                return <StoreList data={storeData} />;
            case 'SKU':
                return <div>SKU Page Coming Soon!</div>;
            case 'Planning':
                return <div>Planning Page Coming Soon!</div>;
            default:
                return <StoreList data={storeData} />;
        }
    };

    return (
        <div className="homeContainer">
            <Sidebar setSelectedTab={setSelectedTab} />
            <div className="pageContent">
                {renderPage()}
            </div>
        </div>
    );
};

export default HomeComponent;
