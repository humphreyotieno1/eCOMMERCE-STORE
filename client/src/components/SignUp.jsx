import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const validatePassword = (password) =>
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/.test(password);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    if (!validatePassword(password)) {
      setMessage("Password must be at least 8 characters long and include at least one number, one uppercase letter, one lowercase letter, and one special character.");
      return;
    }

    fetch("http://127.0.0.1:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_name:username, password:password, email:email }),
    })
      .then((resp) => {
        if (!resp.ok) {
          if (resp.status === 409) throw new Error("Username or email already exists");
          else throw new Error("Signup failed");
        }
        return resp.json();
      })
      .then(() => {
        setPassword("");
        setUsername("");
        setEmail("");
        setConfirmPassword("");
        setMessage("Signup successful!");
      })
      .catch((error) => setMessage(error.message));
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-blue-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full max-w-lg">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <h1 className="text-2xl text-center text-gray-800 mb-4">Create Account</h1>
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
                  <label htmlFor="email" className="block text-gray-800 text-sm font-bold mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                    value={email}
                    onChange={handleEmailChange}
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
                <div className="mb-6">
                  <label htmlFor="confirmPassword" className="block text-gray-800 text-sm font-bold mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="confirmPassword"
                      placeholder="••••••••"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
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
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="bg-gray-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                  >
                    Sign up
                  </button>
                </div>
                <p className="text-center mt-4 text-black">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-500 hover:text-blue-700">
                    Sign in
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

export default Signup;
