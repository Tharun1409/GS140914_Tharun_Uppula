import React, { useState } from "react";
import Sidebar from "../components/sidebarcomponent";
import StoreList from "../pages/storepage";
import { SkuStoreData, storeData, storeDatas } from "../data/storeData";
import "./homecomponent.css";
import SKUList from "./skupage";
import PlanningGrid from "./planningpage";
// import { PlanningData } from "../data/storeData";
import ChartsPage from "./chartspage";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';


const HomeComponent: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>("Store");

  const renderContent = () => {
    switch (selectedTab) {
      case "Store":
        return <StoreList data={storeData} />;
      case "SKU":
        return <SKUList data={SkuStoreData}/>;

        case "Planning":
         
          return  <PlanningGrid rowData={storeDatas} />
          

      case "Charts":
        return <ChartsPage/>;
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
