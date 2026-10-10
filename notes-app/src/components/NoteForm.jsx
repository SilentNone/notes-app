import { useState } from "react";

function NoteForm({addNote}){
   const [title,setTitle] = useState("");
   const [content,setContent]=useState("");
   const [color, setColor] = useState("bg-white");

   function handleSubmit(e){
    e.preventDefault();
    if (content.trim() === ""){
        alert("Please enter something....");
        return;
    }
    if (title.length > 100) {
    alert("Title cannot be more than 100 characters");
    return;
    }
    if (content.length > 1000) {
    alert("Content cannot be more than 1000 characters");
    return;
    }
     const newNote = {
        id: Date.now(),
        title: title,
        content: content,
        createdAt: Date.now(),
        color: color,
    };
    addNote(newNote);
    setTitle("");
    setContent("");
    setColor("bg-white");
    }
   return (
    <form onSubmit={handleSubmit} className="mx-auto mb-6 max-w-xl space-y-2">
        <input type = "text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title..(optional)" className="w-full rounded border p-6"/>
        <textarea placeholder="Enter some notes" value={content} onChange={(e) => setContent(e.target.value)} className="w-full rounded border p-6 " rows="4"/>
        <select value={color} onChange={(e) => setColor(e.target.value)}className="rounded border bg-white p-2">
          <option value="bg-white">White</option>
          <option value="bg-yellow-200">Yellow</option>
          <option value="bg-green-200">Green</option>
          <option value="bg-blue-200">Blue</option>
         <option value="bg-pink-200">Pink</option>
        </select>
        <button type="submit" className="rounded bg-blue-500 px-5 py-2 text-white">
        Add Note
        </button>
    </form>
   );
}
export default NoteForm;