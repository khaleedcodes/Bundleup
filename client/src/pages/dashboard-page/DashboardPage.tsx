import { TabType } from "../../types/types";
import { useState } from "react";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import RenderScreen from "./screens/RenderScreen";

function DashboardPage() {
  const [tab, setTab] = useState<TabType>("Account");
  function switchTab(tabName: TabType) {
    setTab(tabName);
  }
  return (
    <div className="flex w-full max-md:flex-col bg-first-primary text-second-primary min-h-screen">
      <div className="border-b border-b-first-section-divider md:hidden">
        <TopBar switchTab={switchTab} currentTab={tab} />
      </div>
      <div className="border-r border-r-first-section-divider max-md:hidden">
        <SideBar switchTab={switchTab} currentTab={tab} />
      </div>
      <div className="w-full p-10 max-sm:p-4">
        <RenderScreen tab={tab} />
      </div>
    </div>
  );
}

export default DashboardPage;
