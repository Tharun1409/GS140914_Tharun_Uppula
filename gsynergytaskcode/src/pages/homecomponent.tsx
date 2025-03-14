import React, { useState } from "react";
import Sidebar from "../components/sidebarcomponent";
import StoreList from "../pages/storepage";
import {
  ChartData,
  SkuStoreData,
  storeData,
  storeDatas,
} from "../data/storeData";   // imported storedata 

import "./homecomponent.css";
import SKUList from "./skupage";
import PlanningGrid from "./planningpage";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import ChartsPage from "./chartspage";

const HomeComponent: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>("Store");
// function to render the approriate component based on the selected tab
  const renderContent = () => {
    switch (selectedTab) {
      case "Store":
        return <StoreList data={storeData} />;
      case "SKU":
        return <SKUList data={SkuStoreData} />;

      case "Planning":
        return <PlanningGrid rowData={storeDatas} />;

      case "Charts":
        return <ChartsPage chartdatastore={ChartData} />;

      default:
        return <StoreList data={storeData} />;
    }
  };

  return (
    <div className="homeContainer">
      <Sidebar setSelectedTab={setSelectedTab} />
      <div className="pageContent">{renderContent()}</div>
    </div>
  );
};

export default HomeComponent;
