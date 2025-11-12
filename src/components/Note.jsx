export default function Note({ note }) {
    return(
        <li className="Note">
            {note.content}
        </li>
    );
}