import React from "react";

const RoleInfoHeader = ({
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
}) => {
  return (
    <div className="bg-white relative">
      <div className="container mx-auto px-10 md:px-0">
        <div className="h-[200px] flex flex-col justify-center relative z-10">
          <div className="flex items-start">
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-medium">{role}</h2>
                  <p className="text-sm text-medium text-gray-900 mt-1">
                    {topicsToFocus}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <div className="text-[10px] font-semibold text-white bg-black px-3 py-1 rounded-full">
              Experience: {experience} {experience === 1 ? " Year" : " Years"}
            </div>

            <div className="text-[10px] font-semibold text-white bg-black px-3 py-1 rounded-full">
              {questions} Q&A
            </div>

            <div className="text-[10px] font-semibold text-white bg-black px-3 py-1 rounded-full">
              Last Updated: {lastUpdated}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 h-[200px] w-[40vw] overflow-hidden">
        <div className="relative h-full w-full pointer-events-none">
          <div className="absolute -top-16 right-8 w-64 h-64 rounded-full bg-gradient-to-tr from-emerald-400 via-teal-400 to-cyan-400 opacity-50 blur-3xl animate-blob-slow"></div>
          <div className="absolute top-6 right-40 w-52 h-52 rounded-full bg-gradient-to-br from-fuchsia-400 via-pink-400 to-rose-400 opacity-40 blur-3xl animate-blob-slow animation-delay-2000"></div>
          <div className="absolute -bottom-10 right-20 w-56 h-56 rounded-full bg-gradient-to-tr from-sky-400 via-indigo-400 to-violet-400 opacity-35 blur-3xl animate-blob-slow animation-delay-4000"></div>
          <div className="absolute top-10 right-14 w-40 h-40 rounded-full bg-gradient-to-tr from-emerald-300 to-teal-200 opacity-40 mix-blend-screen blur-2xl animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default RoleInfoHeader;
