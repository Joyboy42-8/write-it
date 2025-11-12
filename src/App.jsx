import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Note from './components/Note';
import CreateNote from './components/CreateModal';
import { supabase } from "../supabaseClient";
import { createPortal } from 'react-dom';
import EditModal from './components/EditModal';

export default function App() {
  // States and variables
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState("")
  const [color, setColor] = useState("faf7f7ff")
  const [newContent, setNewContent] = useState("")
  const [newColor, setNewColor] = useState()
  const [NewId, setNewId] = useState(0);
  const [showCreate, setShowCreate] = useState(false)
  const [showEdit, setShowEdit] = useState(false)

  // Functions
  const handleContentChange = (e) => setContent(e.target.value)
  const handleColorChange = (e) => setColor(e.target.value)
  const handleNewContentChange = (e) => setNewContent(e.target.value)
  const handleNewColorChange = (e) => setNewColor(e.target.value)

  const getNotes = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('notes').select();
    if (error) {
      toast.error(error);
    } else {
      setNotes(data);
    }
    setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(content.trim() == "") throw new Error("This field cannot be empty !");

      const { data, error } = await supabase.from("notes").insert({
        content: content,
        color: color,
      }).select()

      if(error) {
        throw new Error(error.message);
      } else {
        setNotes(prevNotes => [...prevNotes, ...data])
        toast.success("Note added !")

        setContent("")
        setColor("#faf7f7ff")
        setShowCreate(false)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await supabase.from("notes").delete().eq("id", id)
      
      if(response.error) {
        throw new Error(response.error.message)
      } else {
        setNotes(prevNotes => prevNotes.filter(note => note.id != id))
        toast.success("Note Deleted !")      
      }
    } catch (error) {
      toast.error(error);
    }
  }

  const handleShowEdit = (note) => {
    setNewContent(note.content)
    setNewColor(note.color)
    setNewId(note.id)
    setShowEdit(true)
  }

  const handleUpdate = async(e, id) => {
    e.preventDefault()
    try {
      const { data, error } = await supabase.from("notes").update({
        content: newContent,
        color: newColor
      }).eq("id", id).select();

      if(error) {
        throw new Error(error.message)
      } else {
        setNotes(prevNotes =>
          prevNotes.map(note =>
            note.id === id ? { ...note, ...data[0] } : note
          )
        );
        setNewContent("")
        setNewColor("")
        toast.success("Note updated !")
        setShowEdit(false)
      }

    } catch (error) {
      toast.error(error)
    }
  }


  // Effects 
  useEffect(() => {
    getNotes();
  }, []);

  useEffect(() => {
    if (loading) {
      const id = toast.loading('Chargement des notes...')
      return () => toast.dismiss(id)
    }
  }, [loading]);

  return (
    <main className='container mx-auto my-5 relative'>
      <button className='OpenBtn' onClick={() => setShowCreate(true)}><Plus /></button>
      {
        showCreate && createPortal(
          <CreateNote 
            content={content} 
            color={color} 
            onContentChange={handleContentChange}
            onColorChange={handleColorChange}
            onSubmit={handleSubmit}
            onCloseModal={setShowCreate}
          />,
          document.body
        )
      }

      {
        showEdit && createPortal(
          <EditModal
            content={newContent} 
            color={newColor}
            id={NewId}
            onContentChange={handleNewContentChange}
            onColorChange={handleNewColorChange}
            onSubmit={handleUpdate}
            onCloseModal={setShowEdit}
          />,
          document.body
        )
      }

      <h1 className='text-center text-3xl font-thin mb-6'>Notes</h1>
      <ul className='grid grid-cols-3 gap-5'>
        {notes.length > 0 
          ?
          notes.map(note => 
          <Note 
            key={note.id} 
            note={note} 
            onDelete={handleDelete} 
            onUpdate={handleShowEdit} 
          />) 
          :
          (<Any message="Any Notes" />)
        }
      </ul>
    </main>
  )
}

function Any({ message }) {
  return <p>{message}</p>
}