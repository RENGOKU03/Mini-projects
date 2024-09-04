import React, { useRef } from "react";

const ScrollToSection = () => {
  const divRef = useRef([]);

  const buttons = [1, 2, 3, 4, 5];
  function handleOnClick(index) {
    divRef.current[index].scrollIntoView({ behavior: "smooth" });
  }

  const sections = [
    { name: "First", color: "red" },
    { name: "Second", color: "blue" },
    { name: "Third", color: "purple" },
    { name: "Fourth", color: "yellow" },
    { name: "Fifth", color: "pink" },
  ];

  return (
    <div className="snap-start bg-black text-white text-center text-4xl font-semibold">
      <h1 className="text-5xl p-10">Scroll to Any Defined Section</h1>

      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={() => handleOnClick(index)}
          className="bg-white mx-3 text-black px-6 py-2 mb-4 rounded-2xl hover:bg-gray-900 hover:text-white"
        >
          {button}
        </button>
      ))}

      {sections.map((section, index) => (
        <div
          key={index}
          ref={(el) => (divRef.current[index] = el)}
          className="h-[500px] text-black p-20 text-9xl"
          style={{ backgroundColor: section.color }}
        >
          {section.name}
        </div>
      ))}
    </div>
  );
};

export default ScrollToSection;
