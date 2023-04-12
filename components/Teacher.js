import React, {useState, useEffect} from "react";

export default function Teacher() {
    return ( 
        <div className="mt-20">
            <h1 className="text-center text-darkblue">YOUR TEACHER</h1>
            <div className="border-2 h-40 w-9/12 mx-auto flex items-center">
                <div className="rounded-full bg-blue-600 w-32 h-32 ml-3"></div>
                <p className="mx-auto text-center w-9/12 mt-3 text-darkgray">Are you looking to learn how to code, but not sure where to start? Look no further! I will teach you the ins and outs of programming while having a blast. With my years of experience and project-based teaching style, you'll be writing code like a pro in no time. So why wait? Let's start coding together today!</p>
            </div>

        </div>
    )
}