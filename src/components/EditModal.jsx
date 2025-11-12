import { X, CheckCheck } from "lucide-react";

export default function EditModal({ content, color, id, onContentChange, onColorChange, onSubmit, onCloseModal }) {
    return(
        <div className="ModalContainer">
            <button 
                className="btn btn-circle absolute top-5 right-5"
                onClick={() => onCloseModal(false)}
            >
                <X />
            </button>

            <form className='p-8 w-xl mx-auto flex flex-col gap-3 bg-slate-700 rounded-lg' onSubmit={(e) => onSubmit(e, id)}>
                <h2 className="text-2xl font-bold ">Edit note</h2>
                <label htmlFor="content" className='floating-label'>
                    <span>Content</span>
                    <textarea id="content" value={content} onChange={onContentChange} className='input w-full block' />
                </label>
                <div className='floating-label'>
                    <label htmlFor="color">Color</label>
                    <input type="color" id="color" value={color} onChange={onColorChange} className='color w-full block' />
                </div>
                <button type='submit' className='AddBtn Btn'>
                    <CheckCheck />
                </button>
            </form>
        </div>
    );
}