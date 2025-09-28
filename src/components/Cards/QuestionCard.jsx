import React, { useEffect, useRef, useState } from "react";
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from "react-icons/lu";
import AIResponsePreview from "../../pages/InterviewPrep/components/AIResponsePreview";

const QuestionCard = ({
  question,
  answer,
  onLearnMore,
  isPinned,
  onTogglePin,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isExpanded) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight + 10); // Add some padding
    } else {
      setHeight(0);
    }
  }, [isExpanded]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div  className="relative rounded-xl mb-4 overflow-hidden py-4 px-5
        bg-gradient-to-br from-white to-gray-50
        border border-gray-200
        shadow-[0_4px_10px_-1px_rgba(0,0,0,0.18),0_2px_4px_-1px_rgba(0,0,0,0.12)]
        hover:shadow-[0_8px_24px_-2px_rgba(0,0,0,0.30),0_4px_12px_-2px_rgba(0,0,0,0.20)]
        transition-shadow duration-300 group">
        <div className="flex items-start justify-between cursor-pointer ">
          <div className="flex items-start gap-3.5">
            <span className="text-xs md:text-[15px] font-semibold text-gray-400 leading-[18px]">Q</span>

            <h3 className="text-xs md:text-[14px] font-medium text-gray-800 mr-0 md:mr-20" onClick={toggleExpand}>
              {question}
            </h3>
          </div>

          <div className="flex items-center justify-end ml-4 relative">
            <div
              className={`flex ${
                isExpanded ? "md:flex" : "md:hidden group-hover:flex"
              }`}
            >
              <button className="flex items-center gap-2 text-xs text-indigo-800 font-medium bg-indigo-200 px-3 py-1 mr-2 rounded text-nowrap border  border-indigo-200  hover:border-indigo-400
              cursor-pointer" onClick={onTogglePin}>
                {isPinned ? <LuPinOff className="text-xs " /> : <LuPin className="text-xs" />}
              </button>

              <button
                className="flex items-center gap-2 text-xs text-cyan-800 font-medium bg-cyan-200 px-3 py-1 mr-2 rounded  text-nowrap border border-cyan-200 hover:border-cyan-400
                cursor-pointer"
                onClick={() => {
                  setIsExpanded(true);
                  onLearnMore();
                }}
              >
                <LuSparkles  />
                <span className="hidden md:block">Learn More</span>
              </button>
            </div>

            <button className="text-gray-600 hover:text-gray-400 cursor-pointer" onClick={toggleExpand}>
              <LuChevronDown
                size={20}
                className={`transform transition-transform duration-300 ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>

        <div className="overflow-hidden transition-all duration-300 ease-in-out" style={{ maxHeight: `${height}px` }}>
          <div ref={contentRef} 
          className="mt-4 text-gray-700 bg-gray-300 px-5 py-3 rounded-lg"
          >
            <AIResponsePreview context={answer} />
          </div>
        </div>
      </div>  
    </>
  );
};

export default QuestionCard;
