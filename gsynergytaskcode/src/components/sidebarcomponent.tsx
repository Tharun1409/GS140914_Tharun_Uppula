import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore, faBox, faProjectDiagram, faChartBar } from "@fortawesome/free-solid-svg-icons";
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
          <FontAwesomeIcon icon={faStore} style={{ marginRight: "8px" }} /> Store
        </li>
        <li
          className={`${styles.tab} ${activeTab === "SKU" ? styles.active : ""}`}
          onClick={() => handleTabClick("SKU")}
        >
          <FontAwesomeIcon icon={faBox} style={{ marginRight: "8px" }} /> SKU
        </li>
        <li
          className={`${styles.tab} ${activeTab === "Planning" ? styles.active : ""}`}
          onClick={() => handleTabClick("Planning")}
        >
          <FontAwesomeIcon icon={faProjectDiagram} style={{ marginRight: "8px" }} /> Planning
        </li>
        <li
          className={`${styles.tab} ${activeTab === "Charts" ? styles.active : ""}`}
          onClick={() => handleTabClick("Charts")}
        >
          <FontAwesomeIcon icon={faChartBar} style={{ marginRight: "8px" }} /> Charts
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
