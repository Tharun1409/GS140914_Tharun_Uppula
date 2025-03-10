import React, { useState } from "react";
import Sidebar from "../components/sidebarcomponent";
import StoreList from "../pages/storepage";
import { storeData } from "../data/storeData";
import "./homecomponent.css";

const HomeComponent: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>("Store");

  const renderContent = () => {
    switch (selectedTab) {
      case "Store":
        return <StoreList data={storeData} />;
      case "SKU":
        return <div>SKU Content</div>;
      case "Planning":
        return <div>Planning Content</div>;
      case "Charts":
        return <div>Charts Content</div>;
      default:
        return <StoreList data={storeData} />;
    }
  };

  return (
    <div className="homeContainer">
      <Sidebar setSelectedTab={setSelectedTab} />
      <div className="pageContent">
        {renderContent()}
      </div>
    </div>
  );
};

export default HomeComponent;
