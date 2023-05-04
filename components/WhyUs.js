import React, {useState, useEffect} from "react";
import { ImPriceTag } from "react-icons/im";
import { AiFillHome } from "react-icons/ai";
import { GiTeacher } from "react-icons/gi";
import { BsFileEarmarkCode } from "react-icons/bs";
import { Slide } from "react-awesome-reveal";

export default function WhyUs() {
    return (
        <div>
            <h1 className="text-center mt-10 text-primary-green font-bold">WHY CHOOSE US?</h1>
            
            <div className="w-full flex flex-col items-center lg:flex-row lg:justify-evenly lg:items-stretch lg:space-x-4 lg:px-4 lg:mt-10">
                <div className="h-76 mt-10 w-11/12 lg:m-0">
                    <Slide direction="left">
                        <div className="rounded-xl bg-gray-container h-full p-4">
                            <div className="bg-primary-green w-16 h-16 mt-4 ml-4 rounded-2xl flex justify-center items-center text-white text-4xl"><GiTeacher/></div>
                            <h2 className="ml-4 text-white font-bold">BEST TUTOR</h2>
                            <p className="ml-4 text-white text-lg">Our top-notch tutors excel in coding & ensure exceptional learning, making us the best choice for a comprehensive coding education!</p>
                        </div>
                    </Slide>
                </div>
                <div className="h-76 mt-10 w-11/12 lg:m-0">
                    <Slide direction="left">
                        <div className="rounded-xl bg-gray-container h-full p-4">
                            <div className="bg-primary-green w-16 h-16 mt-4 ml-4 rounded-2xl flex justify-center items-center text-white text-4xl"><BsFileEarmarkCode/></div>
                            <h2 className="ml-4 text-white font-bold">BEST LESSONS</h2>
                            <p className="ml-4 text-white text-lg">Our project-based curriculum covers everything from web design in React to back-end frameworks like Python, ensuring a well-rounded education.</p>
                        </div>
                    </Slide>
                </div>
                <div className="h-76 mt-10 w-11/12 lg:m-0">
                    <Slide direction="left">
                        <div className="rounded-xl bg-gray-container h-full p-4">
                            <div className="bg-primary-green w-16 h-16 mt-4 ml-4 rounded-2xl flex justify-center items-center text-white text-4xl"><AiFillHome/></div>
                            <h2 className="ml-4 text-white font-bold">BEST STUDENTS</h2>
                            <p className="ml-4 text-white text-lg">Join our social community of coding students collaborating on projects, making friends, and accelerating learning through peer support.</p>
                        </div>
                    </Slide>
                </div>
                <div className="h-76 mt-10 w-11/12 lg:m-0">
                    <Slide direction="left">
                        <div className="rounded-xl bg-gray-container h-full p-4">
                            <div className="bg-primary-green w-16 h-16 mt-4 ml-4 rounded-2xl flex justify-center items-center text-white text-4xl"><ImPriceTag/></div>
                            <h2 className="ml-4 text-white font-bold">BEST PRICE</h2>
                            <p className="ml-4 text-white text-lg">Our prices are unbeatable compared to other coding schools, as we believe in making technology education affordable and accessible for everyone.</p>
                        </div>
                    </Slide>
                </div>
            </div>
        </div>
        
    )
}