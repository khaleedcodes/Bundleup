import { useState } from "react";
import ArrowIcon from "../../assets/icons/ArrowIcon";
import FeatureCardList from "./FeatureCardList";
import { Link } from "react-router-dom";
function FeaturesSection() {
  const [isHover, setIsHover] = useState(false);
  function setIsHoverFalse() {
    setIsHover(false);
  }
  function setIsHoverTrue() {
    setIsHover(true);
  }
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-16"
      onMouseEnter={() => {
        setIsHoverTrue();
      }}
      onMouseLeave={() => {
        setIsHoverFalse();
      }}
    >
      <h1 className="text-5xl max-sm:text-3xl font-bold text-center">
        <span className="text-third-blue">Bundle</span> your{" "}
        <span className="text-second-blue">bits</span> with awesome tools
      </h1>
      <FeatureCardList />
      <Link
        to="/b/signup"
        className="flex gap-[1px] transition-all duration-300 text-white p-4 text-lg pl-4 pr-4 rounded-full font-bold bg-third-blue hover:bg-second-blue w-[220px] items-center justify-center"
      >
        Continue
        <ArrowIcon
          isHover={isHover}
          setIsHoverTrue={setIsHoverTrue}
          setIsHoverFalse={setIsHoverFalse}
        />
      </Link>
    </div>
  );
}

export default FeaturesSection;
