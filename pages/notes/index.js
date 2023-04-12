import React, {useState, useEffect} from "react";
import { UserDataContext } from "../../lib/context";
import { useContext } from "react";
import { setDoc, doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore"
import { firestore } from "../../lib/firebase";

export default function Notes() {
    const [userEmail, setUserEmail] = useState("");
    const [noteTitle, setNoteTitle] = useState("");
    const [noteContent, setNoteContent] = useState("");
    const [notes, setNotes] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const {user} = useContext(UserDataContext);

    const getUserNotes = async () => {
        if(user.email !== "andrewdwyer27@gmail.com") {
            const userDoc = doc(firestore, "users", `${user?.email}`);
            const userDocData = await getDoc(userDoc);
            const newNotes = userDocData.data().notes;
            setNotes(newNotes);    
        }

    }
    useEffect(() => {
        if(user && user.email !== "andrewdwyer27@gmail.com") {
            getUserNotes();
        }
    }, [user])

    function handleUserEmailChange(evt) {
        setUserEmail(evt.target.value);
    }

    function handleNoteTitleChange(evt) {
        setNoteTitle(evt.target.value);
    }

    function handleNoteContentChange(evt) {
        setNoteContent(evt.target.value);
    }

    async function seeUserNotes(evt) {
        const userDoc = doc(firestore, "users", `${userEmail}`);
        const getUserDoc = await getDoc(userDoc);
        const userDocData = getUserDoc.data().notes;
        setIsEditing(!isEditing);
        setNotes(userDocData);
    }

    //Add a note
    async function handleSubmit(evt, noteIndex) {
        evt.preventDefault();
        const userDoc = doc(firestore, "users", `${userEmail}`);
        let notesObject = {noteTitle: noteTitle, noteContent: noteContent};
        const getUserDoc = await getDoc(userDoc);
        let userDocData = getUserDoc.data().notes;
        if(!isEditing) {
            if(userDocData) {
                const updatedData = { notes: [...userDocData, notesObject] };
                await updateDoc(userDoc, updatedData, { merge: true });
            }
            else {
                const updatedData = { notes: [notesObject] }
                await updateDoc(userDoc, updatedData, { merge: true });
            }  
            setUserEmail("");
        } else {
            console.log("HELLO");
            userDocData[noteIndex] = notesObject;
            const updatedData = { notes: userDocData};
            setNotes(userDocData);
            await updateDoc(userDoc, updatedData, {merge: true}); 
        }
        

        
        setNoteTitle("");
        setNoteContent("");


    }

    async function handleDelete(noteToRemove) {
        const userDoc = doc(firestore, "users", `${userEmail}`);
        const getUserDoc = await getDoc(userDoc);
        const userDocData = getUserDoc.data().notes;
        const updatedData = { notes: userDocData.arrayRemove(noteToRemove)};
        await updateDoc(userDoc, updatedData, {merge: true});
    }
    

    return (
        <div>
            {user?.email === "andrewdwyer27@gmail.com" 
            ? 
            <div>
                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    <h1>NEW NOTE</h1>
                    <input placeholder="User's Email" value={userEmail} onChange={handleUserEmailChange} className="border-2 m-3 w-3/12 p-3 rounded-lg"/>
                    <input placeholder="Note's Title" value={noteTitle} onChange={handleNoteTitleChange} className="border-2 m-3 w-3/12 p-3 rounded-lg"/>
                    <input placeholder ="Note's Content" value={noteContent} onChange={handleNoteContentChange} className="border-2 m-3 w-3/12 p-3 rounded-lg"/>
                    <button type="button" className="border-2 p-3 rounded-lg bg-blue-600 text-white" onClick={seeUserNotes}>See user notes</button>
                    <button type="submit" className="border-2 p-3 rounded-lg bg-blue-600 text-white">Submit</button>
                </form>
                {isEditing 
                ? 
                <div className="flex m-2 flex-wrap">
                    {notes?.map((note,index) => (
                        <div key={index} className="bg-blue-600 w-1/6  h-32 flex flex-col items-center border-2 rounded-lg">
                            <h1 className="text-white">{note.noteTitle}</h1>
                            <h3 className="text-white">{note.noteContent}</h3>
                            <div>
                                <button onClick={(evt) => handleSubmit(evt, index)} className="bg-darkgold p-2 rounded-lg">Edit</button>
                                <button onClick={() => handleDelete(index)} className="bg-darkgold p-2 rounded-lg">Delete</button>
                            </div>
                            
                        </div>
                    ))}
                </div>
                : null
                }
            </div>


            : 
            <div className="h-44 border-2 flex flex-wrap">
                {notes?.map((note, index) => (
                    <div key={index} className="bg-blue-600 w-1/6  h-32 flex flex-col items-center border-2 m-2 rounded-lg">
                        <h3 className="text-white">{note.noteTitle}</h3> 
                        <h3 className="text-white">{note.noteContent}</h3>
                    </div>
                ))}
            </div>
            }
            
           
        </div>
    )
}
