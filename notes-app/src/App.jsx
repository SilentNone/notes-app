import { useState,useEffect } from 'react'
import './App.css'
import NoteForm from './components/NoteForm';
import NoteCard from './components/NoteCard'

function App() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    if (saved) {
      return JSON.parse(saved);
    }else {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem("notes",JSON.stringify(notes));
  },[notes]);
  const [showArchived, setShowArchived] = useState(false);
  const [searchText, setSearchText] = useState("");
    function addNote(newNote) {
    let isDuplicate = false;          
    for (let i = 0; i < notes.length; i++) {
        const oldNote = notes[i];       
        if (oldNote.title === newNote.title && oldNote.content === newNote.content) {
            isDuplicate = true;        
        }
    }
    if (isDuplicate) {
        alert("This note already exists");
        return;                        
    }
    setNotes([...notes, newNote]);     
    }
    function deleteNote(id) {
      setNotes(notes.filter((note) => note.id !== id));
    }
    function updateNote(id, changes) {
     setNotes(notes.map((note) => note.id === id ? { ...note, ...changes, updatedAt: Date.now() } : note));
    }
   const visibleNotes = notes.filter((note) => {
    const matchesArchive = Boolean(note.archived) === showArchived;
    const text = searchText.toLowerCase();
    const matchesSearch = note.title.toLowerCase().includes(text) || note.content.toLowerCase().includes(text);
    return matchesArchive && matchesSearch;
   });
  return (
    <div className="min-h-screen bg-gray-100 p-6">  
    <h1 className="mb-6 text-center text-3xl font-bold">Notes App</h1>
    <NoteForm addNote={addNote}/>
    <div className="mx-auto mb-4 flex max-w-xl gap-2">
    <button onClick={() => setShowArchived(false)} className="rounded bg-blue-500 px-3 py-1 text-white">
       Notes
    </button>
    <button onClick={() => setShowArchived(true)} className="rounded bg-gray-500 px-3 py-1 text-white">
       Archive
    </button>
    </div>
    <div className="mx-auto mb-4 max-w-xl">
     <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)}placeholder="Search notes..." className="w-full rounded border bg-white p-2"/>
    </div>
    <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {visibleNotes.map((note) => (<NoteCard key={note.id} note={note} deleteNote={deleteNote} updateNote={updateNote} />))}
    </div>
    </div>
  );
}
export default App;