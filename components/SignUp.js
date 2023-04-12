export default function SignUp() {
  return (
    <form className="mt-24 flex flex-column items-center drop-shadow-lg">
        <h1 className="text-darkblue">SIGN UP FOR A FREE SESSION</h1>
        <div className="drop-shadow-lg">
            <input placeholder="Email" className="h-14 rounded-l-xl p-2"/>
            <button type="submit" className="h-14 rounded-r-xl p-2 bg-blue-600 text-white font-bold">Submit</button>
        </div>
    </form>
  );
}
