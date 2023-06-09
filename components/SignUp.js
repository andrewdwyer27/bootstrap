import { useState } from 'react';
import { AttentionSeeker } from "react-awesome-reveal";

export default function SignUp() {
  const [email, setEmail] = useState('');

  
  function handleEmailChange(evt) {
    setEmail(evt.target.value)
  }
  async function handleSubmit(evt) {
    evt.preventDefault();
    const response = await fetch(`/api/twilio/twilio?email=${email}`);
    const data = await response.json();
    console.log(data);
    console.log("Data?");
    setEmail("");
  }

  return (
    <div className="flex justify-center">
      <div className="w-11/12">
        <AttentionSeeker effect="bounce">
          <form onSubmit={handleSubmit} className="mt-24 flex flex-col items-center bg-gray-container rounded-lg p-4 lg:justify-between lg:items-center">
            <h4 className="text-white font-bold ml-3 mt-2 sm:text-center">Sign Up For A Free Session</h4>
            <div className="flex">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                className="h-14 rounded-xl p-2 w-fit text-white bg-form-input focus:outline-none focus:ring-1 focus:ring-primary-green lg:rounded-l-xl lg:rounded-r-none"
              />
              <button type="submit" className="h-14 rounded-xl p-2 bg-primary-green text-white font-bold hover:drop-shadow-lg lg:rounded-r-xl lg:rounded-l-none">Submit</button>
            </div>
          </form>
        </AttentionSeeker>
      </div>
      
      
    </div>
  );
}