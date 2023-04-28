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
      <Navbar expand="lg" className="backgroundgray">
        <Container>
          <Navbar.Brand href="#home">My App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto mx-auto text-darkblue">
              <Nav.Link href="/" className="m-3 d-flex align-items-center transition-all hover:opacity-20" style={{ color: "white", fontWeight: "700", fontSize: "16px", lineHeight: "24px"}}>HOME</Nav.Link>
              <Nav.Link href="/payments" className="m-3 d-flex align-items-center transition-all hover:opacity-20" style={{ color: "white", fontWeight: "700", fontSize: "16px", lineHeight: "24px"}}>PAYMENTS</Nav.Link>
              <Nav.Link href="/courses" className="m-3 d-flex align-items-center transition-all hover:opacity-20" style={{ color: "white", fontWeight: "700", fontSize: "16px", lineHeight: "24px"}}>COURSES</Nav.Link>
              <Nav.Link href="/notes" className="m-3 d-flex align-items-center transition-all hover:opacity-20" style={{ color: "white", fontWeight: "700", fontSize: "16px", lineHeight: "24px"}}>NOTES</Nav.Link>
              <Nav.Link href="/contact" className="m-3 d-flex align-items-center transition-all hover:opacity-20" style={{ color: "white", fontWeight: "700", fontSize: "16px", lineHeight: "24px"}}>CONTACT</Nav.Link>
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
            toast.success("Signed in");

        }
        catch(error) {
            console.log("Error signing in with google: " + error);
        }
    }

    return (
        <button onClick={handleSignIn} className="flex items-center rounded-xl bg-primary-green p-3 px-4 text-white font-bold hover:drop-shadow-lg">
            Sign in
        </button>
    )
}

function SignOutButton() {
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            toast.success("Signed out")
        } catch(error) {
            console.log("Error signing out: " + error);
        }
        

    }
    return (
        <button onClick={handleSignOut} className="flex items-center rounded-xl bg-primary-green p-3 px-4 text-white font-bold hover:drop-shadow-lg">
            Sign out
        </button>
    )
}