import React from "react";
import "../styles/Note.css";
import { Heart, HeartOff, Pointer } from "lucide-react";

function Note({ note, onDelete, onLike }) {
  const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");

  return (
    <div className="note-container">
      <p className="note-title">
        {note.author} - {note.title}
      </p>
      <p className="note-body">{note.body}</p>
      {/* <p className="note-body">{note.body}</p> */}
      {/* <p className="note-date">{formattedDate}</p> */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "2rem",
        }}
      >
        <p
          className="note-likes"
          style={{ display: "flex", alignItems: "center", gap: "2rem" }}
        >
          Likes: {note.like_count}{" "}
          <Heart
            style={{ cursor: "pointer" }}
            fill="red"
            stroke="red"
            onClick={() => onLike(note.id)}
          />
        </p>
        <button className="delete-button" onClick={() => onDelete(note.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Note;
