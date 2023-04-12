import React, {useState, useEffect} from "react";
import { ImPriceTag } from "react-icons/im";
import { AiFillHome } from "react-icons/Ai";
import { GiTeacher } from "react-icons/Gi";
import { BsFileEarmarkCode } from "react-icons/Bs";
export default function WhyUs() {
    return (
        <div>
            <h1 className="text-center mt-10 text-darkblue">WHY CHOOSE US?</h1>
            
            <div className="w-full mt-10 flex justify-center">
                <div className="h-72 w-1/5 rounded-xl">
                    <div className="bg-blue-600 w-16 h-16 mt-4 ml-4 rounded-2xl flex justify-center items-center text-white text-4xl"><GiTeacher/></div>
                    <h2 className="ml-4">BEST TUTOR</h2>
                    <p className="ml-4 text-darkgray">Our top-notch tutors excel at coding & ensure exceptional learning outcomes, making us the best choice!</p>
                </div>
                <div className="h-72 w-1/5 rounded-xl">
                    <div className="bg-blue-600 w-16 h-16 mt-4 ml-4 rounded-2xl flex justify-center items-center text-white text-4xl"><BsFileEarmarkCode/></div>
                    <h2 className="ml-4">BEST LESSONS</h2>
                    <p className="ml-4 text-darkgray">Our comprehensive and project-based curriculum covers everything from web design in React to back-end frameworks like Python and Java, ensuring a well-rounded and advanced education.</p>
                </div>
                <div className="h-72 w-1/5 rounded-xl">
                    <div className="bg-blue-600 w-16 h-16 mt-4 ml-4 rounded-2xl flex justify-center items-center text-white text-4xl"><AiFillHome/></div>
                    <h2 className="ml-4">BEST STUDENTS</h2>
                    <p className="ml-4 text-darkgray">Join our social community of coding students collaborating on projects, making friends, and accelerating learning through peer support.</p>
                </div>
                <div className="h-72 w-1/5 rounded-xl">
                    <div className="bg-blue-600 w-16 h-16 mt-4 ml-4 rounded-2xl flex justify-center items-center text-white text-4xl"><ImPriceTag/></div>
                    <h2 className="ml-4">BEST PRICE</h2>
                    <p className="ml-4 text-darkgray">Our prices are unbeatable compared to other coding schools, as we believe in making technology education affordable and accessible for everyone.</p>
                </div>
            </div>
        </div>
        
    )
}