import React, { useRef, useState } from 'react';

const NewComment = (props) => {

    const editorRef = useRef(null);
    const [html, setHtml] = useState(props.messageMessage);

    const handleInput = () => {
        if (editorRef.current) {
          setHtml(editorRef.current.innerHTML);
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
                        className="styled-editor" name="message" value={html}
                        onInput={() => { handleInput; props.handleDataChange2();} } suppressContentEditableWarning>
                    </div>
                    <button className="sendbutton" type="submit">Send</button>
                    <button className="closebutton" type="button" onClick={props.closeMessage}>Close</button>
                </div>
            </form>
        </div>
    )
    
}

export default NewComment;
