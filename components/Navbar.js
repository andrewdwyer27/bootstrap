import React, {useState, useEffect} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { googleAuthProvider, auth } from "../lib/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { saveUserDataToFireStore } from "../lib/helpers";
import {useContext} from "react";
import { UserDataContext } from "../lib/context";
import toast from "react-hot-toast";
import { AiFillHome } from "react-icons/Ai"
import { FaFileInvoiceDollar } from "react-icons/Fa";
import { FaVideo } from "react-icons/Fa";
import { IoMdContact } from "react-icons/Io"
export default function MyNavbar() {
    const {user} = useContext(UserDataContext);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);

    return (
      <Navbar bg="light" expand="lg" className="bg-blue-600">
        <Container className="border-2">
          <Navbar.Brand href="#home">My App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto mx-auto text-darkblue">
              <Nav.Link href="#home" className="m-3 d-flex align-items-center transition-all hover:border-b-2 hover:border-b-lightblue" style={{ color: "#2563EB"}}><AiFillHome className="mr-2" fill="darkblue"/>HOME</Nav.Link>
              <Nav.Link href="/payments" className="m-3 d-flex align-items-center transition-all hover:border-b-2 hover:border-b-lightblue" style={{ color: "#2563EB"}}><FaFileInvoiceDollar className="mr-2" fill="darkblue"/>PAYMENTS</Nav.Link>
              <Nav.Link href="#link" className="m-3 d-flex align-items-center transition-all hover:border-b-2 hover:border-b-lightblue" style={{ color: "#2563EB"}}><FaVideo className="mr-2" fill="darkblue"/>COURSES</Nav.Link>
              <Nav.Link href="/notes" className="m-3 d-flex align-items-center transition-all hover:border-b-2 hover:border-b-lightblue" style={{ color: "#2563EB"}}><FaVideo className="mr-2" fill="darkblue"/>NOTES</Nav.Link>
              <Nav.Link href="#link" className="m-3 d-flex align-items-center transition-all hover:border-b-2 hover:border-b-lightblue" style={{ color: "#2563EB"}}><IoMdContact className="mr-2" fill="darkblue"/>CONTACT</Nav.Link>
            </Nav>
            {(isClient && user) ? <SignOutButton/> : <SignInButton/>}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }

function SignInButton() {
    const handleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleAuthProvider);
            const user = result.user;
            await saveUserDataToFireStore(user);
            toast.success("Logged in");

        }
        catch(error) {
            console.log("Error signing in with google: " + error);
        }
    }

    return (
        <button onClick={handleSignIn} className="flex border-2 items-center rounded-xl bg-blue-600 pr-3">
            <img src={"/google.png"} alt="Google Logo" className="w-16"/>Log in
        </button>
    )
}

function SignOutButton() {
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            toast.success("Logged out")
        } catch(error) {
            console.log("Error signing out: " + error);
        }
        

    }
    return (
        <button onClick={handleSignOut} className="flex border-2 items-center rounded-xl bg-blue-600 pr-3">
            <img src={"/google.png"} alt= "Google Logo" className="w-16"/>Log out
        </button>
    )
}