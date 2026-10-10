import { useState } from "react";

function NoteCard({ note, deleteNote, updateNote }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editContent, setEditContent] = useState(note.content);

  function handleSave() {
    if (editContent.trim() === "") {
      alert("Content cannot be empty");
      return;
    }
    if (editTitle.length > 100) {
      alert("Title cannot be more than 100 characters");
      return;
    }
    updateNote(note.id, { title: editTitle, content: editContent });
    setIsEditing(false);
    }

  function handleCancel() {
    setEditTitle(note.title);
    setEditContent(note.content);
    setIsEditing(false);
    }
    function handleArchive() {
        if (note.archived === true) {
           updateNote(note.id, { archived: false });  
        } else {
           updateNote(note.id, { archived: true }); 
        }
    }
  return (
    <div className={`rounded-lg p-5 shadow ${note.color || "bg-white"}`}>
      {isEditing ? (
        <div className="space-y-2">
          <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)}className="w-full rounded border p-2"/>
          <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)}rows="3"className="w-full rounded border p-2"/>
          <button onClick={handleSave} className="mr-2 rounded bg-green-500 px-3 py-1 text-white">
            Save
          </button>
          <button onClick={handleCancel}className="rounded bg-gray-400 px-3 py-1 text-white">
            Cancel
          </button>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-bold break-words">{note.title}</h2>
          <p className="mt-2 text-gray-500 break-words">{note.content}</p>
          <button onClick={() => setIsEditing(true)}className="mt-3 mr-2 rounded bg-blue-500 px-3 py-1 text-white">
            Edit
          </button>
          <button onClick={handleArchive}className="mt-3 mr-2 rounded bg-yellow-500 px-3 py-1 text-white">
            {note.archived === true ? "Unarchive" : "Archive"}
          </button>
          <button onClick={() => {
              if (window.confirm("Delete this note?")) {
                deleteNote(note.id);
              }
            }}
            className="mt-3 rounded bg-red-500 px-3 py-1 text-white">
            Delete
          </button>
          <select value={note.color || "bg-white"} onChange={(e) => updateNote(note.id, { color: e.target.value })} className="mt-3 ml-2 rounded border bg-white p-1">
            <option value="bg-white">White</option>
            <option value="bg-yellow-200">Yellow</option>
            <option value="bg-green-200">Green</option>
            <option value="bg-blue-200">Blue</option>
            <option value="bg-pink-200">Pink</option>
          </select>
        </>
      )}
    </div>
  );
}
export default NoteCard;