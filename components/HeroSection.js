import React, { useState, useEffect } from "react";
import Tilt from 'react-parallax-tilt';
import TypeWriter from "../components/TypeWriter";

export default function HeroSection() {
  return (
    <div className="w-full h-auto flex flex-col items-center lg:flex-row">
      <div className="h-44 w-11/12 mt-20 flex flex-col items-center lg:w-6/12">
        <h1 className="text-white font-bold text-center">
          LEARN TO LEARN <br />
          <span className="flex">
            <span className="mr-2">HOW TO</span> <span className="text-primary-green"><TypeWriter options={{loop:true}}/></span>
          </span>
        </h1>
        <p className="text-grayfont text-center font-bold">Empower kids with exceptional coding tutor, unlocking mastery through innovative, impressive projects. Ignite potential!</p>
      </div>
      <div className="h-44 mt-16 w-11/12 flex justify-center items-center lg:w-4/12 lg:ml-20">
        <Tilt>
            <img src="./code.gif"/>
        </Tilt>
        
      </div>

    </div>
  );
}