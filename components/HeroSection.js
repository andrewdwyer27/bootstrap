import React, {useState, useEffect} from "react";

export default function HeroSection() {
    return (
        <div className="w-full h-auto flex ">
            <div className="h-44 w-3/6 mt-20">
                <h1 className="text-center text-darkblue">LEARN TO LEARN <br/>HOW TO CODE</h1>
                <div className="flex justify-center mt-4">
                    <button className="bg-blue-600 p-6 rounded-xl mr-1.5 text-white font-bold">Contact</button>
                    <button className="bg-blue-600 p-6 rounded-full ml-1.5 border-2 text-white font-bold">▶️</button>
                    <span className="flex items-center text-neutral-500 font-bold">See how it works?</span>
                </div>
                
            </div>
            <div className="h-88 w-3/6 flex justify-center items-center mt-16">
                <video className="w-9/12 h-full drop-shadow-lg" controls>
                    <source src="movie.mp4" type="video/mp4"/>
                </video>
            </div>
        </div>
    )
}