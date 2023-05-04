import React, {useState, useEffect} from "react";
import { UserDataContext } from "../../lib/context";
import { useContext } from "react";
import { setDoc, doc, getDoc, updateDoc, arrayRemove, getDocs, collection, addDoc, deleteDoc } from "firebase/firestore"
import { firestore } from "../../lib/firebase";
import { toast } from "react-hot-toast";

export default function Notes() {
    const [userEmail, setUserEmail] = useState("");
    const [noteTitle, setNoteTitle] = useState("");
    const [noteContent, setNoteContent] = useState("");
    const [noteTitleEdit, setNoteTitleEdit] = useState("");
    const [noteContentEdit, setNoteContentEdit] = useState("");
    const [notes, setNotes] = useState([]);
    const [seeNotes, setSeeNotes] = useState(false);
    const [editingNote, setEditingNote] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const {user} = useContext(UserDataContext);

    const getUserNotes = async () => {
        if(user.email !== "andrewdwyer27@gmail.com") {
            const userDoc = collection(firestore, "users", `${user?.email}`, "notes");
            const getUserData = await getDocs(userDoc);
            const userDocData = getUserData.docs.map((note) => note.data());
            setNotes(userDocData);   
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

    function handleNoteTitleEdit(evt) {
        setNoteTitleEdit(evt.target.value);
    }

    function handleNoteContentEdit(evt) {
        setNoteContentEdit(evt.target.value);
    }

    function displayBullets(content) {
        const lines = content.split('\n');
        const listItems = lines.map((line, index) => {
          if (line.startsWith('* ') || line.startsWith('- ')) {
            return (
              <li key={index} className="text-white">
                {line.slice(2)}
              </li>
            );
          } else {
            return (
              <p key={index} className="text-white">
                {line}
              </p>
            );
          }
        });
    
        return <ul>{listItems}</ul>;
    }

    async function seeUserNotes(evt) {
        try {
            const userDoc = collection(firestore, "users", `${userEmail}`, "notes");
            const getUserDoc = await getDocs(userDoc);
            const userDocData = getUserDoc.docs.map(note => note.data());
            setNotes(userDocData);
            setSeeNotes(!seeNotes);
        } catch(error) {
            console.log("Did not type in user email");
        }
        
    }

    //Add a note
    async function handleAdd(evt) {
        evt.preventDefault();
        let notesObject = {noteTitle: noteTitle, noteContent: noteContent};
        const userDoc = doc(firestore, "users", `${userEmail}`, "notes", notesObject.noteTitle);
        await setDoc(userDoc, notesObject);
        setNotes([...notes, notesObject]);
        setNoteTitle("");
        setNoteContent("");
        toast.success("Note Added");
    }

    async function handleDelete(noteToRemove) {
        console.log("Deleting " + noteToRemove);
        const userDoc = doc(firestore, "users", `${userEmail}`, "notes", noteToRemove);
        await deleteDoc(userDoc);
        const updatedNotes = notes.filter(note => note.noteTitle !== noteToRemove);
        setNotes(updatedNotes);
        toast.success("Note Deleted");
    }

    async function handleEdit(noteToEdit) {
        if (isSaving) {
            const oldNoteDoc = doc(firestore, "users", `${userEmail}`, "notes", noteToEdit);
            const updatedData = { noteTitle: noteTitleEdit, noteContent: noteContentEdit };
            const newNoteDoc = doc(firestore, "users", `${userEmail}`, "notes", noteTitleEdit);
            await deleteDoc(oldNoteDoc)
            await setDoc(newNoteDoc, updatedData);
            setIsSaving(false);
            toast.success("Note Edited");
        } else {
            setEditingNote(noteToEdit);
            setIsSaving(true);
        }
        

        

    }
    

    return (
        <div className="bg-backgroundgray min-h-screen w-full">
            {user?.email === "andrewdwyer27@gmail.com" 
            ? 
            <div className="flex flex-col items-center">
                <form onSubmit={handleAdd} className="bg-gray-container w-9/12 rounded-lg flex flex-col items-center">
                    <h1 className="text-white text-center font-bold">Notes</h1>
                    <input placeholder="User's Email" value={userEmail} onChange={handleUserEmailChange} className="bg-form-input text-white m-3 w-11/12 p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-green lg:w-3/12"/>
                    <input placeholder="Note's Title" value={noteTitle} onChange={handleNoteTitleChange} className="bg-form-input text-white m-3 w-11/12 p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-green lg:w-3/12"/>
                    <textarea placeholder ="Note's Content" value={noteContent} onChange={handleNoteContentChange} className="bg-form-input text-white m-3 w-11/12 p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-green lg:w-3/12"/>
                    <div className="flex justify-around w-3/12">
                        <button type="button" className="p-3 rounded-lg bg-primary-green text-white font-bold hover:drop-shadow-lg" onClick={seeUserNotes}>See user notes</button>
                        <button type="submit" className="p-3 rounded-lg bg-primary-green text-white font-bold hover:drop-shadow-lg">Submit</button>
                    </div>
                    
                </form>
                {seeNotes 
                ? 
                <div className="flex justify-center m-2 flex-wrap w-full">
                    {notes?.map((note,index) => (
                        <div key={index} className="bg-gray-container w-9/12 h-fit rounded-lg mt-5 font-bold">
                            {note.noteTitle == editingNote && isSaving
                            ? 
                            <div>
                                <input placeholder={note.noteTitle} value={noteTitleEdit} onChange={handleNoteTitleEdit}/>
                                <input placeholder={note.noteContent} value={noteContentEdit} onChange={handleNoteContentEdit}/>
                            </div> 
                            : 
                            <div>   
                                <div className="h-fit">
                                    <h1 className="text-white text-center">{note.noteTitle}</h1>
                                    <div>{displayBullets(note.noteContent)}</div>
                                </div>
                                
                                <div className="flex justify-end h-12">
                                    <button onClick={() => handleEdit(note.noteTitle)} className="bg-primary-red p-1 px-2 rounded-l-lg border-r-2 border-white text-white font-bold">{isSaving ? "Save" : "Edit"}</button>
                                    <button onClick={() => handleDelete(note.noteTitle)} className="bg-primary-red p-1 px-2 rounded-br-lg text-white font-bold">Delete</button>
                                </div>
                            </div>
                            }
                            
                            
                            
                        </div>
                    ))}
                </div>
                : null
                }
            </div>


            : 
            <div className="flex justify-center m-2 flex-wrap">
                <h1 className="text-white w-full text-center font-bold">Notes</h1>
                {notes?.map((note, index) => (
                    <div key={index} className="bg-gray-container w-9/12 h-fit rounded-lg mt-5 font-bold">
                        <div>   
                            <div className="h-fit">
                                <h1 className="text-white text-center font-bold mt-2">{note.noteTitle}</h1>
                                <div>{displayBullets(note.noteContent)}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            }
            
           
        </div>
    )
}
