import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRememberMeChange = () => setRememberMe(!rememberMe);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, rememberMe }),
    })
      .then((resp) => {
        if (!resp.ok) throw new Error("Login failed");
        return resp.json();
      })
      .then((data) => {
        if (data.access_token) {
          localStorage.setItem("access_token", data.access_token);
          setMessage("Login successful!");
          // Clear the input fields
          setPassword("");
          setUsername("");
          setRememberMe(false);
          setTimeout(() => setMessage(""), 3000); // Clear the message after 3 seconds
          onLogin(data.access_token);
        } else throw new Error("Token not found in response");
      })
      .catch((error) => {
        console.error(error);
        setMessage("Login failed. Please try again.");
        setTimeout(() => setMessage(""), 3000); // Clear the message after 3 seconds
      });
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-blue-100">
      <div className="container mx-auto px-4 py-5">
        <div className="flex justify-center">
          <div className="w-full max-w-lg">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <h1 className="text-2xl text-center text-gray-800 mb-4">Welcome Back !</h1>
              {message && (
                <p className={`text-center ${message.includes("successful") ? "text-blue-500" : "text-red-500"}`}>
                  {message}
                </p>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="username" className="block text-gray-800 text-sm font-bold mb-2">
                    Your Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-800 text-sm font-bold mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="••••••••"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                      value={password}
                      onChange={handlePasswordChange}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 px-2 flex items-center text-gray-700"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    className="mr-2"
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                  />
                  <label htmlFor="rememberMe" className="text-gray-800 text-sm">
                    Remember Me
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="bg-gray-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                  >
                    Sign in
                  </button>
                </div>
                <div className="text-center mt-4">
                  <Link to="/forgot-password" className="text-blue-500 hover:text-blue-700">
                    Forgot Password?
                  </Link>
                </div>
                <p className="text-center mt-4 text-black">
                  Don’t have an account yet?{" "}
                  <Link to="/signup" className="text-blue-500 hover:text-blue-700">
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
