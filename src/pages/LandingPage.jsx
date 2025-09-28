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
        <div className="w-[500px] h-[500px] bg-amber-200/20 absolute top-0 left-0 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 pt-6 pb-[200px] relative z-10">
          {/* Header */}
          <header className="flex justify-between items-center mb-16">
            <div className="text-xl text-black font-bold">
              Interview Prep AI
            </div>
            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                className="bg-gradient-to-r from-[#FF9324] to-[#c99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:from-black hover:to-black border border-transparent transition-all duration-300 cursor-pointer transform hover:scale-105"
                onClick={() => setOpenAuthModal(true)}
              >
                Login / Sign Up
              </button>
            )}
          </header>

          {/* Hero Section */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Left Content */}
            <div className="w-full md:w-1/2 space-y-6">
              <div className="flex items-center justify-start">
                <div className="flex items-center gap-2 text-[13px] text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                  ✨ AI Powered
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl text-black font-medium leading-tight">
                Ace Interview with <br />
                <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#FF9324_0%,_#FCD768_100%)] bg-[length:200%_200%] animation-text-shine font-semibold">
                  AI-Powered
                </span>{" "}
                Learning
              </h1>
            </div>

            {/* Right Content */}

            <div className="w-full md:w-1/2">
              <p className="text-[17px] text-gray-900 mr-0 md:mr-20 mb-6">
                Get role-specific questions, expand answers when you need them,
                dive deep into concepts, and organize everything your way. From
                preparation to mastery - your ultimate interview toolkit is
                here.
              </p>

              <button
                className="bg-gradient-to-r from-[#FF9324] to-[#c99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:from-black hover:to-black border border-transparent transition-all duration-300 cursor-pointer transform hover:scale-105"
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
          <section className="flex items-center justify-center -mt-36 ">
            <img
              src={HEAD_IMG}
              alt="Hero Image"
              className="w-[80vw] rounded-lg border border-gray-400"
            />
          </section>
        </div>
      </div>

      <div className="w-full min-h-full bg-[#f1e8bd] mt-10">
        <div className="container mx-auto px-4 pt-10 pb-20">
          <section className="mt-5">
            <h2 className="text-2xl font-medium text-center mb-12">
              Features That Make You Shine
            </h2>

            <div className="flex flex-col items-center gap-8">
              {/* First 3 cards are features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                {APP_FEATURES.slice(0, 3).map((feature) => (
                  <div
                    key={feature.id}
                    className="bg-[#fff8e1] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100"
                  >
                    <h3 className="text-base font-semibold mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
              {/* Next 2 cards are features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {APP_FEATURES.slice(3, 5).map((feature) => (
                  <div
                    key={feature.id}
                    className="bg-[#fff8e1] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100"
                  >
                    <h3 className="text-base font-semibold mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="text-sm bg-gray-50 text-secondary text-center p-5 mt-5">
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
