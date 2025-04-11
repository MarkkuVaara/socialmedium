import React, { useRef, useState } from 'react';

const NewComment = (props) => {

    const editorRef = useRef(null);
    const [html, setHtml] = useState(props.messageMessage);

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
                    <div ref={editorRef} contentEditable="true" dangerouslySetInnerHTML={{ __html: html }}
                        className="styled-editor" value={html}
                        onInput={() => { handleInput(); } } suppressContentEditableWarning>
                    </div>
                    <input type="hidden" name="message" value={html} />
                    <button className="sendbutton" type="submit">Send</button>
                    <button className="closebutton" type="button" onClick={props.closeMessage}>Close</button>
                </div>
            </form>
        </div>
    )
    
}

export default NewComment;
