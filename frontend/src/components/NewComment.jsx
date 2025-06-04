import React, { useRef, useState, useEffect } from 'react';

const NewComment = (props) => {

    const editorRef = useRef(null);
    const [html, setHtml] = useState("");

    const hasSetInitial = useRef(false);

    useEffect(() => {
        if (editorRef.current && props.messageMessage && !hasSetInitial.current) {
            editorRef.current.innerHTML = '<div class="quote-block" contenteditable="false">' 
                + props.messageMessage + 
                '</div> <div> </div>';
            hasSetInitial.current = true;
        }
    }, [props.messageMessage]);

    const handleInput = () => {
        if (editorRef.current) {
          setHtml(editorRef.current.innerHTML);
          props.handleDataChange2(editorRef.current.innerHTML);
        }
    };

    return (

        <div>
            <h4>Add new comment</h4>
            <form onSubmit={props.sendMessage}>
                <div className="formfield">
                    <label>Title</label>
                    <input name="title" onChange={props.handleDataChange} value={props.messageTitle}></input>
                    <label>Message</label>
                    <div ref={editorRef} contentEditable="true" dir="ltr"
                        className="styled-editor p-3 overflow-y-auto whitespace-pre-wrap break-words focus:outline-none text-left text-base leading-relaxed" 
                        value={html} onInput={() => { handleInput(); } } suppressContentEditableWarning>
                    </div>
                    <input type="hidden" name="message" value={html} />
                    <input type="hidden" name="prevmessage" value={props.prevmessage} />
                    <button className="sendbutton" type="submit">Send</button>
                    <button className="closebutton" type="button" onClick={props.closeMessage}>Close</button>
                </div>
            </form>
        </div>
    )
    
}

export default NewComment;
