import React, { useState } from 'react';

const NewComment = (props) => {

    const [title, setTitle] = useState(props.messageTitle);
    console.log(title);

    const handleDataChange = (event) => {
        setTitle(event.target.value);
    };

    return (
        <div>
            <h4>Add new comment</h4>
            <form onSubmit={props.sendMessage}>
                <div className="formfield">
                    <label>Title</label>
                    <input name="title" onChange={handleDataChange} value={title}></input>
                    <label>Message</label>
                    <textarea name="message"></textarea>
                    <button className="sendbutton" type="submit">Send</button>
                    <button className="closebutton" type="button" onClick={props.closeMessage}>Close</button>
                </div>
            </form>
        </div>
    )
}

export default NewComment;
