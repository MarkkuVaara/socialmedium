import React, { useState } from 'react';

const NewView = (props) => {

    return (
        <div>
            <h4>Add new view</h4>
            <form onSubmit={props.sendView}>
                <div className="formfield">
                    <label>Video you watched</label>
                    <select name="title">
                        {props.videos.map(video => 
                            <option key={video.id} value={video.id}>{video.name}</option>
                        )}
                    </select>
                    <label>Date</label>
                    <input name="date" onChange={props.handleDataChange} value={props.date}></input>
                    <button className="sendbutton" type="submit">Add</button>
                    <button className="closebutton" type="button" onClick={props.closeView}>Close</button>
                </div>
            </form>
        </div>
    )
}

export default NewView;
