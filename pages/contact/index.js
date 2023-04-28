import React, {useState, useEffect} from "react";
import { toast } from "react-hot-toast";

export default function Contact() {
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("");

    function handleFirstNameChange(evt) {
        setFirstname(evt.target.value);
    }

    function handleLastNameChange(evt) {
        setLastname(evt.target.value);
    }

    function handleEmailChange(evt) {
        setEmail(evt.target.value);
    }

    function handlePhoneNumberChange(evt) {
        setPhoneNumber(evt.target.value);
    }

    function handleMessageChange(evt) {
        setMessage(evt.target.value);
    }

    async function twilioContactForm(evt) {
        evt.preventDefault();
        const response = await fetch(`/api/twilio/contactform?firstName=${firstName}&lastName=${lastName}&email=${email}&phoneNumber=${phoneNumber}&message=${message}`);
        toast.success("Sent");
        setFirstname("");
        setLastname("");
        setEmail("");
        setPhoneNumber("");
        setMessage("");
        
    }

    return (
        <div className="min-h-screen flex flex-col items-center">
            <h1 className="text-white font-bold">Get in Touch</h1>
            <form onSubmit={twilioContactForm} className="bg-gray-container w-9/12 rounded-lg flex flex-col justify-center items-center flex-wrap p-3 lg:flex-row">
                <input placeholder="First Name" value={firstName} onChange={handleFirstNameChange} className="w-5/12 h-16 m-2 rounded-xl"/>
                <input placeholder="Last Name" value={lastName} onChange={handleLastNameChange} className="w-5/12 h-16 m-2 rounded-xl"/>
                <input placeholder="Email Address" value={email} onChange={handleEmailChange} className="w-5/12 h-16 m-2 rounded-xl"/>
                <input placeholder="Phone Number" value={phoneNumber} onChange={handlePhoneNumberChange} className="w-5/12 h-16 m-2 rounded-xl"/>
                <div className="flex flex-col w-10/12 items-center">
                    <textarea placeholder="Type your message here" value={message} onChange={handleMessageChange} className="w-full p-3 m-2 rounded-xl h-40"></textarea>
                    <button className="p-3 w-70 text-white font-bold bg-primary-green rounded-xl hover:drop-shadow-lg">Submit</button>
                </div>
                
            </form>
        </div>
        
    )
}