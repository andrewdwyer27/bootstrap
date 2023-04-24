import { useState } from 'react';

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
      <form onSubmit={handleSubmit} className="mt-24 flex items-center justify-between bg-gray-container w-8/12 rounded-lg p-2">
        <h4 className="text-white font-bold">Sign Up For A Free Session</h4>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className="ml-3 h-14 rounded-l-xl p-2 bg-transparent w-80 text-white"
          />
          <button type="submit" className="h-14 rounded-r-xl p-2 bg-primary-green text-white font-bold hover:drop-shadow-lg">Submit</button>
        </div>
      </form>
    </div>
  );
}