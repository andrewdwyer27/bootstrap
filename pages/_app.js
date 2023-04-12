import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserDataProvider } from "../lib/context";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <UserDataProvider>
      <Toaster/>
      <Component {...pageProps} />
    </UserDataProvider>
  ) 
}
