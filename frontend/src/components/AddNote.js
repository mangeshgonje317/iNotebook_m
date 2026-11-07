import React, { useState } from "react";
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";

function AddNote(props) {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNotes] = useState({
    title: " ",
    description: " ",
    tag: "default",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNotes({ title: "", description: "", tag: "" });
    props.showAlert("Note Added successfuly" ,"success");
  };
  const onChange = (e) => {
    setNotes({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-3">
      <h1>Add a Note</h1>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            {" "}
            title{" "}
          </label>
          <input
            type="text"
            className="form-control"
            value={note.title}
            id="title"
            name="title"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            {" "}
            description{" "}
          </label>
          <input
            type="text"
            className="form-control"
            value={note.description}
            id="description"
            name="description"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            value={note.tag}
            id="tag"
            name="tag"
            onChange={onChange}
          />
        </div>
        <div className="mb-3 form-check"></div>
        <button
          disabled={note.title.length < 5 || note.description.length < 5}
          type="submit"
          className="btn btn-primary"
          onClick={handleClick}
        >
          Add Note
        </button>
      </form>
    </div>
  );
}

export default AddNote;
