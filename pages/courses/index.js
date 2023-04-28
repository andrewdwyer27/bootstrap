import React, {useState, useEffect} from "react";
import Course from "../../components/Course";
export default function Courses() {
    return (
        <div className="flex flex-col items-center lg:flex-row lg:flex-wrap">
            <Course courseTitle="React" coursePrice={5} courseLogo="/react.png"/>
            <Course courseTitle="JavaScript" coursePrice={5} courseLogo="/javascript.png"/>
            <Course courseTitle="Python" coursePrice={5} courseLogo="/python.png"/>
            <Course courseTitle="HTML" coursePrice={5} courseLogo="/html.png"/>
            <Course courseTitle="CSS" coursePrice={5} courseLogo="/css.png"/>
            <Course courseTitle="SQL" coursePrice={5} courseLogo="/sql.png"/>
            <Course courseTitle="Node.js" coursePrice={5} courseLogo="/nodejs.png"/>
            <Course courseTitle="PHP" coursePrice={5} courseLogo="/php.png"/>
            <Course courseTitle="C" coursePrice={5} courseLogo="/c.png"/>
            <Course courseTitle="Swift" coursePrice={5} courseLogo="/swift.png"/>
            <Course courseTitle="Go" coursePrice={5} courseLogo="/go.png"/>
            <Course courseTitle="Next.js" coursePrice={5} courseLogo="/nextjs.png"/>
            <Course courseTitle="Svelte" coursePrice={5} courseLogo="/svelte.png"/>
            <Course courseTitle="Express" coursePrice={5} courseLogo="/express.png"/>
        </div>
    )
}