// import AccountSettings from "../AccountSettings";
// import Analytics from "../Analytics";
import ProfileForm from "../ProfileForm";
// import ThemeToggle from "../ThemeToggle";
function AccountScreen() {
  return (
    <div className="h-full overflow-y-scroll scrollbar-hidden-until-overflow flex justify-center items-center">
      <div className="h-[90%] w-full max-w-[800px] flex flex-col gap-8">
        <ProfileForm />
        {/* <ThemeToggle />
        <Analytics />
        <AccountSettings /> */}
      </div>
    </div>
  );
}

export default AccountScreen;
