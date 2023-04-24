import { UserDataContext } from "../lib/context";
import { useContext } from "react";
import { auth } from "../lib/firebase";

export default function AdminCheck(props) {
    const { user } = useContext(UserDataContext);
    const userEmail = auth.currentUser.email;
    console.log(userEmail);
    return userEmail === "andrewdwyer27@gmail.com" 
        ? props.children
        : props.fallback
}