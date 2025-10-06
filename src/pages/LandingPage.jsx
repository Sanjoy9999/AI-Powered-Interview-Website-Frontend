import React, { useContext } from "react";
import HEAD_IMG from "../assets/hero-img.png";
import { APP_FEATURES } from "../utils/data";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Modal from "../components/Modal";
import { UserContext } from "../context/userContext";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard";

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <>
      <div
        className="w-full min-h-full bg-[#f1e8bd]
      overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-amber-200/20 absolute top-0 left-0 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-32 sm:pb-40 md:pb-[200px] relative z-10">
          {/* Header */}
          <header className="flex justify-between items-center mb-8 sm:mb-12 md:mb-16">
            <div className="text-base sm:text-lg md:text-xl text-black font-bold">
              Interview Prep AI
            </div>
            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                className="bg-gradient-to-r from-[#FF9324] to-[#c99a4b] text-xs sm:text-sm font-semibold text-white px-4 sm:px-6 md:px-7 py-2 sm:py-2.5 rounded-full hover:bg-black hover:from-black hover:to-black border border-transparent transition-all duration-300 cursor-pointer transform hover:scale-105 whitespace-nowrap"
                onClick={() => setOpenAuthModal(true)}
              >
                <span className="hidden sm:inline">Login / Sign Up</span>
                <span className="sm:hidden">Login</span>
              </button>
            )}
          </header>

          {/* Hero Section */}
          <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
            {/* Left Content */}
            <div className="w-full md:w-1/2 space-y-4 sm:space-y-6 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start">
                <div className="flex items-center gap-2 text-xs sm:text-[13px] text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                  ✨ AI Powered
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl text-black font-medium leading-tight">
                Ace Interview with <br />
                <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#FF9324_0%,_#FCD768_100%)] bg-[length:200%_200%] animation-text-shine font-semibold">
                  AI-Powered
                </span>{" "}
                Learning
              </h1>
            </div>

            {/* Right Content */}

            <div className="w-full md:w-1/2 text-center md:text-left">
              <p className="text-sm sm:text-base md:text-[17px] text-gray-900 mr-0 md:mr-20 mb-4 sm:mb-6 px-2 sm:px-0">
                Get role-specific questions, expand answers when you need them,
                dive deep into concepts, and organize everything your way. From
                preparation to mastery - your ultimate interview toolkit is
                here.
              </p>

              <button
                className="bg-gradient-to-r from-[#FF9324] to-[#c99a4b] text-xs sm:text-sm font-semibold text-white px-6 sm:px-7 py-2 sm:py-2.5 rounded-full hover:bg-black hover:from-black hover:to-black border border-transparent transition-all duration-300 cursor-pointer transform hover:scale-105"
                onClick={handleCTA}
              >
                Get Started →
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full min-h-full relative z-10">
        <div>
          <section className="flex items-center justify-center -mt-20 sm:-mt-28 md:-mt-36 px-4 sm:px-6">
            <img
              src={HEAD_IMG}
              alt="Hero Image"
              className="w-full sm:w-[90vw] md:w-[80vw] rounded-lg border border-gray-400 shadow-xl"
            />
          </section>
        </div>
      </div>

      <div className="w-full min-h-full bg-[#f1e8bd] mt-6 sm:mt-8 md:mt-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-12 sm:pb-16 md:pb-20">
          <section className="mt-5">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-center mb-8 sm:mb-10 md:mb-12 px-4">
              Features That Make You Shine
            </h2>

            <div className="flex flex-col items-center gap-6 sm:gap-8">
              {/* First 3 cards are features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full">
                {APP_FEATURES.slice(0, 3).map((feature) => (
                  <div
                    key={feature.id}
                    className="bg-[#fff8e1] p-4 sm:p-5 md:p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100"
                  >
                    <h3 className="text-sm sm:text-base font-semibold mb-2 sm:mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
              {/* Next 2 cards are features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 w-full max-w-4xl">
                {APP_FEATURES.slice(3, 5).map((feature) => (
                  <div
                    key={feature.id}
                    className="bg-[#fff8e1] p-4 sm:p-5 md:p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100"
                  >
                    <h3 className="text-sm sm:text-base font-semibold mb-2 sm:mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="text-xs sm:text-sm bg-gray-50 text-secondary text-center p-4 sm:p-5 mt-5">
          Make With ❤️... Happy Coding
        </div>
      </div>

      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          // FIX: invoke setter instead of assigning to function variable
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && (
            <Signup setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </>
  );
};

export default LandingPage;
