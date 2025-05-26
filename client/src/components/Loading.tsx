import BundlebitLogoTransparent from "../assets/icons/BundlebitLogoTransparent";

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-first-primary">
      <div className="flex flex-col items-center gap-4">
        <BundlebitLogoTransparent/>
      </div>
    </div>
  );
}

export default Loading;
