import { getFirestore, doc, onSnapshot, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { firestore, auth } from "../lib/firebase";

export const saveUserDataToFireStore = async (user) => {
    const userRef = doc(firestore, "users", user.email); //gets the doc is users collection with unique user id 
    const userData = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        isAdmin: false
    };
    try {
//The { merge: true } option ensures that the data is merged with any existing data, rather than overwriting it. 
//This is useful when you want to update specific fields of the document without overwriting the entire document. 
//If the document doesn't exist, it will be created with the provided data.
        await setDoc(userRef, userData, {merge: true}); //
    }
    catch(error) {
        console.log("Error saving user data to firestore: " + error);
    }

}
//The useUserData hook manages the user and username state by listening to Firebase Auth state changes 
//returns the new user and username everytime it changes
export function useUserData() {
    const [user] = useAuthState(auth);

    const [username, setUsername] = useState(null);

    useEffect(() => {
        let unsubscribe;

        if(user) {
            const ref = doc(firestore, "users", user.uid);
            unsubscribe = onSnapshot(ref, (doc) => {
                setUsername(doc.data()?.username);
            })
        } else {
            setUsername(null);
        }

        return unsubscribe;
    }, [user])

    return { user, username };

}
