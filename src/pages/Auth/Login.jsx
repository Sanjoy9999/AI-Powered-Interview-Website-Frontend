import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail, validatePassword } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const {updateUser} = useContext(UserContext);
  //Handle Login Form Submit
  const handleLogin = async (e) => {
    e.preventDefault();

    // Clear previous errors and set loading state
    setError("");
    setIsLoading(true);

    // Trim whitespace from inputs
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // Validate email
    if (!validateEmail(trimmedEmail)) {
      setError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    // Validate password
    const passwordValidation = validatePassword(trimmedPassword);
    if (!passwordValidation.isValid) {
      setError(passwordValidation.message);
      setIsLoading(false);
      return;
    }

    //Login API Call
    try {
      // Avoid logging passwords in console (security/privacy). Keep minimal diagnostic if needed.
      console.debug("Login attempt (email only):", trimmedEmail);

      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email: trimmedEmail,
        password: trimmedPassword,
      });

      console.debug("Login response received:", response.status);
      
      const {token} = response.data;

      if(token){
        // Store token first
        localStorage.setItem("token", token);
        
        // Update user context with logged-in user data
        updateUser(response.data);
        
        // Small delay to ensure context updates before navigation
        setTimeout(() => {
          navigate("/dashboard");
        }, 100);
      } else {
        setError("Invalid login response - missing token");
      }    
      
    } catch (error) {
      console.error("Login error details:", error);
      
      if (error.response) {
        // Server responded with an error status
        setError(error.response.data.message || `Server error: ${error.response.status}`);
      } else if (error.request) {
        // Request was made but no response received (network issue)
        setError("Network error: No response from server. Please check your connection.");
      } else {
        // Something else caused the request to fail
        setError(`Error: ${error.message || "Unknown error occurred"}`);
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-[500px] p-4 sm:p-6 md:p-7 flex flex-col justify-center mx-auto">
      <h3 className="text-base sm:text-lg md:text-xl font-semibold text-black mb-1">Welcome Back</h3>
      <p className="text-xs sm:text-sm text-slate-700 mb-4 sm:mb-6">
        Please enter your details to login
      </p>

      <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          label="Email"
          placeholder="Enter your email"
          required
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          label="Password"
          placeholder="Enter your password"
          required
        />

        {error && <p className="text-red-500 text-xs sm:text-sm pb-2.5 break-words">{error}</p>}
        
        <button 
          type="submit" 
          disabled={isLoading}
          className={`btn-primary hover:bg-orange-500 transition-colors duration-300 w-full text-sm sm:text-base ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        <p className="text-xs sm:text-[13px] text-slate-800 text-center pt-2">
          Don't have an account?{" "}
          <button 
            type="button"
            className="font-medium text-orange-400 underline cursor-pointer hover:text-orange-500 transition-colors duration-200" 
            onClick={() => setCurrentPage("signup")}
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
