import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { Modal } from "bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Notes = (props)=> {
  const showAlert =props
  const context = useContext(noteContext);
  let history = useHistory();
  const { notes, getNotes,editNote } = context;

  const modalRef = useRef(null);
  const [note, setnote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: ""
  });

  useEffect(() => {
    if (localStorage.getItem('token')) {
  getNotes();
} else {
  history.push("/login");
}

    // eslint-disable-next-line
  }, []);

  const updateNote = (note) => {
    setnote({
      id: note._id,
      etitle: note.title,
      edescription: note.description,
      etag: note.tag
    });
   

    const modalElement = modalRef.current;
    const bsModal = Modal.getOrCreateInstance(modalElement);
    bsModal.show();
  };

  const handleChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Update the note using context here if needed
    editNote(note.id,note.etitle,note.edescription,note.etag)
    const bsModal = Modal.getInstance(modalRef.current);
    bsModal.hide();
    props.showAlert("updated successfuly" ,"success");
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />

      {/* Bootstrap Modal */}
      <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
        ref={modalRef}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">Edit Note</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={handleChange} minLength={5} required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">description</label>
                  <textarea
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    rows="3"
                    value={note.edescription}
                    onChange={handleChange} minLength={5} required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={handleChange} minLength={5} required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5|| note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleSave}>Save changes</button>
            </div>
          </div>
        </div>
      </div>

      {/* Notes List */}
      <div className="container">
        <div className="row my-3">
          <h1>Your Notes</h1>
          {notes.length===0 && <div className="container mx-2">No Notes To  Display</div>}
          {notes.map((note) => (
            <Noteitem key={note._id} updateNote={updateNote} showAlert={showAlert}  note={note} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Notes;
