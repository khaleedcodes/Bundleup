import { SideBarLinkProps } from "../../types/types";
function SideBarLink({ switchTab, tabName, currentTab }: SideBarLinkProps) {
  const isActive = currentTab === tabName;
  return (
    <div
      className={`cursor-pointer pl-2 ${
        isActive
          ? "border-l-2 border-new-main-2 font-semibold bg-[rgb(90,24,154,0.3)] p-1"
          : ""
      }`}
      onClick={() => {
        switchTab(tabName);
      }}
    >
      {tabName}
    </div>
  );
}

export default SideBarLink;
