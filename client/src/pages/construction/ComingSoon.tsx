import { Link } from "react-router-dom";
import comingSoonImage from "./coming-soon.png";

function ComingSoon() {
  return (
    <div className="p-3 w-screen h-screen flex flex-col gap-6 items-center justify-center ">
      <p className="text-lg font-bold text-center">
        We're hard at work building something awesome! Stay tuned for updates
        and exciting developments!
      </p>
      <img src={comingSoonImage} className="w-full h-full max-w-96 max-h-96" />
      <p className="dark:text-first-text-color text-second-text-color transition-colors duration-300 text-2xl font-bold">
        let's get you back{" "}
        <Link to="/" className="text-first-green">
          Home
        </Link>
      </p>
    </div>
  );
}

export default ComingSoon;
