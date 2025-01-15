import React, { useState } from 'react';

const NewComment = (props) => {

    return (
        <div>
            <h4>Add new comment</h4>
            <form onSubmit={props.sendMessage}>
                <div className="formfield">
                    <label>Title</label>
                    <input name="title" onChange={props.handleDataChange} value={props.messageTitle}></input>
                    <label>Message</label>
                    <textarea name="message" onChange={props.handleDataChange2} value={props.messageMessage}></textarea>
                    <button className="sendbutton" type="submit">Send</button>
                    <button className="closebutton" type="button" onClick={props.closeMessage}>Close</button>
                </div>
            </form>
        </div>
    )
}

export default NewComment;
