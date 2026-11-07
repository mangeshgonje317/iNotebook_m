import { useState } from "react";
import NoteCotext from "./noteContext";
import API_BASE_URL from "../../api";

const NoteState = (props) => {
  let note=[];

  const [notes, setNotes] = useState(note);


  // get all the notes
const getNotes =async () => {
    // todo api csll
    const response =await fetch(`${API_BASE_URL}/api/notes/fetchallnotes`,{
        method: 'get',
        headers: {
        'Content-Type': 'application/json',
        "auth-token":localStorage.getItem('token')
        
        },
        
        
      });
      const json =await response.json()
      setNotes(json)
     
      

    
  };






  // till here get note
  // Add note  
  const addNote =async (title, description, tag) => {
    // todo api csll
    const response =await fetch(`${API_BASE_URL}/api/notes/addnote`,{
        method: 'post',
        headers: {
        'Content-Type': 'application/json',
        "auth-token":localStorage.getItem('token')
        },
        body :JSON.stringify({title,description,tag})
      });
      const note =await response.json();
      setNotes(notes.concat(note));
   

    // still here api call
   


    
  };

  //  Delete a note
  const deleteNote =async (id) => {
    // todo api call
        const response =await fetch(`${API_BASE_URL}/api/notes/deletenote/${id}` ,{
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json',
        "auth-token":localStorage.getItem('token')
        },
        
        
      });
      const json =await response.json()
  


    // till here delete api
   
    const newNotes = notes.filter((note)=>{ return note._id!==id});
    setNotes(newNotes);
  };

  // edit a note
  const editNote =async (id ,title,description,tag) => {
    // todo api call
    // url =
      const response =await fetch(`${API_BASE_URL}/api/notes/updatenote/${id}` ,{
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        "auth-token":localStorage.getItem('token')
        },
        body :JSON.stringify({title,description,tag})
      });
      const json =await response.json();


      let newNotes =JSON.parse(JSON.stringify(notes))

    // logic to edit in clint
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id ===id) {
        newNotes[index].title=title;
        newNotes[index].description =description;
        newNotes[index].tag= tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteCotext.Provider value={{ notes, addNote, deleteNote, editNote ,getNotes }}>
      {props.children}
    </NoteCotext.Provider>
  );
};

export default NoteState;
