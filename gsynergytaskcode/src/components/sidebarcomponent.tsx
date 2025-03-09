import React from "react";
import "./sidebar.module.css"// Ensure CSS is linked properly

interface SidebarProps {
  setSelectedTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setSelectedTab }) => {
  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => setSelectedTab("Store")}>Store</li>
        <li onClick={() => setSelectedTab("SKU")}>SKU</li>
        <li onClick={() => setSelectedTab("Planning")}>Planning</li>
      </ul>
    </div>
  );
};

export default Sidebar;
