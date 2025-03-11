import React from "react";
import { FaStore, FaBox, FaProjectDiagram, FaChartBar, FaTrash } from "react-icons/fa";

import styles from "./sidebar.module.css";

interface SidebarProps {
  setSelectedTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setSelectedTab }) => {
  const [activeTab, setActiveTab] = React.useState("Store");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setSelectedTab(tab);
  };

  return (
    <div className={styles.sidebar}>
      <ul>
        <li
          className={`${styles.tab} ${activeTab === "Store" ? styles.active : ""}`}
          onClick={() => handleTabClick("Store")}
        >
          <FaStore /> Store
        </li>
        <li
          className={`${styles.tab} ${activeTab === "SKU" ? styles.active : ""}`}
          onClick={() => handleTabClick("SKU")}
        >
          <FaBox /> SKU
        </li>
        <li
          className={`${styles.tab} ${activeTab === "Planning" ? styles.active : ""}`}
          onClick={() => handleTabClick("Planning")}
        >
          <FaProjectDiagram /> Planning
        </li>
        <li
          className={`${styles.tab} ${activeTab === "charts" ? styles.active : ""}`}
          onClick={() => handleTabClick("charts")}
        >
          <FaChartBar /> Charts
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
