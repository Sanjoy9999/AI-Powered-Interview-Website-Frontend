import React from "react";
import { LuX } from "react-icons/lu";

const Drawer = ({ isOpen, onClose, title, children }) => {
  return (
    <div
      className={`fixed top-[64px] right-0 z-40 h-[calc(100vh-64px)] w-full md:w-[45vw]
      bg-white shadow-2xl shadow-cyan-800/10 border-l border-gray-200
      transition-transform duration-300 flex flex-col
      ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      aria-labelledby="drawer-right-label"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 flex-none">
        <h5 id="drawer-right-label" className="text-base font-semibold text-black">
          {title}
        </h5>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:bg-gray-200/60 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center transition"
        >
          <LuX className="text-lg" />
        </button>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto drawer-scroll px-5 py-4 text-sm">
        {children}
      </div>
    </div>
  );
};

export default Drawer;
