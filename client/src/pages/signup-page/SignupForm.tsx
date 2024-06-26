import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function SignupForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    axios
      // .post("http://localhost:3001/signup", {
      // .post("https://bundleup-server.onrender.com/signup", {
      .post("https://bundleup-fullstack.onrender.com/signup", {
        email,
        username,
        password,
      })
      .then((result) => {
        console.log(result);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("submitted");
  }
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="p-4 flex flex-wrap-reverse flex-col items-center gap-8 grow max-w-2xl"
      >
        <h1 className="text-4xl font-bold text-center">
          Join{" "}
          <span className="text-third-blue">
            Bundle<span className="text-second-blue">up</span>
          </span>
        </h1>
        {/*email Field*/}
        <input
          className="bg-[#040F0F] w-full min-h-11 rounded-md outline-none border-none pl-10"
          type="email"
          placeholder="Email Address"
          autoComplete="off"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />

        {/*username Field*/}
        <input
          className="bg-[#040F0F] w-full min-h-11 rounded-md outline-none border-none pl-10"
          type="text"
          placeholder="Username"
          autoComplete="off"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
        />

        {/*Password Field*/}
        <input
          className="bg-[#040F0F] w-full min-h-11 rounded-md outline-none border-none pl-10"
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <button
          type="submit"
          className="bg-third-blue hover:bg-second-blue transition-all duration-150 p-3 text-white font-bold rounded-md w-full"
        >
          Create account
        </button>
        <div className="flex gap-4">
          <p>
            Already Have an Account?{" "}
            <a href="/login" className="font-bold text-third-blue">
              Log In
            </a>
          </p>
        </div>
      </form>
    </>
  );
}

export default SignupForm;
