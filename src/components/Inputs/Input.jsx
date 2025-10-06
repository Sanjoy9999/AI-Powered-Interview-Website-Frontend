import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, type, label, placeholder, required }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-3 sm:mb-4">
      <label className="block text-xs sm:text-[13px] text-slate-800 mb-1.5 sm:mb-2 font-medium">
        {label}
      </label>

      <div className="relative flex items-center border border-gray-300 rounded-lg px-3 py-2 sm:py-3 focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500 transition-all duration-200 bg-white">
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400 text-xs sm:text-sm"
          value={value}
          onChange={(e) => onChange(e)}
          required={required}
        />

        {type === "password" && (
          <>
            {showPassword ? (
              <FaRegEye
                size={18}
                className="text-orange-500 cursor-pointer hover:text-orange-600 transition-colors duration-200 ml-2 flex-shrink-0"
                onClick={toggleShowPassword}
              />
            ) : (
              <FaRegEyeSlash
                size={18}
                className="text-slate-400 cursor-pointer hover:text-slate-500 transition-colors duration-200 ml-2 flex-shrink-0"
                onClick={toggleShowPassword}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Input;
