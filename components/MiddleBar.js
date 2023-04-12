import React, {useState, useEffect} from "react";

export default function MiddleBar() {
    return (
        <div className="bg-blue-600 h-44 flex justify-center mt-10">
            <div className="border-r-8 border-sky-500 w-3/12 h-44 flex flex-col justify-center">
                <h1 className="text-center text-white">100+</h1>
                <h3 className="text-center text-white">Success Stories</h3>
            </div>
            <div className="border-r-8 border-sky-500 w-3/12 h-44 flex flex-col justify-center">
                <h1 className="text-center text-white">1</h1>
                <h3 className="text-center text-white">Expert Instructor</h3>
            </div>
            <div className="border-r-8 border-sky-500 w-3/12 h-44 flex flex-col justify-center">
                <h1 className="text-center text-white">800+</h1>
                <h3 className="text-center text-white">Hours Tutored</h3>
            </div>
            <div className="border-2 border-sky-500 w-3/12 h-44 flex flex-col justify-center">
                <h1 className="text-center text-white">50+</h1>
                <h3 className="text-center text-white">Active Students</h3>
            </div>
        </div>
    )
}