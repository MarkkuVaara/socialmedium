import React, { useState } from 'react';

const NewView = (props) => {

    return (
        <div>
            <h4>Add new view</h4>
            <form onSubmit={props.sendView}>
                <div className="formfield">
                    <label>Date</label>
                    <input name="date" onChange={props.handleDataChange} value={props.date}></input>
                    <label>Video title</label>
                    <select name="title">
                        <option>Star Wars</option>
                        <option>Gladiator</option>
                        <option>Breaking Bad</option>
                        <option>Fight Club</option>
                    </select>
                    <button className="sendbutton" type="submit">Add</button>
                    <button className="closebutton" type="button" onClick={props.closeView}>Close</button>
                </div>
            </form>
        </div>
    )
}

export default NewView;
