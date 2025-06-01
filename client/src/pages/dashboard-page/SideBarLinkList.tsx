import { SideBarLinkType } from "../../types/types";
import { SideBarLinkListProps } from "../../types/types";
import SideBarLink from "./SideBarLink";
const sideBarLinks: SideBarLinkType[] = [
  { tabName: "bundle" },
  // { tabName: "Account" },
];
import { useAuth } from "../../context/AuthContext";

function SideBarLinkList({ switchTab, currentTab }: SideBarLinkListProps) {
  const { logout } = useAuth();
  return (
    <div className="gap-4 flex flex-col max-md:flex-row max-md:items-center">
      {sideBarLinks.map(({ tabName }, index) => {
        return (
          <SideBarLink
            tabName={tabName}
            switchTab={switchTab}
            key={index}
            currentTab={currentTab}
          />
        );
      })}
      <div>
        <button
          className="bg-new-main-2 hover:bg-new-main-3 text-first-text-color font-medium rounded-lg px-5 py-1"
          onClick={() => {
            logout();
          }}
        >
          logout
        </button>
      </div>
    </div>
  );
}

export default SideBarLinkList;
