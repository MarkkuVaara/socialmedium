import React, { useState } from 'react';

const NewComment = (props) => {

    return (
        <div>
            <h4>New comment</h4>
            <form onSubmit={() => props.sendMessage()}>
                <div className="formfield">
                    <label>Title</label>
                    <input></input>
                    <label>Message</label>
                    <textarea></textarea>
                    <button type="submit">Send</button>
                    <button type="reset">Clear</button>
                </div>
            </form>
        </div>
    )
}

export default NewComment;
