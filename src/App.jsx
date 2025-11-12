import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Note from './components/Note';
import { supabase } from "../supabaseClient";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading]= useState(false);
  const [showModal, setShowModal] = useState(false);

  const getNotes = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('notes').select('*');
    if (error) {
      toast.error(error);
    } else {
      setNotes(data);
    }
    setLoading(false)
  }

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
    <main>
      <section>
        {
          notes.length == 0 ?
          <ul>
            {notes.map(note => <Note key={note.id} note={note} />)}
          </ul> :
          <Any message="Any Notes" />
        }
      </section>
      <button className='AddBtn'>
        <Plus />
      </button>
    </main>
  )
}

function Any({ message }) {
  return <p>{message}</p>
}