import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { validateEmail, validatePassword, validateFullName } from "../../utils/helper";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";

const Signup = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const {updateUser} = useContext(UserContext);
  const navigate = useNavigate();

  //Handle Signup form submission
  const handleSignup = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setError("");

    // Placeholder for profile image URL after upload
    let profileImageUrl = "";


    // Trim whitespace from inputs
    const trimmedFullName = fullName.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // Validate full name
    const nameValidation = validateFullName(trimmedFullName);
    if (!nameValidation.isValid) {
      setError(nameValidation.message);
      return;
    }

    // Validate email
    if (!validateEmail(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Validate password
    const passwordValidation = validatePassword(trimmedPassword);
    if (!passwordValidation.isValid) {
      setError(passwordValidation.message);
      return;
    }

    // All validations passed
    try {
      console.log("Signup attempt with:", { 
        fullName: trimmedFullName, 
        email: trimmedEmail, 
        password: trimmedPassword,
        profilePic 
      });
      
      //Upload image if present
      if(profilePic){
        const imgUploadsRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadsRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: trimmedFullName,
        email: trimmedEmail,
        password: trimmedPassword,
        profileImageUrl: profileImageUrl,
      });

      const {token} = response.data;

      if(token){
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
      
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black mb-1">Create Account</h3>
      <p className="text-xs text-slate-700 mb-6">
        Join us today by entering your details below.
      </p>

      <form onSubmit={handleSignup} className="space-y-4">
        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

        <Input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          type="text"
          label="Full Name"
          placeholder="Enter your full name"
          required
        />

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
          placeholder="Min 8 chars, 1 uppercase, 1 number, 1 special char"
          required
        />

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button type="submit" className="btn-primary hover:bg-orange-500 transition-colors duration-300">
          Sign Up
        </button>

        <p className="text-[13px] text-slate-800 text-center">
          Already have an account?{" "}
          <button 
            type="button"
            className="font-medium text-orange-400 underline cursor-pointer hover:text-orange-500 transition-colors duration-200" 
            onClick={() => setCurrentPage("login")}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default Signup;
