import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStore,
  faBox,
  faProjectDiagram,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";
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
        {[
          { name: "Store", icon: faStore },
          { name: "SKU", icon: faBox },
          { name: "Planning", icon: faProjectDiagram },
          { name: "Charts", icon: faChartBar },
        ].map(({ name, icon }) => (
          <li
            key={name}
            className={`${styles.tab} ${
              activeTab === name ? styles.active : ""
            }`}
            onClick={() => handleTabClick(name)}
            role="button"
            tabIndex={0}
          >
            <FontAwesomeIcon icon={icon} className={styles.icon} /> {name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
