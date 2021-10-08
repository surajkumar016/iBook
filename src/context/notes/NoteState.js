import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get all Notes
  const getNotes = async() => {
    // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1MGI2YTljY2YxOWRiYmQzMmRhZjliIn0sImlhdCI6MTYzMjkyNTAxOH0.6i-hiY_Ho7WaKNjwcwRmKrKmM73hIrLXflHmh-Fg4PE",
      }
    });
    const json = await response.json();
    console.log(json)
    setNotes(json)
  };

  // Add a Note
  const addNote = async(title, description, tag) => {
    // TODO: API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1MGI2YTljY2YxOWRiYmQzMmRhZjliIn0sImlhdCI6MTYzMjkyNTAxOH0.6i-hiY_Ho7WaKNjwcwRmKrKmM73hIrLXflHmh-Fg4PE",
      },
      body: JSON.stringify({title, description, tag}),
    });

    console.log("Adding a new note");
    const note = {
      _id: "6154aab7eaea24237b96b59a96",
      user: "6150b6a9ccf19dbbd32daf9b",
      title: title,
      description: description,
      tag: tag,
      date: "2021-09-29T18:04:39.184Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  // Delete a Note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1MGI2YTljY2YxOWRiYmQzMmRhZjliIn0sImlhdCI6MTYzMjkyNTAxOH0.6i-hiY_Ho7WaKNjwcwRmKrKmM73hIrLXflHmh-Fg4PE",
      }
    });
    const json = response.json();
    console.log(json)

    console.log("Delete a Note" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // TODO: API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1MGI2YTljY2YxOWRiYmQzMmRhZjliIn0sImlhdCI6MTYzMjkyNTAxOH0.6i-hiY_Ho7WaKNjwcwRmKrKmM73hIrLXflHmh-Fg4PE",
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = response.json();

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
