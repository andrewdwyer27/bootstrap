import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserDataProvider } from "../lib/context";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";

export default function App({ Component, pageProps }) {
  return (
    <UserDataProvider>
      <div className="bg-backgroundgray">
        <Navbar/>
        <Toaster/>
        <Component {...pageProps} />
      </div>
    </UserDataProvider>
  ) 
}
