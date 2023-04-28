import React, { useState, useEffect } from "react";

export default function HeroSection() {
  const [text, setText] = useState("");
  const targetText = "CODE";
  const typingSpeed = 200; // Typing speed in milliseconds

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < targetText.length) {
        setText((prevText) => prevText + targetText.charAt(index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [targetText, typingSpeed]);

  return (
    <div className="w-full h-auto flex flex-col items-center lg:flex-row">
      <div className="h-44 w-3/6 mt-20 flex flex-col items-center">
        <h1 className="text-white font-bold text-center">
          LEARN TO LEARN <br />
          <span className="typing">
            <span>HOW TO </span> <span className="typing-text text-primary-green">{text}</span>
          </span>
        </h1>
        <p className="text-grayfont w-3/6 text-center font-bold">Empower kids with exceptional coding tutor, unlocking mastery through innovative, impressive projects. Ignite potential!</p>
      </div>
      <div className="h-44 mt-20 w-3/6 flex justify-center items-center">
        <img src="./code.gif" className="w-9/12"/>
      </div>

    </div>
  );
}