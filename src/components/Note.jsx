import { PenLine, Trash } from "lucide-react";

const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit' };

export default function Note({ note, onDelete, onUpdate }) {
    const date = new Date(note.created_at)
    
    return(
        <li className="Note" style={{
            background: note.color
        }} title={note.user_id}>
            <span className="NoteId">{note.id}</span>
            <div>
                <p className="NoteContent">{note.content}</p>   
                <p className="NoteDate">
                    {date.toLocaleDateString('fr-FR', options)}
                </p>
            </div>
            <div className="NoteActions">
                <button className="NoteUpdate BtnSoft" onClick={() => onUpdate(note)}>
                    <PenLine size={14} />
                </button>
                <button className="NoteDelete BtnSoft" onClick={() => onDelete(note.id)}>
                    <Trash size={14} />
                </button>
            </div>
        </li>
    );
}