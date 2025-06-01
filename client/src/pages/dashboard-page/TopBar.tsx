import { SideBarProps } from "../../types/types";
import AvatarCard from "./AvatarCard";
import SideBarLinkList from "./SideBarLinkList";

function TopBar({ switchTab, currentTab }: SideBarProps) {
  return (
    <div className="h-full flex gap-8 p-4 w-full min-w-56 justify-between">
      <AvatarCard />
      <SideBarLinkList switchTab={switchTab} currentTab={currentTab} />
    </div>
  );
}

export default TopBar;
