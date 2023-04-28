import React, {useState, useEffect} from "react";

export default function MiddleBar() {
    return (
        <div className="bg-primary-green h-fit flex flex-col items-center mt-10 lg:flex-row">
            <div className="border-b-8 w-3/12 h-44 flex flex-col justify-center lg:border-r-8 lg:border-b-0">
                <h1 className="text-center text-white font-bold">100+</h1>
                <h3 className="text-center text-white">Success Stories</h3>
            </div>
            <div className="border-b-8 w-3/12 h-44 flex flex-col justify-center lg:border-r-8 lg:border-b-0">
                <h1 className="text-center text-white font-bold">1</h1>
                <h3 className="text-center text-white">Expert Instructor</h3>
            </div>
            <div className="border-b-8 w-3/12 h-44 flex flex-col justify-center lg:border-r-8 lg:border-b-0">
                <h1 className="text-center text-white font-bold">800+</h1>
                <h3 className="text-center text-white">Hours Tutored</h3>
            </div>
            <div className="border-b-8 w-3/12 h-44 flex flex-col justify-center lg:border-b-0">
                <h1 className="text-center text-white font-bold">50+</h1>
                <h3 className="text-center text-white">Active Students</h3>
            </div>
        </div>
    )
}