import AccountScreen from "./AccountScreen";
import MyBundleScreen from "./bundle-screen/MyBundleScreen";

function RenderScreen({ tab }: { tab: string }) {
  switch (tab) {
    case "bundle":
      return <MyBundleScreen />;
    case "Account":
      return <AccountScreen />;
  }
}

export default RenderScreen;
