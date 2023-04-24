import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import SignUp from "../components/SignUp";
import WhyUs from "../components/WhyUs";
import MiddleBar from "../components/MiddleBar";
import Teacher from "../components/Teacher";
import axios from "axios";

export default function Home() {
  return (
    <div>
      <HeroSection/>
      <SignUp/>
      <MiddleBar/>
      <WhyUs/>
      <Teacher/>
      <button onClick={() => axios.get("/api/stripe/hello").then(response => {
        const stripe_data = response.data;
        console.log(stripe_data);
      })}>Submit</button>
    </div>
  )
}
