"use client"

import React, { useState } from 'react';
import style from "./style.module.scss";
import FilterCheckbox from '../Filter/Filter';
import Dropdown from '../Dropdown/Dropdown';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <div className={style.container}>
      {/* Sidebar */}
      <div className={`${style.sidebar} ${isOpen ? style.open : style.closed}`}>
        {/* Sidebar content */}
        <div id="sidebar-content" tabIndex={-1} className={style.sidebarContent}>
            <Dropdown/>
          <FilterCheckbox />
        </div>
      </div>
      {/* Main content */}
      <div className={`${style.mainContent} ${isOpen ? style.shifted : ''}`}>
        {/* Button to toggle sidebar */}
        <div className={style.toggleButton}>
          <button
            className={style.button}
            onClick={toggleSidebar}
            aria-expanded={isOpen}
            aria-controls="sidebar-content">
            {isOpen ? 'Close Filter' : 'Open Filter'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
