"use client";

import { useState, ReactNode } from "react";

type Tab = {
  label: string;
  content: ReactNode;
};

interface TabBarProps {
  tabs: Tab[];
  defaultIndex?: number;
}

const TabBar = ({ tabs, defaultIndex = 0 }: TabBarProps) => {
  const [activeTab, setActiveTab] = useState(defaultIndex);

  return (
    <div>
      <div className="flex justify-center mb-6">
        <div className="tab-bar-track">
          {tabs.map((tab, idx) => (
            <button
              key={tab.label}
              className={`tab-btn ${
                activeTab === idx ? "tab-btn-active" : "tab-btn-inactive"
              }`}
              onClick={() => setActiveTab(idx)}
              aria-pressed={activeTab === idx}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="animate-fadein">{tabs[activeTab].content}</div>
    </div>
  );
};

export default TabBar;
